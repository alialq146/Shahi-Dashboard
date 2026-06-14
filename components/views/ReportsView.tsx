"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { sar, num, pct } from "@/lib/utils";
import {
  FileBarChart,
  TrendingUp,
  Boxes,
  Trash2,
  Wallet,
  Trophy,
  Download,
  Calendar,
} from "lucide-react";

const ranges = ["اليوم", "هذا الأسبوع", "هذا الشهر", "آخر 30 يوم"] as const;

export interface ReportsData {
  todayRevenue: number;
  todayInvoices: number;
  avgInvoice: number;
  monthRevenue: number;
  monthCost: number;
  netProfit: number;
  expensesTotal: number;
  wasteTotal: number;
  stockAlertsCount: number;
  riskyCount: number;
  topProducts: { name: string; qty: number }[];
}

export default function ReportsView(d: ReportsData) {
  const [range, setRange] = useState<(typeof ranges)[number]>("هذا الشهر");

  const reports = [
    {
      icon: TrendingUp,
      title: "تقرير المبيعات اليومي",
      tone: "caramel",
      lines: [
        ["مبيعات اليوم", sar(d.todayRevenue)],
        ["عدد الفواتير", num(d.todayInvoices)],
        ["متوسط الفاتورة", sar(d.avgInvoice, 1)],
      ],
    },
    {
      icon: Trophy,
      title: "تقرير الربحية",
      tone: "olive",
      lines: [
        ["إيراد الفترة", sar(d.monthRevenue)],
        ["صافي الربح", sar(d.netProfit)],
        ["نسبة الهامش", pct(((d.monthRevenue - d.monthCost) / d.monthRevenue) * 100)],
      ],
    },
    {
      icon: Boxes,
      title: "تقرير المخزون",
      tone: "espresso",
      lines: [
        ["مواد تحتاج إعادة طلب", num(d.stockAlertsCount)],
        ["مواد بحالة خطر", num(d.riskyCount)],
      ],
    },
    {
      icon: Trash2,
      title: "تقرير الهدر",
      tone: "danger",
      lines: [
        ["إجمالي تكلفة الهدر", sar(d.wasteTotal, 2)],
        ["نسبة الهدر للإيراد", pct((d.wasteTotal / d.todayRevenue) * 100)],
      ],
    },
    {
      icon: Wallet,
      title: "تقرير المصروفات",
      tone: "caramel",
      lines: [
        ["إجمالي المصروفات", sar(d.expensesTotal)],
        ["نسبة من الإيراد", pct((d.expensesTotal / d.monthRevenue) * 100)],
      ],
    },
    {
      icon: FileBarChart,
      title: "تقرير أفضل المنتجات",
      tone: "olive",
      lines: d.topProducts.slice(0, 3).map((p, i) => [`${i + 1}. ${p.name}`, `${num(p.qty)} كوب`]),
    },
  ];

  return (
    <>
      <PageHeader
        title="التقارير"
        description="ملخصات تحليلية جاهزة للطباعة والمشاركة"
        actions={
          <button className="inline-flex items-center gap-2 rounded-xl bg-espresso px-4 py-2 text-sm font-bold text-beige hover:bg-espresso-700">
            <Download className="h-4 w-4" /> تصدير PDF
          </button>
        }
      />

      {/* اختيار الفترة */}
      <Card className="mb-5">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-ink">
            <Calendar className="h-4 w-4 text-caramel-dark" /> الفترة الزمنية
          </span>
          <div className="flex flex-wrap rounded-xl border border-beige-line bg-beige/50 p-1">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={
                  "rounded-lg px-3.5 py-1.5 text-sm font-bold transition " +
                  (range === r ? "bg-espresso text-beige" : "text-muted hover:text-ink")
                }
              >
                {r}
              </button>
            ))}
          </div>
          <StatusBadge label={`الفترة المختارة: ${range}`} tone="info" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((rep) => {
          const Icon = rep.icon;
          return (
            <Card key={rep.title}>
              <CardContent className="p-5">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-caramel/12 text-caramel-dark">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-display text-sm font-bold text-ink">{rep.title}</h3>
                </div>
                <dl className="space-y-2.5">
                  {rep.lines.map(([k, v], i) => (
                    <div key={i} className="flex items-center justify-between border-b border-beige-line/60 pb-2 last:border-0 last:pb-0">
                      <dt className="text-sm text-muted">{k}</dt>
                      <dd className="text-sm font-bold text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
