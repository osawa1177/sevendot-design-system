# Claude Code 引き継ぎドキュメント — Sevendotデザインシステム

作成日: 2026-07-09
作成環境: Claude Cowork（設計: Fable / 実装: Opus）

## 1. プロジェクト概要

デザイナーの判断基準を構造化し、非デザイナーがClaude Codeで品質の揃ったUIを作れる仕組み。
参考: [NEWTの事例](https://note.com/toitoi1618/n/ndf35dbd2585b) / [melta-ui](https://github.com/tsubotax/melta-ui)

## 2. リポジトリ（両方ともpush済み・public）

| リポジトリ | 役割 | URL |
|---|---|---|
| sevendot-design-system | デザインのSSOT | https://github.com/osawa1177/sevendot-design-system |
| sevendot-spec | PRD管理＋design-builderスキル | https://github.com/osawa1177/sevendot-spec |

- ショーケース（GitHub Pages）: https://osawa1177.github.io/sevendot-design-system/
- ブランド: seven-dot.jp から実抽出済み（Seven Dot Blue #003ADB / ダークネイビー #1A2332 / Helvetica Neue + Noto Sans JP）

## 3. 現在の状態（完了済み）

- DESIGN.md（10原則）/ CLAUDE.md / tokens（40+）/ rules.json（禁止10ルール）
- @sevendot/ui: **28コンポーネント**（各 .tsx + .md + contract.json の3点セット）
- design-mock（Next.js）+ サンプル画面 plan-detail
- design-system MCPサーバ（get_token / list_ui_components / get_ui_component / get_page / check_rules / search_guidelines）。`.mcp.json` 同梱で自動接続
- lint / validate スクリプト + GitHub Actions CI（現在すべてグリーン）
- design-builderスキル（Step 0〜8 + references 4ファイル + 提案HTMLテンプレート + サンプルPRD）
- ショーケース docs/index.html（自己完結・CSS変数テーマ駆動・最大幅1200px）

## 4. 未着手タスク（次にやること）

**Figma MCP統合** — 詳細は同梱の `Figma連携統合プラン.md` を参照。
実装順: P1 接続と手動運用 → P2 ルール整備 → P3 トークン同期 → P4 drift検証CI → P5 Code Connect（将来）

着手前に確定が必要な未決事項:
1. トークンSSOT（推奨: 案A=コードが正）
2. Figma書き出し先のチーム/プロジェクト名
3. Figma Variablesのコレクション構成

## 5. Claude Codeでの始め方

```bash
git clone https://github.com/osawa1177/sevendot-design-system.git
cd sevendot-design-system
npm install          # design-system MCP が自動接続される
claude               # CLAUDE.md と DESIGN.md を最初に読むこと
```

デザイン作業をする場合:

```bash
git clone https://github.com/osawa1177/sevendot-spec.git
cd sevendot-spec
claude
# 「design-builder を使って docs/prd/sample-plan-search-filter.md のデザイン案を作って」
```

## 6. 運用ルール（重要）

- 色・余白等の変更は必ず tokens/sevendot.tokens.json から（Token Only原則。直書き禁止）
- コンポーネント変更は .tsx / .md / contract.json の3点同時更新
- レビュー指摘が出たら rules.json か spec側 references/ に1項目追記（仕組みの学習）
- コミット前に `npm run design:validate && npm run design:lint`

## 7. 同梱ファイル

- `Figma連携統合プラン.md` — 次タスクの詳細プラン（未実装）
- `AI前提デザインシステム構築計画書.md` — 初期の全体設計書（実装済み内容の背景資料）
