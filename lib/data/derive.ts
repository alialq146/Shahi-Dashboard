// =============================================================
//  اشتقاقات نطاق العمل (Pure Derivations)
//  دوال نقية بلا أي حالة — تأخذ كيانات خام (JSON عادي) وتُرجع
//  القيم المحسوبة. يستخدمها كل من مزوّد Mock والمزوّد المحاسبي
//  والصفحات نفسها، فيبقى منطق الحساب في مكان واحد.
// =============================================================

import type {
  ProductBase,
  Product,
  Profitability,
  Recipe,
  InventoryItem,
  StockStatus,
  Invoice,
  TopProduct,
  Purchase,
  Supplier,
  Expense,
  Waste,
  DailySales,
  Kpis,
  StockAlert,
  RevenueVsExpensePoint,
} from "@/lib/types";

const round = (n: number, d = 2) => +n.toFixed(d);

// ------------------------- المنتجات -------------------------
export function computeProduct(p: ProductBase): Product {
  const totalCost = round(p.ingredientsCost + p.packagingCost);
  const profit = round(p.sellPrice - totalCost);
  const margin = round((profit / p.sellPrice) * 100, 1);
  return { ...p, totalCost, profit, margin };
}

export function profitabilityOf(margin: number): Profitability {
  if (margin >= 60) return "ممتاز";
  if (margin >= 40) return "جيد";
  return "منخفض";
}

// ------------------------- الوصفات -------------------------
export function recipeTotal(r: Recipe): number {
  return round(r.items.reduce((s, it) => s + it.qty * it.unitCost, 0));
}

// ------------------------- المخزون -------------------------
export function daysLeft(it: InventoryItem): number {
  if (it.dailyUse <= 0) return 999;
  return Math.floor(it.qty / it.dailyUse);
}
export function stockValue(it: InventoryItem): number {
  return round(it.qty * it.unitCost);
}
export function stockStatus(it: InventoryItem): StockStatus {
  const d = daysLeft(it);
  if (it.qty < it.min || d <= 2) return "خطر";
  if (it.qty < it.min * 1.4 || d <= 5) return "منخفض";
  return "ممتاز";
}
export function stockAlerts(inventory: InventoryItem[]): StockAlert[] {
  return inventory
    .map((it) => ({ it, status: stockStatus(it), days: daysLeft(it) }))
    .filter((a) => a.status !== "ممتاز")
    .sort((a, b) => a.days - b.days);
}

// ------------------------- المبيعات -------------------------
export function topProducts(invoices: Invoice[]): TopProduct[] {
  const map = new Map<string, TopProduct>();
  invoices.forEach((inv) => {
    const t = map.get(inv.product) ?? { name: inv.product, qty: 0, revenue: 0 };
    t.qty += inv.qty;
    t.revenue += inv.amount;
    map.set(inv.product, t);
  });
  return Array.from(map.values()).sort((a, b) => b.qty - a.qty);
}

export const monthRevenue = (series: DailySales[]) => series.reduce((s, d) => s + d.revenue, 0);
export const monthCost = (series: DailySales[]) => series.reduce((s, d) => s + d.cost, 0);

// ------------------------- الموردين -------------------------
export function suppliersFrom(purchases: Purchase[]): Supplier[] {
  const map = new Map<string, Supplier>();
  purchases.forEach((p) => {
    const cur =
      map.get(p.supplier) ??
      { name: p.supplier, category: "مواد خام", totalPurchases: 0, outstanding: 0 };
    cur.totalPurchases += p.price;
    if (p.status === "آجلة") cur.outstanding += p.price;
    if (p.status === "مدفوعة جزئياً") cur.outstanding += p.price * 0.5;
    map.set(p.supplier, cur);
  });
  return Array.from(map.values());
}

// ------------------------- المصروفات -------------------------
export const totalExpenses = (e: Expense[]) => e.reduce((s, x) => s + x.amount, 0);
export const fixedExpenses = (e: Expense[]) =>
  e.filter((x) => x.type === "ثابتة").reduce((s, x) => s + x.amount, 0);
export const variableExpenses = (e: Expense[]) => totalExpenses(e) - fixedExpenses(e);
export const biggestExpense = (e: Expense[]) => [...e].sort((a, b) => b.amount - a.amount)[0];

// ------------------------- الهدر -------------------------
export const wasteTotal = (w: Waste[]) => round(w.reduce((s, x) => s + x.cost, 0));

// ------------------------- مؤشرات اللوحة -------------------------
export function buildKpis(series: DailySales[], monthlyExpenses: number): Kpis {
  const today = series[series.length - 1];
  const yesterday = series[series.length - 2];
  return {
    todayRevenue: today.revenue,
    todayInvoices: today.invoices,
    avgInvoice: round(today.revenue / today.invoices, 1),
    netProfitToday: round(today.revenue - today.cost - monthlyExpenses / 30, 0),
    marginToday: round(((today.revenue - today.cost) / today.revenue) * 100, 1),
    monthlyExpenses,
    monthRevenue: monthRevenue(series),
    monthCost: monthCost(series),
    revenueVsYesterday: round(((today.revenue - yesterday.revenue) / yesterday.revenue) * 100, 1),
  };
}

export function revenueVsExpense(last7: DailySales[], monthlyExpenses: number): RevenueVsExpensePoint[] {
  return last7.map((d) => ({
    label: d.label,
    الإيرادات: d.revenue,
    المصروفات: Math.round(monthlyExpenses / 30 + d.cost),
  }));
}
