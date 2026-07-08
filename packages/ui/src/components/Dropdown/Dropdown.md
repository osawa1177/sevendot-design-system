# Dropdown

トリガーボタンから、関連する操作の一覧を開いて選ばせるメニュー。

## デザイナーの判断基準

- **操作（アクション）の一覧に使う**。フォームの値選択には Select を使う
- 項目は7件までに抑える。それ以上は画面遷移や検索付きUIに切り替える
- 破壊的操作は `tone="danger"` にして `text-danger-600` で表す。1メニューに1件まで
- 外側クリックと Escape で閉じる。項目選択でも自動で閉じる
- トリガーに `aria-haspopup` と `aria-expanded`、メニューに `role=menu` / 各項目に `role=menuitem` を付ける
- 影は `shadow-md` まで。パネルの重さは Modal 専用

## 例

```tsx
<Dropdown
  label="操作"
  items={[
    { id: "edit", label: "編集", onSelect: handleEdit },
    { id: "dup", label: "複製", onSelect: handleDuplicate },
    { id: "del", label: "削除", tone: "danger", onSelect: handleDelete },
  ]}
/>
```
