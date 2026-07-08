# DESIGN.md — Sevendot デザイン憲法

> AIエージェント（Claude Code等）がUIを生成する際、**最初に必ず読むファイル**。
> ここに書かれた原則は非交渉（non-negotiable）。違反はCI・lintで検知される。

## Brand Identity

- ブランド名: SEVEN DOT.（https://seven-dot.jp/）
- タグライン: YOUR PERSONAL DESIGN PARTNER
- トーン: 誠実・精緻・押し付けない。幾何学的でクリーン
- プライマリカラー: Seven Dot Blue `#003ADB`（`color.primary.600`）
- ダークネイビー `#1A2332`（`surface.dark`）を面として使い、有彩色はブルーに集中させる
- 英字見出しは Helvetica Neue Bold、和文は Noto Sans JP
- UIは黒子。コンテンツが主役

## 10原則（非交渉）

1. **Content First** — 装飾より情報。余白で整理し、線と影は最小限
2. **Token Only** — 色・余白・角丸・影は必ずデザイントークンを参照する。`bg-blue-500` のような生のパレット指定は禁止。`bg-primary-500` を使う
3. **4px Grid** — スペーシングは4の倍数のみ（`p-1`=4px 基準）
4. **3-Color Rule** — 1画面に使う有彩色は3色まで（primary + semantic 2色）
5. **WCAG 2.1 AA** — テキストコントラスト4.5:1以上。icon-onlyボタンは `aria-label` 必須
6. **Minimal Elevation** — `shadow-sm`〜`shadow-md` のみ。`shadow-lg` 以上はモーダル等オーバーレイ限定
7. **No AI-ish Decoration** — カード上部のカラーバー（`border-t-4`）禁止。グラデーション背景の乱用禁止。絵文字をUIラベルに使わない
8. **Component First** — 画面は `@sevendot/ui` のコンポーネントで組む。素のHTMLで似た部品を再発明しない
9. **UX Writing** — 敬体・簡潔・ユーザー主語。禁止語は `design-mock/foundations/ux-writing.md` を参照
10. **State Complete** — 生成する画面は default / hover / disabled / empty / error の状態を考慮する

## Quick Reference

| 用途 | クラス |
|------|--------|
| 主ボタン | `<Button variant="primary">` |
| 副ボタン | `<Button variant="secondary">` |
| 破壊的操作 | `<Button variant="danger">` |
| カード | `<Card>`（`border border-neutral-200 rounded-lg`、影なしがデフォルト） |
| 見出し | `text-xl font-semibold text-neutral-900` |
| 本文 | `text-sm text-neutral-700` |
| 補足 | `text-xs text-neutral-500` |
| ページ余白 | `px-4 py-6`（モバイル） / `px-8 py-10`（デスクトップ） |
| セクション間 | `space-y-8` |

## 読み込みモード

| モード | 読むもの | 用途 |
|--------|---------|------|
| クイック | この DESIGN.md のみ | 単体UIの生成 |
| 標準 | + 該当コンポーネントの contract / .md | 画面単位の生成 |
| MCP | `get_token` / `get_ui_component` / `check_rules` | ツール統合（推奨） |
| フル | 全ファイル | 新規構築時 |

## SSOT（正の所在）

- トークン: `tokens/sevendot.tokens.json`
- コンポーネント実装: `packages/ui/src/components/`
- 機械可読仕様: `design/contracts/`
- 禁止ルール: `design/contracts/rules.json`
- 画面マスター: `design-mock/app/screens/`（main ブランチが常に最新の正）
