# CopyButton

文字列をクリップボードへコピーし、成功をアイコンで一瞬フィードバックするボタン。

## デザイナーの判断基準

- **コピー対象の値のすぐ隣に置く**。URL・APIキー・IDなど手入力させたくない値に使う
- サイズは40px（`h-10 w-10`）固定。他のアイコンボタンと高さを揃える
- 成功時はコピーアイコンからチェックアイコンへ切り替え、2秒で元に戻す
- 文言ラベルは持たず、意味は `aria-label`（既定「コピー」）で伝える
- コピー中・完了のトーストは出さない。アイコンの切り替えだけで足りる

## 例

```tsx
<div className="flex items-center gap-2">
  <code className="text-sm text-neutral-700">sk_live_7d0t...</code>
  <CopyButton text="sk_live_7d0t..." aria-label="APIキーをコピー" />
</div>
```
