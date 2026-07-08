# Sidebar

アプリ全体の主要セクションを縦に並べる恒常的なナビゲーション。

## デザイナーの判断基準

- 幅は `w-64`（256px）固定。可変にしない。狭い画面ではドロワーとして開閉する設計にする
- ナビ項目は5〜8個を上限にする。それ以上はグループ見出しで区切るか情報設計を見直す
- アクティブ項目は `bg-primary-50 text-primary-700` で塗り、`aria-current="page"` を付ける。hover は `bg-neutral-50`
- アイコンは任意。使うなら全項目に付けるか全く付けないかで統一し、一部だけにしない
- ブランド名は `header` スロット、ユーザー情報やログアウトは `footer` スロットに置く。ナビ項目リストに混在させない
- ラベルは遷移先セクション名（「ダッシュボード」「設定」）。動作語にしない

## 例

```tsx
<Sidebar
  header={<span className="text-sm font-semibold text-neutral-900">SEVEN DOT.</span>}
  activeId="dashboard"
  items={[
    { id: "dashboard", label: "ダッシュボード", href: "/dashboard" },
    { id: "projects", label: "プロジェクト", href: "/projects" },
    { id: "settings", label: "設定", href: "/settings" },
  ]}
  footer={<span className="text-xs text-neutral-500">tomohisa</span>}
/>
```
