# Table

表形式のデータを行と列で一覧表示する複合コンポーネント。

## デザイナーの判断基準（具体的）

- 外枠は `border border-neutral-200 rounded-lg overflow-hidden` で囲む。Card と同じ枠線・角丸を使い、影は付けない
- ヘッダ行（`TableHead`）は `bg-neutral-50` + `text-xs text-neutral-500`。見出しは太字にしすぎず `font-medium` まで
- ヘッダのセル（`TableHeaderCell`）は `scope="col"` を必ず付ける。スクリーンリーダーが列を認識できる
- 本文の行（`TableRow`）はホバーで `bg-neutral-50`。行の区切りは `TableBody` の `divide-y divide-neutral-200` で表現し、罫線を全セルに引かない
- セル余白は `px-4 py-3`（16px / 12px）で統一。列ごとに余白を変えない
- 数値列を右寄せしたい場合はセルに `text-right` を追加する。装飾目的で背景色を付けない

## 例（tsx）

```tsx
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@sevendot/ui";

<Table>
  <TableHead>
    <TableRow>
      <TableHeaderCell>氏名</TableHeaderCell>
      <TableHeaderCell>メール</TableHeaderCell>
      <TableHeaderCell>ステータス</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>山田 太郎</TableCell>
      <TableCell>taro@example.com</TableCell>
      <TableCell>有効</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>佐藤 花子</TableCell>
      <TableCell>hanako@example.com</TableCell>
      <TableCell>招待中</TableCell>
    </TableRow>
  </TableBody>
</Table>;
```
