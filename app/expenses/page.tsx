import { PageHeader } from "@/components/ui/PageHeader";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { KPICard } from "@/components/ui/KPICard";
import { ChartCard } from "@/components/ui/ChartCard";
import { ExpensePie } from "@/components/charts";
import {
  getExpenses,
  totalExpenses,
  fixedExpenses,
  variableExpenses,
  biggestExpense,
  type Expense,
} from "@/lib/data";
import { sar, pct } from "@/lib/utils";
import { Wallet, Lock, Activity, TrendingUp } from "lucide-react";

export default async function ExpensesPage() {
  const expenses = await getExpenses();
  const expensesTotal = totalExpenses(expenses);
  const expensesFixed = fixedExpenses(expenses);
  const expensesVariable = variableExpenses(expenses);
  const topExpense = biggestExpense(expenses);
  const pieData = expenses.map((e) => ({ name: e.category, value: e.amount }));

  const columns: Column<Expense>[] = [
    { key: "name", header: "بند المصروف", render: (r) => <span className="font-bold text-ink">{r.name}</span> },
    { key: "category", header: "التصنيف", render: (r) => <span className="text-muted">{r.category}</span> },
    { key: "type", header: "النوع", align: "center", render: (r) => <StatusBadge label={r.type} tone={r.type === "ثابتة" ? "neutral" : "info"} /> },
    { key: "amount", header: "المبلغ الشهري", align: "end", render: (r) => <span className="font-bold">{sar(r.amount)}</span> },
    { key: "share", header: "النسبة", align: "center", render: (r) => pct((r.amount / expensesTotal) * 100) },
  ];

  return (
    <>
      <PageHeader title="المصروفات" description="توزيع المصروفات الثابتة والمتغيرة شهرياً" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard title="إجمالي المصروفات الشهرية" value={sar(expensesTotal)} icon={Wallet} accent="danger" />
        <KPICard title="مصروفات ثابتة" value={sar(expensesFixed)} icon={Lock} accent="espresso" hint={pct((expensesFixed / expensesTotal) * 100)} />
        <KPICard title="مصروفات متغيرة" value={sar(expensesVariable)} icon={Activity} accent="caramel" hint={pct((expensesVariable / expensesTotal) * 100)} />
        <KPICard title="أكبر بند مصروف" value={topExpense.name} icon={TrendingUp} accent="olive" hint={sar(topExpense.amount)} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-5">
        <ChartCard title="توزيع المصروفات" subtitle="حسب التصنيف" className="lg:col-span-2">
          <ExpensePie data={pieData} />
        </ChartCard>
        <div className="lg:col-span-3">
          <h3 className="mb-3 font-display text-base font-bold text-ink">جدول المصروفات</h3>
          <DataTable columns={columns} rows={expenses} rowKey={(r) => r.id} />
        </div>
      </div>
    </>
  );
}
