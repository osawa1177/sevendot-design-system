# Modal

画面前面に重ねて、注視すべき単一タスクへ集中させるダイアログ。

## デザイナーの判断基準

- **1操作1モーダル**。中に別のモーダルを開かない（多重化は禁止）
- 本文は3行以内に収め、長文フォームは画面遷移にする
- footer のボタンは最大2個。主アクションは右、キャンセルは左に置く
- 破壊的操作の確認は主アクションを `<Button variant="danger">` にする
- オーバーレイは `bg-neutral-900/50` 固定。パネルのみ `shadow-xl` を使う（他のオーバーレイUIは `shadow-md` まで）
- 閉じる手段は3つ用意する: 閉じるボタン・オーバーレイクリック・Escapeキー
- パネル幅は `max-w-sm`。情報量で勝手に広げない

## 例

```tsx
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="下書きを削除しますか？"
  footer={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>
        キャンセル
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        削除する
      </Button>
    </>
  }
>
  削除した下書きは元に戻せません。
</Modal>
```
