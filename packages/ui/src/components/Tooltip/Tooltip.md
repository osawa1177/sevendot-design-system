# Tooltip

要素にホバー・フォーカスしたとき、短い補足を吹き出しで見せる。

## デザイナーの判断基準

- **補助情報だけを入れる**。ここにしかない重要情報や操作を入れない
- 文言は20文字以内・単語または短文。改行させない（`whitespace-nowrap`）
- アイコンのみのボタンの意味説明に使う。ただし `aria-label` の代替にはしない（両方付ける）
- 背景は `bg-neutral-700` + `text-white` 固定。tone による色分けはしない
- ホバーとフォーカス（`group-focus-within`）の両方で表示し、キーボード操作でも読めるようにする

## 例

```tsx
<Tooltip content="変更は自動保存されます">
  <Button variant="ghost" size="sm">保存について</Button>
</Tooltip>
```
