import ReportsView from "@/components/views/ReportsView";
import {
  getSalesSeries,
  getInvoices,
  getInventory,
  getExpenses,
  getWaste,
  buildKpis,
  topProducts,
  stockAlerts,
  totalExpenses,
  wasteTotal,
  monthRevenue,
  monthCost,
} from "@/lib/data";

export default async function ReportsPage() {
  const [series, invoices, inventory, expenses, waste] = await Promise.all([
    getSalesSeries(),
    getInvoices(),
    getInventory(),
    getExpenses(),
    getWaste(),
  ]);

  const expensesTotal = totalExpenses(expenses);
  const kpis = buildKpis(series, expensesTotal);
  const alerts = stockAlerts(inventory);
  const revenue = monthRevenue(series);
  const cost = monthCost(series);

  return (
    <ReportsView
      todayRevenue={kpis.todayRevenue}
      todayInvoices={kpis.todayInvoices}
      avgInvoice={kpis.avgInvoice}
      monthRevenue={revenue}
      monthCost={cost}
      netProfit={revenue - cost - expensesTotal}
      expensesTotal={expensesTotal}
      wasteTotal={wasteTotal(waste)}
      stockAlertsCount={alerts.length}
      riskyCount={alerts.filter((a) => a.status === "خطر").length}
      topProducts={topProducts(invoices)}
    />
  );
}
