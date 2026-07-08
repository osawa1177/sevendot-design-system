ネイティブ select をベースに、ラベル・補足・エラーを TextField と揃えた選択入力。右端のシェブロンは装飾のみ（aria-hidden）。

## デザイナーの判断基準（具体的、曖昧語禁止）

- `label` は必須。placeholder で代替しない（FORM_NO_PLACEHOLDER_ONLY_LABEL）。
- 選択肢が7件以下は Select、8件以上や検索が要るものは別UI（将来のCombobox）を検討する。
- 高さは `h-10`（40px）で TextField と揃える。単独で並べても行の高さが揃う。
- ボーダーは通常 `border-neutral-200`、エラー時のみ `border-danger-600`。それ以外の色でボーダーを塗らない。
- 右のシェブロンSVGは `text-neutral-500`・幅16px（`h-4 w-4`）固定。色や向きを変えない。
- 補足は `helperText`（`text-neutral-500`）、エラーは `error`（`text-danger-600`）。両方を同時に出さない（error 優先）。
- 未選択を許すときは先頭に `<option value="">選択してください</option>` を置く。disabled 属性は付けない。

## 例（tsx）

```tsx
<Select
  label="お住まいの地域"
  helperText="配送料の計算に使用します"
  options={[
    { value: "", label: "選択してください" },
    { value: "tokyo", label: "東京都" },
    { value: "osaka", label: "大阪府" },
  ]}
/>
```
