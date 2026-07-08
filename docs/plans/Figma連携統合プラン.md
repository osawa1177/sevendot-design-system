# Sevendotデザインシステム × Figma MCP 統合プラン

作成日: 2026-07-09（プランのみ・実装未着手）
参考: [Claude Codeで作った画面をFigmaに持っていく方法（ねこねこパラダイス）](https://note.com/neko2_paradise/n/n1eb07c82b930)
対象: [sevendot-design-system](https://github.com/osawa1177/sevendot-design-system) / [sevendot-spec](https://github.com/osawa1177/sevendot-spec)

---

## 1. 結論（あわせられるか）

**あわせられる。** 記事の運用は現行システムの2つの弱点をちょうど補完する。

| 現行システムの弱点 | 記事の手法による補完 |
|---|---|
| 確定案の出口がコード（design-mock main）のみで、デザイナーがFigmaで微調整する動線がない | Figma MCPで画面をFigmaファイルに書き出し、細部調整・先方共有・コンポーネント整理に使う |
| tokens.json とデザイナーのFigma作業が分断（手動同期） | Figma Variables ⇔ tokens.json の対応規律（直書き禁止・勝手な命名禁止・追加時の報告フォーマット） |

逆に、記事側にない「rules.json / contract / CI検証」「design-builderの調査→複数案→提案HTMLワークフロー」は現行システムがそのまま提供する。**競合せず、役割が綺麗に分かれる。**

## 2. 統合後の全体フロー

```
PRD (sevendot-spec)
  ↓ design-builder（現行どおり: 調査 → 2〜3案 → check_rules → 提案HTML → PR）
デザイナーレビュー
  ├─ OK ──→ design-mock main へマージ（コードが正・現行どおり）
  │            ↓ 【新規】Step 9: Figma書き出し（任意）
  │         Figmaファイル（先方共有・細部調整・デザインシステム整理用）
  │            ↓ 微調整で変更が出たら
  │         【新規】変更を tokens.json / rules.json へ還元（Figmaを正にしない）
  └─ 勝負どころ案件 ──→ AIの案を素材にデザイナーがFigmaで再構築
                          ↓ Figma Variables を取得して tokens.json と突き合わせ
                       一致→既存トークン参照 / 不一致→トークン追記して報告
```

## 3. 設計判断（最重要）: トークンのSSOTはどちらか

| 案 | 内容 | 評価 |
|---|---|---|
| **A. コードが正（推奨）** | tokens.json をSSOTとし、Figma Variablesへは書き出し（push）。Figma側の変更は差分検出して tokens.json に取り込んでから有効化 | 現行の3層構造・CI検証がそのまま活きる。melta-ui/NEWT型 |
| B. Figmaが正 | Figma VariablesをSSOTとし、tokens.json を自動生成 | デザイナー主導だが、CI・MCP配信・check_rules の起点が外部SaaSになり検証が弱くなる |

推奨は**A**。記事の「Figmaから取得したバリアブル名をそのまま使う」規律は、A構成では「Figma側の変数名を tokens.json の命名に合わせて生成する」と読み替えて適用する。

## 4. 追加・変更する構成要素

### 4.1 sevendot-design-system 側

| 項目 | 内容 | 新規/変更 |
|---|---|---|
| `.mcp.json` | Figma公式 remote MCP を追加（desktop版でなくremote版。書き込みに必要） | 変更 |
| `scripts/figma/sync-variables.mjs` | tokens.json → Figma Variables 書き出し（案A用）。逆方向は差分レポートのみ | 新規 |
| `scripts/design/drift-figma.mjs` | Figma Variables と tokens.json の乖離検出（CI組み込みは後続フェーズ） | 新規 |
| `CLAUDE.md` | Figma MCP利用ルール追記（値の直書き禁止 / トークン追加時の報告表フォーマット / 書き出し先チームの指定） | 変更 |
| `DESIGN.md` | 「Figmaは中間成果物。正はこのリポジトリ」の位置づけを明文化 | 変更 |

### 4.2 sevendot-spec 側（design-builderスキル）

| 項目 | 内容 | 新規/変更 |
|---|---|---|
| `SKILL.md` | **Step 9「Figma書き出し（任意）」追加**: マージ済み画面を「Figmaファイルに書き出して」の一言で実行。新規ファイル推奨・書き出し先チーム指定（記事Tips: 個人チームだと生成が途中で止まりやすい） | 変更 |
| `references/figma-rules.md` | 記事のデザイン実装ルールを取り込み: ①直書き禁止 ②Figma変数名と異なる独自命名禁止 ③トークン定義ファイル以外での定義禁止 ④追加時の報告表 ⑤例外条件（意図的に変数化されていない一回限りの値のみ・理由コメント必須） | 新規 |
| `references/checklist.md` | Figma書き出しを行った場合のチェック項目（トークン報告表の有無、変数名の一致）を追記 | 変更 |

### 4.3 ワークフロー運用の追加ルール

1. Figmaへの書き出しは**レビューOK後**のみ（レビュー前の案はプレビューURLで見る。Figma生成時間の浪費を避ける）
2. Figma上の微調整で色・余白等が変わったら、**必ず tokens.json への還元PRをセットにする**（Figmaだけ直して終わりを禁止）
3. 書き出しファイルの命名規則: `mock-{画面id}-{日付}`（記事のmock-001方式を拡張）
4. ゼロイチの勝負どころ案件は「AI案→デザイナーがFigmaで再構築→確定後にコード化」の従来型ルートを併設（NEWT記事と同じ棲み分け）

## 5. 実施フェーズ

| フェーズ | 内容 | 目安 |
|---|---|---|
| P1: 接続と手動運用 | Figma remote MCP接続（要OAuth・Devモード可能プラン）、design-mock画面の書き出しを手動プロンプトで試行、書き出し先チーム決定 | 半日 |
| P2: ルール整備 | figma-rules.md 作成、CLAUDE.md/SKILL.md/checklist 追記 | 半日 |
| P3: トークン同期 | sync-variables.mjs 実装、Figma Variables コレクション設計（primary/neutral/semantic/spacing/radius） | 1〜2日 |
| P4: 検証自動化 | drift-figma.mjs をCIに組み込み、乖離をPRコメントで警告 | 1日 |
| P5（将来）: Code Connect | Figmaコンポーネント ⇔ packages/ui のマッピング。Figmaから実コンポーネント名で会話できる状態 | 別途検討 |

## 6. 前提条件・制約

- Figma: Devモード/MCPが使えるプラン（2026年6月時点はスタータープランのコラボシートでも可、要確認）
- Claude Code: remote Figma MCP を `claude mcp add` で接続（OAuth必要。チームプラン推奨）
- 書き出しは生成トークンを消費するため、大量画面の一括書き出しは避ける
- Figma書き出しの再現度は100%ではない前提（構造・変数は再現、細部はデザイナー調整）

## 7. 未決事項（実装開始前に決める）

1. トークンSSOT: 案Aで確定してよいか
2. Figma書き出し先のチーム/プロジェクト名
3. Figma Variablesのコレクション構成（1コレクションにまとめるか、色/寸法で分けるか）
4. P5（Code Connect）まで視野に入れるか
