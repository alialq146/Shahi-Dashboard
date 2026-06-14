import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { KPICard } from "@/components/ui/KPICard";
import { Card, CardContent } from "@/components/ui/Card";
import { getPurchases, getSuppliers, type Purchase } from "@/lib/data";
import { sar, num, pct } from "@/lib/utils";
import { Truck, Banknote, ArrowDownRight, ArrowUpRight } from "lucide-react";

export default async function PurchasesPage() {
  const [purchases, suppliers] = await Promise.all([getPurchases(), getSuppliers()]);
  const totalPurchases = purchases.reduce((s, p) => s + p.price, 0);
  const outstanding = suppliers.reduce((s, p) => s + p.outstanding, 0);

  const columns: Column<Purchase>[] = [
    { key: "id", header: "رقم الفاتورة", render: (r) => <span className="font-bold text-caramel-dark">{r.id}</span> },
    { key: "supplier", header: "المورد", render: (r) => <span className="font-medium text-ink">{r.supplier}</span> },
    { key: "material", header: "المادة" },
    { key: "qty", header: "الكمية", align: "center", render: (r) => `${num(r.qty)} ${r.unit}` },
    { key: "price", header: "سعر الشراء", align: "end", render: (r) => <span className="font-bold">{sar(r.price)}</span> },
    {
      key: "change",
      header: "تغير السعر",
      align: "center",
      render: (r) => {
        const diff = ((r.currUnitPrice - r.prevUnitPrice) / r.prevUnitPrice) * 100;
        const up = diff > 0;
        const flat = Math.abs(diff) < 0.01;
        if (flat) return <span className="text-xs text-muted">ثابت</span>;
        return (
          <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${up ? "text-danger" : "text-olive-dark"}`}>
            {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {pct(Math.abs(diff))}
          </span>
        );
      },
    },
    { key: "date", header: "التاريخ", align: "center", render: (r) => new Intl.DateTimeFormat("ar-SA", { day: "2-digit", month: "short" }).format(new Date(r.date)) },
    { key: "payment", header: "الدفع", render: (r) => <StatusBadge label={r.payment} /> },
    { key: "status", header: "حالة الفاتورة", align: "center", render: (r) => <StatusBadge label={r.status} /> },
  ];

  return (
    <>
      <PageHeader title="المشتريات والموردين" description="فواتير الشراء ومقارنة تغيّر الأسعار بين عمليات الشراء" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard title="إجمالي المشتريات" value={sar(totalPurchases)} icon={Banknote} accent="caramel" />
        <KPICard title="مستحقات آجلة" value={sar(outstanding)} icon={Truck} accent="danger" hint="غير مسددة" />
        <KPICard title="عدد الموردين" value={num(suppliers.length)} icon={Truck} accent="espresso" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {suppliers.map((s) => (
          <Card key={s.name}>
            <CardContent className="p-4">
              <p className="text-sm font-bold text-ink">{s.name}</p>
              <p className="mt-0.5 text-xs text-muted">{s.category}</p>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-[11px] text-muted">إجمالي التعامل</p>
                  <p className="font-display text-base font-extrabold text-ink">{sar(s.totalPurchases)}</p>
                </div>
                {s.outstanding > 0 ? (
                  <StatusBadge label={`مستحق ${sar(s.outstanding)}`} tone="danger" />
                ) : (
                  <StatusBadge label="مسدد بالكامل" tone="good" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-5">
        <h3 className="mb-3 font-display text-base font-bold text-ink">سجل المشتريات</h3>
        <DataTable columns={columns} rows={purchases} rowKey={(r) => r.id} />
      </div>
    </>
  );
}
