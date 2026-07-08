# Button

アクションを実行する基本部品。

## 使い分け（デザイナーの判断基準）

- **primary**: その画面の主目的となるアクション。**1画面に原則1つ**
- **secondary**: 主目的の隣に置く代替アクション（キャンセル、戻る等）
- **ghost**: リスト内・カード内など、視覚ノイズを増やしたくない場所の軽いアクション
- **danger**: 削除・解約など破壊的操作。確認ダイアログとセットで使う

## ルール

- icon-only にする場合は `aria-label` 必須（A11Y_ICON_ONLY_NEEDS_ARIA）
- ラベルは動詞で始める（「保存する」「予約する」）。名詞だけのラベルは避ける
- 幅いっぱいのボタンはモバイルの主要CTAのみ（`fullWidth`）

## 例

```tsx
<Button>予約する</Button>
<Button variant="secondary">キャンセル</Button>
<Button variant="danger" size="sm">削除する</Button>
```
