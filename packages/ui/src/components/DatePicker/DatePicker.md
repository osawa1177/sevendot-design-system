ネイティブ input[type="date"] にラベル・補足・エラーを TextField と同じ形で統合した日付入力。

## デザイナーの判断基準（具体的、曖昧語禁止）

- `label` は必須。placeholder で代替しない（FORM_NO_PLACEHOLDER_ONLY_LABEL）。
- 高さ `h-10`（40px）・角丸 `rounded-md` を TextField / Select と揃える。
- ボーダーは通常 `border-neutral-200`、エラー時のみ `border-danger-600`。
- 日付の範囲制限は native の `min` / `max` を使う。独自バリデーションUIを足さない。
- 補足は `helperText`、エラーは `error`。両方は同時に出さない（error 優先）。
- カスタムカレンダーUIは実装しない。ブラウザ標準のカレンダーに委ねる。

## カスタムカレンダーは将来拡張

月送りやレンジ選択を伴うカスタムカレンダーは本コンポーネントの範囲外で、将来拡張とする。現状はネイティブ input[type="date"] のみを提供する。

## 例（tsx）

```tsx
<DatePicker
  label="予約日"
  helperText="本日以降の日付を選択してください"
  min="2026-07-08"
/>
```
