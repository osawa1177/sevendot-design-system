# Badge

状態・分類を示す小さなラベル。

## デザイナーの判断基準

- 色は**意味**で選ぶ: success=完了/有効、warning=注意/期限接近、danger=エラー/停止、primary=強調したい属性、neutral=それ以外
- 装飾目的で色を選ばない。「なんとなく緑」は禁止
- 1つの要素に付けるBadgeは2個まで。3個以上必要なら情報設計を見直す
- テキストは短く（2〜6文字目安）。文章を入れない

## 例

```tsx
<Badge tone="success">予約確定</Badge>
<Badge tone="warning">残りわずか</Badge>
<Badge>下書き</Badge>
```
