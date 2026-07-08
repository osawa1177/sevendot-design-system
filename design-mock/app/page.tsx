import Link from "next/link";
import { Card, CardBody, Badge } from "@sevendot/ui";

const screens = [
  {
    href: "/screens/plan-detail",
    name: "plan-detail",
    label: "プラン詳細",
    status: "master",
  },
];

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Sevendot design-mock
        </h1>
        <p className="text-sm text-neutral-700">
          デザイン案のプレイグラウンド。main ブランチのこの一覧が画面マスターの正。
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-neutral-900">Screens</h2>
        <div className="space-y-2">
          {screens.map((s) => (
            <Link key={s.href} href={s.href} className="block">
              <Card interactive>
                <CardBody className="pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {s.label}
                    </p>
                    <p className="text-xs text-neutral-500">{s.name}</p>
                  </div>
                  <Badge tone="success">{s.status}</Badge>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
