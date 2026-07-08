# Skeleton

読み込み中のコンテンツ位置を、実物と同じ形の灰色プレースホルダで示す。

## デザイナーの判断基準

- **実際のレイアウトに寸法を合わせる**。読み込み後に位置がずれないよう width/height を実物と揃える
- スピナーの代わりに使う。ページ全体の骨組みを一度に見せると体感速度が上がる
- text は行（`h-4`）、circle はアバター等の丸、rect は画像・カードの矩形に使う
- 色は `bg-neutral-200` 固定。tone による色分けはしない
- 読み込みが1秒未満で終わる箇所には使わない（点滅がノイズになる）
- 容器に `role=status aria-busy=true` と `sr-only` の「読み込み中」を持たせ、支援技術に状態を伝える

## 例

```tsx
<div className="flex items-center gap-2">
  <Skeleton variant="circle" width={40} height={40} />
  <Skeleton variant="text" width="60%" />
</div>
```
