import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { KPICard } from "@/components/ui/KPICard";
import { AlertCard } from "@/components/ui/AlertCard";
import { getInventory, daysLeft, stockValue, stockStatus, type InventoryItem } from "@/lib/data";
import { sar, num } from "@/lib/utils";
import { Boxes, AlertTriangle, Coins } from "lucide-react";

export default async function InventoryPage() {
  const inventory = await getInventory();
  const totalValue = inventory.reduce((s, it) => s + stockValue(it), 0);
  const risky = inventory.filter((it) => stockStatus(it) === "خطر");
  const low = inventory.filter((it) => stockStatus(it) === "منخفض");

  const columns: Column<InventoryItem>[] = [
    { key: "name", header: "المادة", render: (r) => <span className="font-bold text-ink">{r.name}</span> },
    { key: "qty", header: "الكمية الحالية", align: "center", render: (r) => `${num(r.qty)} ${r.unit}` },
    { key: "min", header: "الحد الأدنى", align: "center", render: (r) => `${num(r.min)} ${r.unit}` },
    { key: "dailyUse", header: "الاستهلاك اليومي", align: "center", render: (r) => `${num(r.dailyUse)} ${r.unit}` },
    {
      key: "days",
      header: "الأيام المتبقية",
      align: "center",
      render: (r) => {
        const d = daysLeft(r);
        const tone = d <= 2 ? "text-danger" : d <= 5 ? "text-warn" : "text-olive-dark";
        return <span className={`font-bold ${tone}`}>{num(d)} يوم</span>;
      },
    },
    { key: "value", header: "قيمة المخزون", align: "end", render: (r) => sar(stockValue(r), 1) },
    { key: "status", header: "الحالة", align: "center", render: (r) => <StatusBadge label={stockStatus(r)} /> },
  ];

  return (
    <>
      <PageHeader title="المخزون" description="مستويات المواد الخام والمستلزمات والأيام المتبقية" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard title="قيمة المخزون الإجمالية" value={sar(totalValue, 0)} icon={Coins} accent="caramel" />
        <KPICard title="مواد بحالة خطر" value={num(risky.length)} icon={AlertTriangle} accent="danger" hint="تحتاج إعادة طلب فوري" />
        <KPICard title="إجمالي المواد" value={num(inventory.length)} icon={Boxes} accent="espresso" />
      </div>

      {(risky.length > 0 || low.length > 0) && (
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {risky.map((it) => (
            <AlertCard key={it.id} level="danger" title={`${it.name} — مستوى خطر`}>
              المتبقي {num(it.qty)} {it.unit} · يكفي {num(daysLeft(it))} يوم فقط
            </AlertCard>
          ))}
          {low.map((it) => (
            <AlertCard key={it.id} level="warn" title={`${it.name} — مستوى منخفض`}>
              يُنصح بإعادة الطلب · يكفي {num(daysLeft(it))} أيام
            </AlertCard>
          ))}
        </div>
      )}

      <div className="mt-5">
        <DataTable columns={columns} rows={inventory} rowKey={(r) => r.id} />
      </div>
    </>
  );
}
