# Toast

操作結果を一時的に知らせる、消えていく通知。

## デザイナーの判断基準

- **Toast＝消える通知**。残すべきお知らせは Alert を使う
- **自動消去タイマーは持たない**。表示・消去のタイミングは呼び出し側で `onClose` と `setTimeout` を使って制御する
- 表示は同時に1件。複数同時に積み上げない
- メッセージは1行・完了形で書く（「保存しました」）。操作を求める文言は入れない
- success/info は `role=status aria-live=polite`、warning/danger は `role=alert aria-live=assertive` に切り替わる
- 影は `shadow-md` まで。オーバーレイの重さを持たせない

## 例

```tsx
// 呼び出し側で 4 秒後に閉じる例
React.useEffect(() => {
  const id = window.setTimeout(() => setShow(false), 4000);
  return () => window.clearTimeout(id);
}, []);

{show ? (
  <Toast tone="success" message="変更を保存しました" onClose={() => setShow(false)} />
) : null}
```
