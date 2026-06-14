import { KPICard } from "@/components/ui/KPICard";
import { ChartCard } from "@/components/ui/ChartCard";
import { Card, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AlertCard } from "@/components/ui/AlertCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SalesAreaChart, RevenueExpenseBar } from "@/components/charts";
import { getDashboard, daysLeft } from "@/lib/data";
import { sar, num, pct } from "@/lib/utils";
import { Banknote, TrendingUp, Receipt, ShoppingBag, Percent, Wallet } from "lucide-react";

export default async function DashboardPage() {
  const { kpis, last7, topProducts, stockAlerts, revenueVsExpense, today } = await getDashboard();
  const maxQty = Math.max(...topProducts.map((p) => p.qty));

  return (
    <>
      <PageHeader
        title="اللوحة التنفيذية"
        description="ملخص لحظي لأداء المحل اليوم — جميع الأرقام تجريبية"
        actions={
          <span className="rounded-xl border border-beige-line bg-beige-card px-3 py-2 text-xs font-bold text-muted">
            اليوم · {new Intl.DateTimeFormat("ar-SA", { weekday: "long", day: "numeric", month: "long" }).format(new Date())}
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <KPICard title="مبيعات اليوم" value={sar(kpis.todayRevenue)} icon={Banknote} delta={kpis.revenueVsYesterday} hint="مقارنة بالأمس" accent="caramel" />
        <KPICard title="صافي الربح التقديري" value={sar(kpis.netProfitToday)} icon={TrendingUp} hint="بعد توزيع المصروفات" accent="olive" />
        <KPICard title="عدد الفواتير" value={num(kpis.todayInvoices)} icon={Receipt} hint="فاتورة اليوم" accent="espresso" />
        <KPICard title="متوسط قيمة الفاتورة" value={sar(kpis.avgInvoice, 1)} icon={ShoppingBag} accent="caramel" />
        <KPICard title="نسبة هامش الربح" value={pct(kpis.marginToday)} icon={Percent} hint="إجمالي اليوم" accent="olive" />
        <KPICard title="المصروفات الشهرية" value={sar(kpis.monthlyExpenses)} icon={Wallet} accent="danger" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <ChartCard title="مبيعات آخر 7 أيام" subtitle="إجمالي الإيرادات اليومية" className="lg:col-span-3">
          <SalesAreaChart data={last7} />
        </ChartCard>
        <ChartCard title="الإيرادات مقابل المصروفات" subtitle="آخر 7 أيام" className="lg:col-span-2">
          <RevenueExpenseBar data={revenueVsExpense} />
        </ChartCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* الأكثر مبيعاً */}
        <ChartCard title="المنتجات الأكثر مبيعاً" subtitle="حسب الكمية المباعة" className="lg:col-span-2">
          <div className="space-y-3">
            {topProducts.slice(0, 6).map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-espresso/8 text-xs font-bold text-espresso-700">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-bold text-ink">{p.name}</span>
                    <span className="text-xs text-muted">{num(p.qty)} كوب · {sar(p.revenue)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-beige">
                    <div
                      className="h-full rounded-full bg-gradient-to-l from-caramel to-caramel-light"
                      style={{ width: `${(p.qty / maxQty) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* تنبيهات المخزون */}
        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-ink">تنبيهات المخزون</h3>
              <StatusBadge label={`${stockAlerts.length} تنبيه`} tone="warn" />
            </div>
            <div className="space-y-2.5">
              {stockAlerts.length === 0 && (
                <p className="py-6 text-center text-sm text-muted">كل المواد ضمن المستوى الآمن ✓</p>
              )}
              {stockAlerts.map((a) => (
                <AlertCard
                  key={a.it.id}
                  level={a.status === "خطر" ? "danger" : "warn"}
                  title={a.it.name}
                >
                  المتبقي يكفي لـ {num(daysLeft(a.it))} يوم · الكمية {num(a.it.qty)} {a.it.unit}
                </AlertCard>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ملخص أداء اليوم */}
      <Card className="mt-5">
        <CardContent className="p-5">
          <h3 className="mb-4 font-display text-base font-bold text-ink">ملخص أداء اليوم</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { k: "إجمالي الإيراد", v: sar(today.revenue) },
              { k: "تكلفة البضاعة", v: sar(today.cost) },
              { k: "مجمل الربح", v: sar(today.revenue - today.cost) },
              { k: "نسبة الهامش", v: pct(kpis.marginToday) },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-beige-line bg-beige/40 p-4">
                <p className="text-xs text-muted">{s.k}</p>
                <p className="mt-1 font-display text-lg font-extrabold text-ink">{s.v}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
