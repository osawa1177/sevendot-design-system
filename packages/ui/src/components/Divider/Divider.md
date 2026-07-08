# Divider

領域を区切る罫線。水平・ラベル付き・垂直の3形態を持つ。

## デザイナーの判断基準（具体的）

- 線色は必ず `border-neutral-200`。太さは1px（`border-t` / `border-l`）に固定し、太い線や濃い色にしない
- 既定は水平（`orientation="horizontal"`）。セクションの区切りに使う。連続要素の細かい区切りは List/Table の `divide-y` を使い、Divider を多用しない
- `label` を渡すと中央にテキストを置いた水平線になる（例: 「または」）。左右の線は `flex-1` で均等に伸ばし、テキストは `text-xs text-neutral-500`
- `orientation="vertical"` は横並び要素の間仕切りに使う。親に高さがある（flex 行など）ときだけ機能する。`self-stretch` で親の高さに合わせる
- `role="separator"` と `aria-orientation` を必ず付ける
- 装飾目的の区切り（グラデーションや二重線）にしない

## 例（tsx）

```tsx
import { Divider } from "@sevendot/ui";

<div className="space-y-4">
  <p>セクション A</p>
  <Divider />
  <p>セクション B</p>
  <Divider label="または" />
  <div className="flex items-center h-6">
    <span>左</span>
    <Divider orientation="vertical" className="mx-3" />
    <span>右</span>
  </div>
</div>;
```
