# AI前提プロダクトデザイン環境 構築計画書

作成日: 2026-07-08
参考: [デザイナーの脳内をコピーして、誰でも90点以上のUIを作れるようにする（令和トラベル・NEWT）](https://note.com/toitoi1618/n/ndf35dbd2585b) / [melta-ui（tsubotax）](https://github.com/tsubotax/melta-ui)
前提: ゼロベース構築 / 利用環境は Claude Code + GitHub

---

## 1. 目的とゴール

### 1.1 目的

デザイナーの判断基準（頭の中）をリポジトリ上の構造とワークフローとして外部化し、デザイナー以外（PM・エンジニア）でも Claude Code の指示だけで一定品質（90点以上）のUIデザイン案を作れる状態を実現する。デザイナーの役割は「作る人」から「レビューして判断する人」へ移行する。

### 1.2 ゴール（達成条件）

| # | ゴール | 検証方法 |
|---|--------|----------|
| G1 | Figmaではなく Claude Code でUIを組み立てられる | 非デザイナーがスキル呼び出しのみで画面モックを生成できる |
| G2 | デザイナーの思考フロー（調査→仕様理解→複数案→提案）が再現される | スキルのステップ実行ログで確認 |
| G3 | レビューしやすい成果物（調査・案・仕様が1枚のHTML）が出る | 成果物テンプレートの全セクションが埋まる |
| G4 | 実装都合を排してデザインだけ考えられ、かつ作り直しゼロで実装へ接続できる | ui-component が本番と同一パッケージから import されている |
| G5 | 確定デザインが自動的に最新マスターになる | mainマージ＝マスター更新のフローが回る |

### 1.3 スコープ外（初期は割り切る）

- ゼロイチの新規機能デザイン（前例のない画面）は対象外。デザイナーが担当する
- ブランド・広告・LP等のUI以外のデザイン資産の配信（将来フェーズ）
- Figmaマスター管理の完全廃止（移行期間は併用）

---

## 2. 全体アーキテクチャ

### 2.1 リポジトリ構成（2リポジトリ分担）

| リポジトリ | 役割 | 主な中身 |
|-----------|------|---------|
| `{product}-design-system` | デザインのシングルソース（SSOT） | トークン / UIコンポーネント / design-mock / contract / ガイドライン / MCPサーバ |
| `{product}-spec` | デザイン作業の実行場所 | PRD・機能仕様 / design-builder等のClaude Codeスキル |

基準を持つのが前者、基準を参照しながら作るのが後者。

### 2.2 design-system リポジトリのディレクトリ設計

```
{product}-design-system/
├── DESIGN.md                 # AI向けデザイン憲法（原則 + Quick Reference）
├── CLAUDE.md                 # Claude Code 作業手順書
├── tokens/
│   └── {product}.tokens.json # デザイントークン（色・余白・フォントのSSOT）
├── packages/ui/              # UIパッケージ（本番とdesign-mockが共用）
│   └── src/components/       #   実装(.tsx)と仕様(.md)を同居
├── design-mock/              # デザインのプレイグラウンド（Next.js）
│   ├── components/           #   domain-component（TSX）
│   ├── screens/              #   page（画面モック）
│   ├── design/contracts/     #   機械可読なコンポーネント仕様（JSON contract）
│   ├── foundations/          #   UX哲学・UXライティング等のガイドライン
│   └── src/                  #   design-system MCPサーバ実装
├── scripts/                  # validate / drift-check / lint（品質ゲート）
├── .github/workflows/        # CI（デザインルール違反検知）
└── storybook/                # コンポーネントカタログ（任意）
```

### 2.3 デザインの4粒度

| 粒度 | 定義 | 実体の共有 |
|------|------|-----------|
| ui-component | Button等の最小部品 | packages/ui を本番・mock共用（唯一の実体共有） |
| domain-component | ドメイン固有の複合部品 | 共有しない。命名規則のみ本番と統一 |
| section | 画面内のまとまり | 同上 |
| page | 画面全体 | 同上 |

ポイント: 実体を共有するのは ui-component のみ。それ以上の粒度は「同じ語彙で会話できる」ことを担保する（作り直しゼロ引き渡しの要）。

### 2.4 3層構造（melta-ui の考え方を採用）

| 層 | 中身 | 読み手 |
|----|------|--------|
| 憲法 | DESIGN.md / CLAUDE.md | AI（最初に読む入口） |
| 仕様 | tokens.json / rules.json / contracts/ | AI + 検証ハーネス（機械可読SSOT） |
| 検証 | lint scripts / CI / Claude Code hooks | 自動検知（違反を通さない） |

「AIが迷わない・間違えにくい・間違えても検知される」を成立させる。

---

## 3. MCPサーバ設計

design-mock を Next.js アプリとして稼働させ、画面プレビューと同時に design-system MCP を配信する。

### 3.2 提供ツール（最小セット）

| ツール | 用途 |
|--------|------|
| `get_token` | デザイントークンの取得 |
| `get_ui_component` | UIコンポーネントの仕様・contract取得 |
| `get_section` / `get_page` | 既存画面・セクションの取得（改修時のピンポイント参照） |
| `check_rules` | 生成物の禁止パターン検証（自己修正ループ用） |
| `search_guidelines` | UX哲学・UXライティングの検索 |

設計方針: 画面全体から部品単位まで、必要な粒度でピンポイントに引ける取得APIにする（改修タスクが大半のため）。

### 3.3 接続方式

- 初期: リポジトリ同梱の `.mcp.json` で、clone + `npm install` だけで Claude Code に自動接続
- 将来: 社内共通のリモートMCP環境に載せ、リポジトリ外・非開発職からも設定レスで到達可能にする（NEWTの reiwatravel-mcp 相当）

---

## 4. design-builder スキル設計（spec リポジトリ側）

### 4.1 スキル構成

```
design-builder/
├── SKILL.md         # ワークフロー本体（Step 0〜8）
├── references/      # 判断ルール集 ＝ デザイナーの頭の中の明文化
│   ├── principles.md      # 非交渉のUI原則（10項目程度）
│   ├── proposal-rules.md  # 成果物HTMLの構成・文章ルール
│   ├── checklist.md       # 完成条件（全項目チェックまで終了不可）
│   └── ...
├── scripts/         # 競合スクショ取得・プレビュー撮影
└── templates/       # 成果物HTMLテンプレート
```

### 4.2 ワークフロー（8ステップ）

1. 前提の確認 — どの画面の、どんな課題か
2. 資料の読み込み — PRD・デザインシステムの参照
3. 曖昧な点の解消 — 不明点を1問ずつ質問して潰す
4. 調査 — 既存画面をMCPから取得、競合事例をスクショ＋出典つきで収集
5. デザイン案の実装 — 案ごとに本物の部品（packages/ui）で動く画面を作る
6. 提案 — 推し案の決定、理由と仕様の整理
7. 成果物づくり — 調査・案・仕様を1枚のHTMLに集約
8. 共有 — PR作成、プレビューURL（Vercel等）で誰でも閲覧・コメント可能に

### 4.3 成果物の要件

- 1枚のHTMLに「背景・調査結果・デザイン案（複数）・推し案と理由・仕様」を集約
- PRのプレビューデプロイでURL一つで確認できること
- デザイナーレビュー→OKなら design-mock の main にマージ＝マスター更新

---

## 5. 実施フェーズ計画

### Phase 0: 基盤定義（1〜2週間）

- デザイン原則の言語化（DESIGN.md）: 色数制限、スペーシンググリッド、エレベーション方針、アクセシビリティ基準など5〜10原則
- デザイントークン定義（tokens.json）: 色・余白・タイポグラフィ・角丸・影
- リポジトリ2つの初期化、CLAUDE.md 作成
- 成果物: DESIGN.md / tokens.json / リポジトリ骨格

### Phase 1: UIコンポーネント整備（2〜4週間）

- 最小コンポーネントセット（10〜15個）を packages/ui に実装: Button, TextField, Select, Checkbox, Card, Table, Badge, Modal, Toast, Tabs 等
- 各コンポーネントに .tsx（実装）+ .md（人間向け仕様）+ .contract.json（機械可読仕様）を同居
- 禁止ルール集（rules.json）の初版作成
- 成果物: packages/ui / contracts / rules.json

### Phase 2: design-mock + MCP（2〜3週間）

- Next.js で design-mock を構築、packages/ui を import
- サンプル画面（page / section / domain-component）を2〜3画面分作成
- MCPサーバ実装（get_token / get_ui_component / get_page / check_rules）
- `.mcp.json` 同梱で Claude Code 自動接続
- 成果物: 動作する design-mock + MCP

### Phase 3: design-builder スキル（2〜3週間）

- SKILL.md（8ステップ手順書）+ references/（判断ルール集）+ templates/ を作成
- spec リポジトリに配置し、サンプルPRDで end-to-end 検証
- PRプレビュー（Vercel等）の接続
- 成果物: 非デザイナーが1人で成果物HTMLまで到達できるスキル

### Phase 4: 品質ゲートと運用（継続）

- CI: 禁止パターンlint / contract整合性チェック / drift検出
- Claude Code hooks（PostToolUse）で生成直後のlint→自動修正ループ
- レビュー運用ルールの策定（デザイナーレビュー→mainマージ＝マスター確定）
- 判断ルールの継続追記（レビュー指摘をreferences/に還元するサイクル）

---

## 6. 技術スタック（想定）

| 領域 | 選定 | 理由 |
|------|------|------|
| UIパッケージ | React + TypeScript + Tailwind CSS | AI可読性が高く、contract（クラス文字列）検証と相性が良い |
| design-mock | Next.js | プレビュー配信とMCPサーバ同居の実績構成 |
| トークン | JSON（W3C Design Tokens形式準拠） | 機械可読SSOT |
| MCP | TypeScript（MCP SDK） | Claude Code連携 |
| プレビュー | Vercel（PRプレビュー + コメント機能） | レビューURL一発共有 |
| CI | GitHub Actions | lint / drift / テスト自動化 |

---

## 7. リスクと対策

| リスク | 対策 |
|--------|------|
| デザイナーの判断基準の言語化が進まない（最大の難所） | レビュー指摘が出るたびに references/ に1項目追記する運用をルール化。最初から完璧を目指さない |
| ゼロイチ画面の品質が届かない | スコープ外と明示。日々の改修に用途を限定し、勝負どころはデザイナー担当 |
| ルールに縛られ表現が硬直化 | 「AIの案を素材にデザイナーが組み立て直す」逃げ道を残す |
| コンポーネント未整備の画面で品質がブレる | Phase 1で対象画面領域を絞り、コンポーネントカバレッジを先に確保 |
| MCPセットアップの手間で利用が広がらない | `.mcp.json` 同梱で設定レス化。将来は共通リモートMCPへ |

---

## 8. 成功指標（KPI案）

- 非デザイナー起点のデザイン案の本数 / 月
- デザイナーレビュー1回でOKになる率（＝90点到達率の代理指標）
- デザイン案着手→レビュー可能状態までのリードタイム
- references/（判断ルール）の追記件数（仕組みが学習しているか）
- Figmaマスター手動更新の作業時間削減量

---

## 9. 次のアクション

1. デザイン原則5〜10項目のドラフト作成（Phase 0の起点）
2. 対象とするプロダクト・画面領域の決定（コンポーネントセットの範囲確定に必要）
3. リポジトリ命名と初期化
4. melta-ui（MIT License）をベース雛形として fork/参照するか、ゼロから書くかの判断

---

## 付録: 参考リソース

- 元記事: https://note.com/toitoi1618/n/ndf35dbd2585b
- melta-ui: https://github.com/tsubotax/melta-ui （MIT。contract設計・rules.json・MCPツール・CI/hooks構成がそのまま参考になる）
- Google design.md spec: https://github.com/google-labs-code/design.md （DESIGN.md形式の互換仕様）
