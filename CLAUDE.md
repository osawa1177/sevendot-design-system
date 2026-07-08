# CLAUDE.md — Claude Code 作業手順書

このリポジトリは Sevendot のデザインSSOT（シングルソース）。UIを生成・変更するときは以下の順で読むこと。

## 作業の基本フロー

1. `DESIGN.md` を読む（デザイン憲法。必読）
2. 使うコンポーネントの contract を読む: `design/contracts/components/{id}.contract.json`
3. 判断に迷ったら人間向け仕様を読む: `packages/ui/src/components/{Name}/{Name}.md`
4. 生成後、`npm run design:lint -- <file>` で自己検証。違反があれば修正して再検証

## 重要ルール

- 画面・モックは必ず `@sevendot/ui` から import する。コンポーネントの再発明禁止
- design-mock 内では API 呼び出し・データフェッチを書かない（デザイン検討専用のプレイグラウンド）
- ui-component（packages/ui）の変更は contract / .md / .tsx の3点セットを同時に更新する
- 新しい判断ルールが決まったら `design/contracts/rules.json` に追記する

## ディレクトリ

```
tokens/                    # デザイントークン（SSOT）
packages/ui/               # @sevendot/ui（本番とdesign-mockが共用）
design/contracts/          # 機械可読仕様（contract + rules）
design-mock/               # デザイン案プレイグラウンド（Next.js）+ MCPサーバ
scripts/design/            # lint / validate
```

## npm scripts

```
npm install                # workspace 全体をセットアップ
npm run dev                # design-mock を起動（http://localhost:3000）
npm run mcp                # design-system MCP サーバを起動
npm run design:lint -- <f> # 禁止パターンlint
npm run design:validate    # tokens / contracts のJSON検証
```

## MCP

`.mcp.json` 同梱。このリポジトリで Claude Code を開くと `design-system` MCP が自動接続される。
ツール: `get_token` / `get_ui_component` / `list_ui_components` / `get_page` / `check_rules` / `search_guidelines`
