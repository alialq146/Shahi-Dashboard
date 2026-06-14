"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ChartCard } from "@/components/ui/ChartCard";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { KPICard } from "@/components/ui/KPICard";
import { SalesAreaChart, HBarChart } from "@/components/charts";
import type { Invoice, DailySales } from "@/lib/types";
import { sar, num } from "@/lib/utils";
import { Receipt, Banknote, ShoppingBag } from "lucide-react";

type Period = "اليوم" | "الأسبوع" | "الشهر";

interface Props {
  invoices: Invoice[];
  last7: DailySales[];
  salesDaily: DailySales[];
}

export default function SalesView({ invoices, last7, salesDaily }: Props) {
  const [period, setPeriod] = useState<Period>("الأسبوع");

  const filtered = useMemo(() => {
    const now = new Date();
    const cutoff = new Date();
    if (period === "اليوم") cutoff.setHours(0, 0, 0, 0);
    else if (period === "الأسبوع") cutoff.setDate(now.getDate() - 7);
    else cutoff.setDate(now.getDate() - 30);
    return invoices.filter((i) => new Date(i.datetime) >= cutoff);
  }, [period, invoices]);

  const totalSales = filtered.reduce((s, i) => s + i.amount, 0);
  const avg = filtered.length ? totalSales / filtered.length : 0;

  const chartData = period === "اليوم" ? last7 : period === "الأسبوع" ? last7 : salesDaily;

  const byProduct = useMemo(() => {
    const m = new Map<string, number>();
    filtered.forEach((i) => m.set(i.product, (m.get(i.product) ?? 0) + i.qty));
    return Array.from(m.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [filtered]);

  const columns: Column<Invoice>[] = [
    { key: "id", header: "رقم الفاتورة", render: (r) => <span className="font-bold text-caramel-dark">{r.id}</span> },
    {
      key: "datetime",
      header: "التاريخ والوقت",
      render: (r) =>
        new Intl.DateTimeFormat("ar-SA", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(r.datetime)),
    },
    { key: "product", header: "المنتج" },
    { key: "qty", header: "الكمية", align: "center", render: (r) => num(r.qty) },
    { key: "amount", header: "المبلغ", align: "end", render: (r) => <span className="font-bold">{sar(r.amount, 1)}</span> },
    { key: "payment", header: "طريقة الدفع", render: (r) => <StatusBadge label={r.payment} /> },
    { key: "shift", header: "الشفت", render: (r) => <StatusBadge label={r.shift} /> },
    { key: "employee", header: "الموظف" },
  ];

  return (
    <>
      <PageHeader
        title="المبيعات"
        description="سجل الفواتير والتحليل اليومي للمبيعات"
        actions={
          <div className="flex rounded-xl border border-beige-line bg-beige-card p-1">
            {(["اليوم", "الأسبوع", "الشهر"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={
                  "rounded-lg px-3.5 py-1.5 text-sm font-bold transition " +
                  (period === p ? "bg-espresso text-beige" : "text-muted hover:text-ink")
                }
              >
                {p}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard title={`مبيعات ${period}`} value={sar(totalSales, 1)} icon={Banknote} accent="caramel" />
        <KPICard title="عدد الفواتير" value={num(filtered.length)} icon={Receipt} accent="espresso" />
        <KPICard title="متوسط الفاتورة" value={sar(avg, 1)} icon={ShoppingBag} accent="olive" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <ChartCard title="المبيعات حسب الأيام" subtitle="الإيراد اليومي" className="lg:col-span-3">
          <SalesAreaChart data={chartData} />
        </ChartCard>
        <ChartCard title="أعلى المنتجات مبيعاً" subtitle="ضمن الفترة المحددة" className="lg:col-span-2">
          <HBarChart data={byProduct} />
        </ChartCard>
      </div>

      <div className="mt-5">
        <h3 className="mb-3 font-display text-base font-bold text-ink">سجل الفواتير ({num(filtered.length)})</h3>
        <DataTable columns={columns} rows={filtered} rowKey={(r) => r.id} empty="لا توجد فواتير في هذه الفترة" />
      </div>
    </>
  );
}
