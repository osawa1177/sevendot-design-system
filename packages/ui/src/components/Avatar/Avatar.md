# Avatar

人物を表す円形のアイコン。画像またはイニシャルを表示する。

## デザイナーの判断基準（具体的）

- `src` があれば画像（`img`）、無ければ `initials` を表示する。両方無い場合は空の円になるので必ずどちらかを渡す
- 画像には `alt` を必ず指定する（人物名を入れる）。イニシャル表示は `role="img"` + `aria-label` で人物名を伝える
- サイズは3種のみ。`sm`=32px（一覧の行頭）、`md`=40px（既定）、`lg`=48px（プロフィール見出し）。中間サイズを作らない
- 形は常に `rounded-full`。角丸の四角にしない
- イニシャル背景は `bg-primary-50`、文字は `text-primary-600` に固定する。人物ごとに色を変えない
- イニシャルは1〜2文字。3文字以上入れない

## 例（tsx）

```tsx
import { Avatar } from "@sevendot/ui";

<div className="flex items-center gap-3">
  <Avatar src="/users/taro.jpg" alt="山田 太郎" size="lg" />
  <Avatar initials="YT" alt="山田 太郎" size="md" />
  <Avatar initials="SH" alt="佐藤 花子" size="sm" />
</div>;
```
