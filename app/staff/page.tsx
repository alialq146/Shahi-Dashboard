import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { KPICard } from "@/components/ui/KPICard";
import { getStaff, type Staff } from "@/lib/data";
import { sar, num } from "@/lib/utils";
import { Users, Star, Receipt } from "lucide-react";

function ratingTone(r: number) {
  if (r >= 4.6) return "ممتاز";
  if (r >= 4.3) return "جيد";
  return "منخفض";
}

export default async function StaffPage() {
  const staff = await getStaff();
  const totalInvoices = staff.reduce((s, e) => s + e.invoices, 0);
  const totalSales = staff.reduce((s, e) => s + e.sales, 0);
  const best = [...staff].sort((a, b) => b.rating - a.rating)[0];

  const columns: Column<Staff>[] = [
    {
      key: "name",
      header: "الموظف",
      render: (r) => (
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-olive to-olive-dark text-xs font-bold text-beige">
            {r.name.charAt(0)}
          </span>
          <span className="font-bold text-ink">{r.name}</span>
        </div>
      ),
    },
    { key: "shift", header: "الشفت", align: "center", render: (r) => <StatusBadge label={r.shift} /> },
    { key: "invoices", header: "عدد الفواتير", align: "center", render: (r) => num(r.invoices) },
    { key: "sales", header: "إجمالي المبيعات", align: "end", render: (r) => <span className="font-bold">{sar(r.sales)}</span> },
    { key: "avg", header: "متوسط الفاتورة", align: "end", render: (r) => sar(r.sales / r.invoices, 1) },
    { key: "wasteCases", header: "حالات الهدر", align: "center", render: (r) => <span className={r.wasteCases >= 4 ? "font-bold text-danger" : "text-espresso-600"}>{num(r.wasteCases)}</span> },
    {
      key: "rating",
      header: "تقييم الأداء",
      align: "center",
      render: (r) => (
        <div className="flex items-center justify-center gap-1.5">
          <Star className="h-4 w-4 fill-caramel text-caramel" />
          <span className="font-bold text-ink">{r.rating.toFixed(1)}</span>
          <StatusBadge label={ratingTone(r.rating)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="أداء الموظفين والشفتات" description="مقارنة أداء فريق العمل عبر الشفتات" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard title="إجمالي مبيعات الفريق" value={sar(totalSales)} icon={Users} accent="caramel" />
        <KPICard title="إجمالي الفواتير" value={num(totalInvoices)} icon={Receipt} accent="espresso" />
        <KPICard title="أفضل أداء" value={best.name} icon={Star} accent="olive" hint={`${best.rating.toFixed(1)} من 5`} />
      </div>

      <div className="mt-5">
        <DataTable columns={columns} rows={staff} rowKey={(r) => r.id} />
      </div>
    </>
  );
}
