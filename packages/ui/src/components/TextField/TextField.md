# TextField

単一行テキスト入力。

## デザイナーの判断基準

- `label` は必須プロパティ。placeholder をラベル代わりにするのは禁止（FORM_NO_PLACEHOLDER_ONLY_LABEL）
- placeholder は入力例を示すためだけに使う（例: `you@example.com`）
- エラーは入力欄の直下に赤テキストで出す。トーストでフォームエラーを出さない
- helperText は制約の事前告知に使う（例: 「8文字以上」）。エラー後に初めて制約を知らせるのは避ける

## 例

```tsx
<TextField label="メールアドレス" placeholder="you@example.com" type="email" />
<TextField label="パスワード" helperText="8文字以上" type="password" />
<TextField label="氏名" error="氏名を入力してください" />
```
