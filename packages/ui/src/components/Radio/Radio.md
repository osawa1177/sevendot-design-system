排他選択のためのラジオボタン。RadioGroup で legend と name を共有し、中に Radio を並べる。

## デザイナーの判断基準（具体的、曖昧語禁止）

- 必ず `RadioGroup` で囲む。単独の Radio を裸で置かない。
- `RadioGroup` の `legend` と `name` は必須。name はグループ内で同一の値にする。
- グループ内の各 Radio は RadioGroup から name を自動で受け取る。個別に name を指定しない。
- Radio 本体は18px角（`style={{ width: 18, height: 18 }}`）。Checkbox とサイズを揃える。
- 選択色は `accent-primary-600`。legend は `text-sm font-medium text-neutral-900`、選択肢の間隔は `gap-2`。
- 選択肢が2件なら Radio、ON/OFFの二択なら Toggle を使う。
- disabled の選択肢は `opacity-50` にし、カーソルを `cursor-pointer` にしない。

## 例（tsx）

```tsx
<RadioGroup legend="お支払い方法" name="payment">
  <Radio label="クレジットカード" value="card" defaultChecked />
  <Radio label="銀行振込" value="bank" />
  <Radio label="代金引換" value="cod" disabled />
</RadioGroup>
```
