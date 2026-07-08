# List

先頭要素・タイトル・補足・末尾要素を持つ行を縦に並べる一覧コンポーネント。

## デザイナーの判断基準（具体的）

- 行の区切りは `List` の `divide-y divide-neutral-200` のみで表現する。各行に個別の枠線やカードを付けない
- 行（`ListItem`）はホバーで `bg-neutral-50`。クリックできる行にだけホバーを見せたい場合も既定のまま使う
- 余白は `px-4 py-3`（16px / 12px）で全行統一。行の高さを内容で変えない
- `title` は `text-sm font-medium text-neutral-900`、`description` は `text-xs text-neutral-500`。1行に収まらないテキストは `truncate` で省略する
- `leading` は行頭（Avatar・アイコン）、`trailing` は行末（Badge・操作ボタン）に置く。両端の要素は `shrink-0` で潰れさせない
- 要素間の間隔は `gap-3`（12px）。装飾目的の区切り線や背景色を足さない

## 例（tsx）

```tsx
import { List, ListItem, Avatar, Badge } from "@sevendot/ui";

<List>
  <ListItem
    leading={<Avatar initials="YT" size="sm" alt="山田 太郎" />}
    title="山田 太郎"
    description="taro@example.com"
    trailing={<Badge tone="success">有効</Badge>}
  />
  <ListItem
    leading={<Avatar initials="SH" size="sm" alt="佐藤 花子" />}
    title="佐藤 花子"
    description="hanako@example.com"
    trailing={<Badge tone="warning">招待中</Badge>}
  />
</List>;
```
