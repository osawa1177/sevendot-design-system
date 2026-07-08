# Progress

0〜100%の進捗を横棒で示すコンポーネント。

## デザイナーの判断基準（具体的）

- `value` は0〜100の数値。範囲外は自動的に0〜100へ丸める。小数は四捨五入して整数%で表示する
- トラックは `bg-neutral-200`、進捗バーは `bg-primary-600`。進捗の色を成功・警告で切り替えない（状態表示は Badge/Alert を使う）
- 高さは `h-2`（8px）固定、両端は `rounded-full`。太いバーやパターン塗りにしない
- `role="progressbar"` と `aria-valuenow` / `aria-valuemin=0` / `aria-valuemax=100` を必ず付ける
- `label` を渡すと上部に「ラベル」と「N%」を左右に置く。ラベルと数値は `text-xs text-neutral-500`
- バーの伸縮は `transition-all` でアニメーションさせる。不確定（読み込み中）の表現には使わない

## 例（tsx）

```tsx
import { Progress } from "@sevendot/ui";

<div className="space-y-4">
  <Progress value={72} label="アップロード" />
  <Progress value={30} />
</div>;
```
