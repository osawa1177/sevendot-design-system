#!/usr/bin/env node
/**
 * validate.mjs
 *
 * デザインシステムの機械可読仕様の整合性を検証する:
 *   1. tokens/sevendot.tokens.json と design/contracts/**\/*.json が有効な JSON
 *   2. 各 contract の rules 配列の ID が rules.json に存在する
 *   3. contract の tokenRefs / variants[].tokenRefs のトークンパスが tokens に実在する
 *
 * 違反があれば一覧表示して exit 1、なければ "validate: OK" を表示する。
 */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// scripts/design/ から見て ../.. がリポジトリルート
const REPO_ROOT = join(__dirname, "..", "..");
const TOKENS_PATH = join(REPO_ROOT, "tokens", "sevendot.tokens.json");
const RULES_PATH = join(REPO_ROOT, "design", "contracts", "rules.json");
const CONTRACTS_ROOT = join(REPO_ROOT, "design", "contracts");
const CONTRACTS_COMPONENTS_DIR = join(CONTRACTS_ROOT, "components");

const errors = [];

function collectJson(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectJson(full));
    else if (entry.isFile() && full.endsWith(".json")) out.push(full);
  }
  return out;
}

/** ドット区切りパスでトークンノードが実在するか */
function tokenExists(tokens, path) {
  const segments = path.split(".").filter((s) => s.length > 0);
  let node = tokens;
  for (const seg of segments) {
    if (node && typeof node === "object" && seg in node) node = node[seg];
    else return false;
  }
  return node !== undefined;
}

/** contract の tokenRefs / variants[].tokenRefs から [key, path] を収集 */
function collectTokenRefs(contract) {
  const refs = [];
  if (contract.tokenRefs && typeof contract.tokenRefs === "object") {
    for (const [k, v] of Object.entries(contract.tokenRefs)) {
      if (typeof v === "string") refs.push({ where: `tokenRefs.${k}`, path: v });
    }
  }
  const variants = contract.variants;
  if (variants && typeof variants === "object") {
    // variants はオブジェクト（{ primary: {...} }）にも配列にも対応
    const entries = Array.isArray(variants)
      ? variants.map((v, i) => [String(i), v])
      : Object.entries(variants);
    for (const [name, variant] of entries) {
      if (variant && typeof variant.tokenRefs === "object") {
        for (const [k, v] of Object.entries(variant.tokenRefs)) {
          if (typeof v === "string")
            refs.push({ where: `variants.${name}.tokenRefs.${k}`, path: v });
        }
      }
    }
  }
  return refs;
}

// ---- 1. JSON 妥当性 ----------------------------------------------------------

const jsonFiles = [TOKENS_PATH, ...collectJson(CONTRACTS_ROOT)];
const parsed = new Map();
for (const file of jsonFiles) {
  try {
    parsed.set(file, JSON.parse(readFileSync(file, "utf8")));
  } catch (e) {
    errors.push(`不正な JSON: ${relative(REPO_ROOT, file)} — ${e.message}`);
  }
}

const tokens = parsed.get(TOKENS_PATH);
const rulesDoc = parsed.get(RULES_PATH);
const ruleIds = new Set((rulesDoc?.rules ?? []).map((r) => r.id));

// ---- 2 & 3. 各 contract の検証 ----------------------------------------------

const contractFiles = existsSync(CONTRACTS_COMPONENTS_DIR)
  ? readdirSync(CONTRACTS_COMPONENTS_DIR)
      .filter((f) => f.endsWith(".contract.json"))
      .map((f) => join(CONTRACTS_COMPONENTS_DIR, f))
  : [];

for (const file of contractFiles) {
  const rel = relative(REPO_ROOT, file);
  const contract = parsed.get(file);
  if (!contract) continue; // JSON パース失敗は既に記録済み

  // 2. rules ID の存在確認
  for (const rid of contract.rules ?? []) {
    if (!ruleIds.has(rid)) {
      errors.push(`${rel}: rules に未定義のルールID "${rid}"`);
    }
  }

  // 3. tokenRefs のパス存在確認
  if (tokens) {
    for (const { where, path } of collectTokenRefs(contract)) {
      if (!tokenExists(tokens, path)) {
        errors.push(`${rel}: ${where} が参照する token パスが存在しない "${path}"`);
      }
    }
  }
}

// ---- 結果 -------------------------------------------------------------------

if (errors.length > 0) {
  console.error("validate: NG");
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log("validate: OK");
