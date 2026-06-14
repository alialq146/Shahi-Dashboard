import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { KPICard } from "@/components/ui/KPICard";
import { getProducts, profitabilityOf, type Product } from "@/lib/data";
import { sar, pct } from "@/lib/utils";
import { Coins, TrendingUp, Percent } from "lucide-react";

export default async function ProductsPage() {
  const products = await getProducts();
  const avgMargin = products.reduce((s, p) => s + p.margin, 0) / products.length;
  const avgProfit = products.reduce((s, p) => s + p.profit, 0) / products.length;
  const best = [...products].sort((a, b) => b.margin - a.margin)[0];

  const columns: Column<Product>[] = [
    { key: "name", header: "المنتج", render: (r) => <span className="font-bold text-ink">{r.name}</span> },
    { key: "sellPrice", header: "سعر البيع", align: "end", render: (r) => sar(r.sellPrice, 2) },
    { key: "ingredientsCost", header: "تكلفة المكونات", align: "end", render: (r) => sar(r.ingredientsCost, 2) },
    { key: "packagingCost", header: "تكلفة العبوة", align: "end", render: (r) => sar(r.packagingCost, 2) },
    { key: "totalCost", header: "التكلفة الإجمالية", align: "end", render: (r) => <span className="text-danger">{sar(r.totalCost, 2)}</span> },
    { key: "profit", header: "الربح/كوب", align: "end", render: (r) => <span className="font-bold text-olive-dark">{sar(r.profit, 2)}</span> },
    { key: "margin", header: "هامش الربح", align: "center", render: (r) => <span className="font-bold">{pct(r.margin)}</span> },
    { key: "status", header: "الربحية", align: "center", render: (r) => <StatusBadge label={profitabilityOf(r.margin)} /> },
  ];

  return (
    <>
      <PageHeader title="تكلفة المنتجات" description="تحليل تكلفة وربحية كل منتج لكل كوب" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard title="متوسط هامش الربح" value={pct(avgMargin)} icon={Percent} accent="olive" />
        <KPICard title="متوسط الربح لكل كوب" value={sar(avgProfit, 2)} icon={TrendingUp} accent="caramel" />
        <KPICard title="الأعلى ربحية" value={best.name} icon={Coins} hint={pct(best.margin)} accent="espresso" />
      </div>

      <div className="mt-5">
        <DataTable columns={columns} rows={products} rowKey={(r) => r.id} />
      </div>

      <p className="mt-4 text-xs text-muted">
        * معايير الربحية: ممتاز (هامش ≥ 60%) · جيد (40–60%) · منخفض (أقل من 40%).
      </p>
    </>
  );
}
