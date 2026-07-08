ラベル付きのチェックボックス。ラベルクリックでも切り替わり、選択マークは primary で表現する。

## デザイナーの判断基準（具体的、曖昧語禁止）

- `label` は必須。ラベルのないチェックボックスは作らない。
- チェックボックス本体は18px角（`style={{ width: 18, height: 18 }}`）。他サイズは用意しない。
- ラベルは `htmlFor` で input と結び付け、ラベルクリックでも切り替わるようにする。
- 選択色は `accent-primary-600`。チェック済みの背景を他の色で塗らない。
- ラベルと本体の間隔は `gap-2`（8px）固定。
- disabled 時は本体とラベルを `opacity-50` にし、カーソルを `cursor-pointer` にしない。
- 3件以上を縦に並べるときは親を `flex flex-col gap-2` でまとめる。個々の余白を変えない。

## 例（tsx）

```tsx
<div className="flex flex-col gap-2">
  <Checkbox label="利用規約に同意する" defaultChecked />
  <Checkbox label="メールマガジンを受け取る" />
  <Checkbox label="この項目は選べません" disabled />
</div>
```
