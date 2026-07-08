# sevendot-design-system

人間にもAIにも読めるデザインシステム。Sevendot のデザインのシングルソース（SSOT）。

対になるリポジトリ: [sevendot-spec](https://github.com/osawa1177/sevendot-spec)（PRD管理＋design-builderスキルでデザイン作業を行う場所）

## アーキテクチャ

```
Layer 1: 憲法      DESIGN.md / CLAUDE.md（AIが最初に読む）
Layer 2: 仕様      tokens/ + design/contracts/（機械可読SSOT）
Layer 3: 検証      scripts/design/ + CI + check_rules（違反を通さない）
```

本番Webと design-mock は同じ `@sevendot/ui`（packages/ui）を import する。
デザイン案の段階から本番と同じ部品・同じ品質で揃う。

```
sevendot-design-system/
├── DESIGN.md              # デザイン憲法（10原則 + Quick Reference）
├── CLAUDE.md              # Claude Code 作業手順書
├── tokens/                # デザイントークン（SSOT）
├── packages/ui/           # @sevendot/ui — 実装(.tsx)+仕様(.md)同居
├── design/contracts/      # 機械可読仕様（contract + rules.json）
├── design-mock/           # デザイン案プレイグラウンド（Next.js）+ MCPサーバ
├── scripts/design/        # lint / validate
└── .github/workflows/     # CI（design-check）
```

## セットアップ

```bash
npm install
npm run dev        # design-mock → http://localhost:3000
```

Claude Code でこのリポジトリを開くと `.mcp.json` により design-system MCP が自動接続される。
ツール: `get_token` / `list_ui_components` / `get_ui_component` / `get_page` / `check_rules` / `search_guidelines`

## 品質ゲート

```bash
npm run design:validate          # tokens / contracts の整合性検証
npm run design:lint              # 禁止パターンlint（design-mock全走査）
npm run design:lint -- <file>    # 特定ファイルのみ
```

CI（GitHub Actions）が push / PR ごとに同じ検証を実行する。

## GitHubへの初回push

```bash
cd sevendot-design-system
git init && git add -A && git commit -m "feat: AI-ready design system 初期構築"
gh repo create osawa1177/sevendot-design-system --private --source=. --push
# gh が無い場合:
# GitHubで空リポジトリ sevendot-design-system を作成後
# git remote add origin https://github.com/osawa1177/sevendot-design-system.git
# git branch -M main && git push -u origin main
```

## 運用ルール

- 名前空間 `@sevendot/ui`・`Sevendot` は仮名。確定後に一括置換する
- デザイナーのレビュー指摘が出るたび、判断基準を `design/contracts/rules.json` か spec 側の `references/` に1項目追記する（この積み上げが仕組みの本体）
- 確定したデザイン案は design-mock の main にマージ＝その画面のマスター更新
