/**
 * domain-component: PlanCard
 * プラン（商品）を一覧・詳細で見せるドメイン固有部品。
 * 実体は design-mock 内のみ。本番実装とは「粒度の切り方と命名」を揃える。
 */
import { Card, CardBody, Badge } from "@sevendot/ui";

export interface PlanCardProps {
  title: string;
  price: number;
  duration: string;
  tag?: { label: string; tone: "success" | "warning" | "primary" };
}

export function PlanCard({ title, price, duration, tag }: PlanCardProps) {
  return (
    <Card interactive>
      <CardBody className="pt-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
          {tag ? <Badge tone={tag.tone}>{tag.label}</Badge> : null}
        </div>
        <p className="text-xs text-neutral-500">{duration}</p>
        <p className="text-lg font-semibold text-neutral-900">
          ¥{price.toLocaleString()}
          <span className="text-xs font-normal text-neutral-500 ml-1">
            / 人
          </span>
        </p>
      </CardBody>
    </Card>
  );
}
