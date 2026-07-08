/**
 * design-system MCP server
 *
 * @sevendot のデザインシステム（トークン / コンポーネント契約 / 禁止ルール /
 * 画面マスター / ガイドライン）を、AIエージェントから機械可読に引けるようにする
 * MCP サーバ。
 *
 * 配置: design-mock/src/mcp/server.ts
 * リポジトリルートは import.meta.url 基準で ../../.. で解決する。
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// このファイル（design-mock/src/mcp/server.ts）から見て ../../.. がリポジトリルート
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = join(__dirname, "..", "..", "..");

const TOKENS_PATH = join(REPO_ROOT, "tokens", "sevendot.tokens.json");
const RULES_PATH = join(REPO_ROOT, "design", "contracts", "rules.json");
const CONTRACTS_DIR = join(REPO_ROOT, "design", "contracts", "components");
const UI_COMPONENTS_DIR = join(REPO_ROOT, "packages", "ui", "src", "components");
const SCREENS_DIR = join(REPO_ROOT, "design-mock", "app", "screens");
const FOUNDATIONS_DIR = join(REPO_ROOT, "design-mock", "foundations");
const DESIGN_MD_PATH = join(REPO_ROOT, "DESIGN.md");

// ---- 共通ヘルパー ------------------------------------------------------------

function readJson(path: string): any {
  return JSON.parse(readFileSync(path, "utf8"));
}

function textResult(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}

function errorResult(reason: string) {
  return {
    isError: true as const,
    content: [{ type: "text" as const, text: JSON.stringify({ error: reason }, null, 2) }],
  };
}

/** ドット区切りパス（例 "color.primary.600"）でネストをたどる */
function resolvePath(obj: any, path: string): any {
  const segments = path.split(".").filter((s) => s.length > 0);
  let node = obj;
  for (const seg of segments) {
    if (node && typeof node === "object" && seg in node) {
      node = node[seg];
    } else {
      return undefined;
    }
  }
  return node;
}

/** contracts ディレクトリから contract JSON を列挙する */
function listContracts(): any[] {
  if (!existsSync(CONTRACTS_DIR)) return [];
  return readdirSync(CONTRACTS_DIR)
    .filter((f) => f.endsWith(".contract.json"))
    .map((f) => readJson(join(CONTRACTS_DIR, f)));
}

// ---- サーバ定義 --------------------------------------------------------------

const server = new McpServer({
  name: "design-system",
  version: "0.1.0",
});

// get_token -------------------------------------------------------------------
server.tool(
  "get_token",
  "デザイントークン（W3C形式）を取得する。path 未指定なら全体、指定時（例 color.primary.600）はドット区切りで該当ノードを返す",
  { path: z.string().optional() },
  async ({ path }) => {
    try {
      const tokens = readJson(TOKENS_PATH);
      if (!path) return textResult(tokens);
      const node = resolvePath(tokens, path);
      if (node === undefined) {
        return errorResult(`token path が見つかりません: ${path}`);
      }
      return textResult({ path, value: node });
    } catch (e) {
      return errorResult(`get_token に失敗: ${(e as Error).message}`);
    }
  }
);

// list_ui_components ----------------------------------------------------------
server.tool(
  "list_ui_components",
  "利用可能な UI コンポーネント一覧を [{ id, name, import }] で返す",
  {},
  async () => {
    try {
      const list = listContracts().map((c) => ({
        id: c.id,
        name: c.name,
        import: c.import,
      }));
      return textResult(list);
    } catch (e) {
      return errorResult(`list_ui_components に失敗: ${(e as Error).message}`);
    }
  }
);

// get_ui_component ------------------------------------------------------------
server.tool(
  "get_ui_component",
  "指定 id のコンポーネントについて、contract JSON・.md ドキュメント・.tsx ソースを結合して返す",
  { id: z.string() },
  async ({ id }) => {
    try {
      const contract = listContracts().find((c) => c.id === id);
      if (!contract) {
        const available = listContracts().map((c) => c.id);
        return errorResult(
          `component id が見つかりません: ${id}. 利用可能: ${available.join(", ")}`
        );
      }
      // id -> ディレクトリ名は contract の name フィールドを使う
      const dir = join(UI_COMPONENTS_DIR, contract.name);
      const mdPath = join(dir, `${contract.name}.md`);
      const tsxPath = join(dir, `${contract.name}.tsx`);
      const doc = existsSync(mdPath) ? readFileSync(mdPath, "utf8") : null;
      const source = existsSync(tsxPath) ? readFileSync(tsxPath, "utf8") : null;
      return textResult({
        id: contract.id,
        name: contract.name,
        import: contract.import,
        contract,
        doc,
        source,
      });
    } catch (e) {
      return errorResult(`get_ui_component に失敗: ${(e as Error).message}`);
    }
  }
);

// get_page --------------------------------------------------------------------
server.tool(
  "get_page",
  "画面マスター design-mock/app/screens/{id}/page.tsx のソースを返す。無ければ利用可能な画面ID一覧を返す",
  { id: z.string() },
  async ({ id }) => {
    try {
      const pagePath = join(SCREENS_DIR, id, "page.tsx");
      if (!existsSync(pagePath)) {
        const available = existsSync(SCREENS_DIR)
          ? readdirSync(SCREENS_DIR, { withFileTypes: true })
              .filter((d) => d.isDirectory())
              .map((d) => d.name)
          : [];
        return errorResult(
          `page id が見つかりません: ${id}. 利用可能な画面ID: ${available.join(", ")}`
        );
      }
      return textResult({ id, source: readFileSync(pagePath, "utf8") });
    } catch (e) {
      return errorResult(`get_page に失敗: ${(e as Error).message}`);
    }
  }
);

// check_rules -----------------------------------------------------------------
server.tool(
  "check_rules",
  "rules.json の class-regex ルールを source に適用し違反一覧を返す。manual ルールは参考として別配列で返す",
  { source: z.string() },
  async ({ source }) => {
    try {
      const rulesDoc = readJson(RULES_PATH);
      const rules: any[] = rulesDoc.rules ?? [];

      const violations: any[] = [];
      for (const rule of rules) {
        if (rule.detector !== "class-regex" || !rule.pattern) continue;
        const re = new RegExp(rule.pattern, "g");
        const matches = source.match(re);
        if (matches && matches.length > 0) {
          violations.push({
            id: rule.id,
            severity: rule.severity,
            message: rule.message,
            alternative: rule.alternative ?? null,
            matches: [...new Set(matches)],
          });
        }
      }

      const manualRules = rules
        .filter((r) => r.detector === "manual")
        .map((r) => ({
          id: r.id,
          severity: r.severity,
          message: r.message,
          alternative: r.alternative ?? null,
        }));

      return textResult({ violations, manualRules });
    } catch (e) {
      return errorResult(`check_rules に失敗: ${(e as Error).message}`);
    }
  }
);

// search_guidelines -----------------------------------------------------------
server.tool(
  "search_guidelines",
  "foundations/*.md と DESIGN.md を対象に query を含む行とその前後2行を返す（大文字小文字無視）",
  { query: z.string() },
  async ({ query }) => {
    try {
      const targets: string[] = [];
      if (existsSync(DESIGN_MD_PATH)) targets.push(DESIGN_MD_PATH);
      if (existsSync(FOUNDATIONS_DIR)) {
        for (const f of readdirSync(FOUNDATIONS_DIR)) {
          if (f.endsWith(".md")) targets.push(join(FOUNDATIONS_DIR, f));
        }
      }

      const q = query.toLowerCase();
      const results: any[] = [];
      for (const file of targets) {
        const lines = readFileSync(file, "utf8").split("\n");
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].toLowerCase().includes(q)) {
            const start = Math.max(0, i - 2);
            const end = Math.min(lines.length - 1, i + 2);
            results.push({
              file: file.replace(REPO_ROOT + "/", ""),
              line: i + 1,
              match: lines[i],
              context: lines.slice(start, end + 1).join("\n"),
            });
          }
        }
      }

      return textResult({ query, count: results.length, results });
    } catch (e) {
      return errorResult(`search_guidelines に失敗: ${(e as Error).message}`);
    }
  }
);

// ---- 起動 --------------------------------------------------------------------

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // stdio トランスポートなので stderr にのみログを出す
  console.error("design-system MCP server running on stdio");
}

main().catch((e) => {
  console.error("fatal:", e);
  process.exit(1);
});
