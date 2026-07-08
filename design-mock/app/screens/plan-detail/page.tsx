/**
 * page: plan-detail（プラン詳細）
 * section 構成: PlanSummarySection / PlanPriceSection / PlanNoticeSection
 * このファイルが main にある状態＝この画面のデザインマスター。
 */
import { Button, Tabs, Alert, Card, CardBody, Badge } from "@sevendot/ui";
import { PlanCard } from "../../../components/PlanCard";

function PlanSummarySection() {
  return (
    <section className="space-y-2">
      <div className="flex items-center gap-2">
        <Badge tone="primary">人気</Badge>
        <Badge tone="warning">残りわずか</Badge>
      </div>
      <h1 className="text-2xl font-semibold text-neutral-900">
        アリスの国 3日間モデルプラン
      </h1>
      <p className="text-sm text-neutral-700">
        はじめての方向けに、主要スポットを無理なく巡る3日間のプランです。
      </p>
    </section>
  );
}

function PlanPriceSection() {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-neutral-900">料金</h2>
      <Card>
        <CardBody className="pt-4 divide-y divide-neutral-200">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-neutral-700">基本料金（大人1名）</span>
            <span className="text-sm font-medium text-neutral-900">
              ¥128,000
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-neutral-700">燃油サーチャージ</span>
            <span className="text-sm font-medium text-neutral-900">
              ¥24,000
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-semibold text-neutral-900">合計</span>
            <span className="text-lg font-semibold text-neutral-900">
              ¥152,000
            </span>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

function PlanNoticeSection() {
  return (
    <section>
      <Alert tone="info" title="予約前にご確認ください">
        出発の14日前までキャンセル無料です。それ以降は所定の取消料がかかります。
      </Alert>
    </section>
  );
}

function RelatedPlansSection() {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-neutral-900">関連プラン</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PlanCard
          title="アリスの国 5日間じっくりプラン"
          price={218000}
          duration="5日間 / 4泊"
          tag={{ label: "人気", tone: "primary" }}
        />
        <PlanCard
          title="週末アリスの国 弾丸プラン"
          price={98000}
          duration="2日間 / 1泊"
        />
      </div>
    </section>
  );
}

export default function PlanDetailPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-6 sm:px-8 sm:py-10 space-y-8">
      <PlanSummarySection />

      <Tabs
        items={[
          { id: "overview", label: "概要" },
          { id: "price", label: "料金" },
          { id: "review", label: "レビュー" },
        ]}
        defaultValue="overview"
      />

      <PlanPriceSection />
      <PlanNoticeSection />
      <RelatedPlansSection />

      <div className="sticky bottom-4">
        <Button size="lg" fullWidth>
          このプランを予約する
        </Button>
      </div>
    </main>
  );
}
