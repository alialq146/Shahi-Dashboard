import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { KPICard } from "@/components/ui/KPICard";
import { ChartCard } from "@/components/ui/ChartCard";
import { HBarChart } from "@/components/charts";
import { getWaste, wasteTotal, type Waste } from "@/lib/data";
import { sar, num } from "@/lib/utils";
import { Trash2, AlertOctagon } from "lucide-react";

export default async function WastePage() {
  const waste = await getWaste();
  const wasteTotalVal = wasteTotal(waste);
  const byReason = (() => {
    const m = new Map<string, number>();
    waste.forEach((w) => m.set(w.reason, +(((m.get(w.reason) ?? 0) + w.cost)).toFixed(2)));
    return Array.from(m.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  })();
  const topReason = byReason[0];

  const columns: Column<Waste>[] = [
    { key: "item", header: "المادة / المنتج", render: (r) => <span className="font-bold text-ink">{r.item}</span> },
    { key: "qty", header: "الكمية", align: "center", render: (r) => `${num(r.qty)} ${r.unit}` },
    { key: "reason", header: "السبب", render: (r) => <StatusBadge label={r.reason} tone="warn" /> },
    { key: "cost", header: "التكلفة", align: "end", render: (r) => <span className="font-bold text-danger">{sar(r.cost, 2)}</span> },
    { key: "date", header: "التاريخ", align: "center", render: (r) => new Intl.DateTimeFormat("ar-SA", { day: "2-digit", month: "short" }).format(new Date(r.date)) },
    { key: "employee", header: "الموظف" },
    { key: "shift", header: "الشفت", render: (r) => <StatusBadge label={r.shift} /> },
  ];

  return (
    <>
      <PageHeader title="الهدر والتالف" description="تتبّع التالف وأسبابه لتقليل الفاقد" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard title="إجمالي تكلفة الهدر" value={sar(wasteTotalVal, 2)} icon={Trash2} accent="danger" />
        <KPICard title="عدد الحالات" value={num(waste.length)} icon={AlertOctagon} accent="espresso" />
        <KPICard title="أكثر سبب تكلفة" value={topReason?.name ?? "—"} icon={AlertOctagon} accent="caramel" hint={sar(topReason?.value ?? 0, 2)} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <ChartCard title="الهدر حسب السبب" subtitle="إجمالي التكلفة لكل سبب" className="lg:col-span-2">
          <HBarChart data={byReason} color="#B4503C" />
        </ChartCard>
        <div className="lg:col-span-3">
          <h3 className="mb-3 font-display text-base font-bold text-ink">سجل الهدر</h3>
          <DataTable columns={columns} rows={waste} rowKey={(r) => r.id} />
        </div>
      </div>
    </>
  );
}
