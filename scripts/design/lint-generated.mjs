#!/usr/bin/env node
/**
 * lint-generated.mjs
 *
 * 生成された（あるいは既存の）JSX/TSX に対して design/contracts/rules.json の
 * class-regex ルールを適用し、禁止クラスの使用を検出する。
 *
 * 使い方:
 *   node scripts/design/lint-generated.mjs [file ...]
 *
 * 引数省略時は design-mock/app と design-mock/components 配下の .tsx を全走査する。
 * error が 1 件以上あれば exit 1。
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// scripts/design/ から見て ../.. がリポジトリルート
const REPO_ROOT = join(__dirname, "..", "..");
const RULES_PATH = join(REPO_ROOT, "design", "contracts", "rules.json");

const DEFAULT_SCAN_DIRS = [
  join(REPO_ROOT, "design-mock", "app"),
  join(REPO_ROOT, "design-mock", "components"),
];

function collectTsx(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectTsx(full));
    } else if (entry.isFile() && full.endsWith(".tsx")) {
      out.push(full);
    }
  }
  return out;
}

function resolveTargets(args) {
  if (args.length > 0) {
    const files = [];
    for (const a of args) {
      const p = a.startsWith("/") ? a : join(process.cwd(), a);
      if (!existsSync(p)) {
        console.error(`warning: ファイルが見つかりません: ${a}`);
        continue;
      }
      if (statSync(p).isDirectory()) {
        files.push(...collectTsx(p));
      } else {
        files.push(p);
      }
    }
    return files;
  }
  return DEFAULT_SCAN_DIRS.flatMap(collectTsx);
}

function main() {
  const rulesDoc = JSON.parse(readFileSync(RULES_PATH, "utf8"));
  const classRegexRules = (rulesDoc.rules ?? []).filter(
    (r) => r.detector === "class-regex" && r.pattern
  );

  const targets = resolveTargets(process.argv.slice(2));

  let errorCount = 0;
  let warnCount = 0;

  for (const file of targets) {
    const rel = relative(REPO_ROOT, file);
    const lines = readFileSync(file, "utf8").split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const rule of classRegexRules) {
        // 行ごとに新しい正規表現を作り lastIndex 状態を持ち越さない
        const re = new RegExp(rule.pattern, "g");
        const found = [...line.matchAll(re)];
        if (found.length === 0) continue;

        const alt = rule.alternative ? ` → ${rule.alternative}` : "";
        const cond = rule.conditional ? `（条件: ${rule.conditional}）` : "";
        const msg = `[${rule.severity}] ${rule.id} ${rel}:${i + 1} ${rule.message}${cond}${alt}`;
        console.log(msg);

        if (rule.severity === "error") errorCount++;
        else warnCount++;
      }
    }
  }

  console.log(
    `\nlint: 対象 ${targets.length} ファイル / error ${errorCount} 件 / warn ${warnCount} 件`
  );

  if (errorCount > 0) {
    process.exit(1);
  }
}

main();
