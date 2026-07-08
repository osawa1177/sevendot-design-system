その場で即時に反映される ON/OFF スイッチ。role="switch" とキーボード操作に対応する。

## デザイナーの判断基準（具体的、曖昧語禁止）

- 設定の即時切替（保存ボタン不要）に使う。フォーム送信で確定する二択には Radio か Checkbox を使う。
- `label` は必須。補足が要るときだけ `description` を足す。
- トラックは幅40px×高さ24px（`h-6 w-10`）、ノブは16px（`h-4 w-4`）固定。
- ON は `bg-primary-600`、OFF は `bg-neutral-200`。ON色を他の有彩色にしない。
- ノブは常に `bg-white`。ON時は `translate-x-5`、OFF時は `translate-x-1` に置く。
- Space / Enter キーで切り替わる。role="switch" と aria-checked を必ず維持する。
- disabled 時は全体を `opacity-50` にし、ポインタ操作を無効化する。

## 例（tsx）

```tsx
<Toggle
  label="メール通知"
  description="新着メッセージをメールで受け取ります"
  defaultChecked
  onChange={(on) => console.log(on)}
/>
```
