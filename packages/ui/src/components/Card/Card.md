# Card

情報のまとまりを示す容れ物。

## デザイナーの判断基準

- 既定は**影なし・全周ボーダー**。カードは目立つためのものではない
- 上部カラーバー（`border-t-4`）は禁止（DECOR_NO_CARD_COLOR_BAR）
- クリック可能な一覧カードのみ `interactive` を付け、ホバーで `shadow-md`
- カードの中にカードを入れない。ネストが必要なら区切り線（`divide-y`）で表現

## 例

```tsx
<Card>
  <CardHeader>
    <h3 className="text-base font-semibold text-neutral-900">タイトル</h3>
  </CardHeader>
  <CardBody>
    <p className="text-sm text-neutral-700">本文</p>
  </CardBody>
</Card>
```
