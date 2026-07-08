# Tag

削除できる短いラベル。フィルタ条件や選択済みの項目を表す。

## デザイナーの判断基準（具体的）

- `tone` は `neutral`（既定）か `primary` の2種のみ。成功・警告・危険の意味を持たせたい場合は Badge を使う
- テキストは2〜12文字を目安にする。長い文言はタグにしない
- `onRemove` を渡したときだけ × ボタンを表示する。削除できないタグには × を付けない
- × ボタンには `aria-label="{label}を削除"` を必ず付ける（アイコンのみのボタンのため）。アイコンはインライン SVG を使い、絵文字は使わない
- 形は `rounded-full`・高さ `h-6`（24px）。× があるときは右側余白を詰めて `pl-2 pr-1`、無いときは `px-2` で左右対称にする
- 装飾目的で primary を選ばない。既定は neutral

## 例（tsx）

```tsx
import { Tag } from "@sevendot/ui";

<div className="flex flex-wrap gap-2">
  <Tag label="デザイン" onRemove={() => removeTag("デザイン")} />
  <Tag label="進行中" tone="primary" onRemove={() => removeTag("進行中")} />
  <Tag label="アーカイブ" />
</div>;
```
