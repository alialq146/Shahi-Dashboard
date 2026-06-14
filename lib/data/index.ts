// =============================================================
//  واجهة البيانات العامة (Public Data API)
//  هذه هي النقطة الوحيدة التي تستوردها الصفحات. تختار المزوّد
//  الفعّال حسب الإعدادات، وتوفّر دوال جلب غير متزامنة + حزمة
//  اللوحة المجمّعة. كما تُعيد تصدير الاشتقاقات النقية والأنواع.
// =============================================================

import { DATA_SOURCE } from "@/lib/config";
import type { DataProvider } from "@/lib/data/provider";
import { mockProvider } from "@/lib/data/mock/provider";
import { accountingProvider } from "@/lib/data/accounting/provider";
import {
  buildKpis,
  topProducts,
  stockAlerts,
  revenueVsExpense,
  totalExpenses,
} from "@/lib/data/derive";
import type { DashboardData } from "@/lib/types";

/** المزوّد الفعّال (Mock افتراضياً، أو النظام المحاسبي). */
const provider: DataProvider = DATA_SOURCE === "accounting" ? accountingProvider : mockProvider;

export const dataSourceName = provider.name;

// ------------------------- جلب الكيانات الخام -------------------------
export const getProducts = () => provider.getProducts();
export const getRecipes = () => provider.getRecipes();
export const getInventory = () => provider.getInventory();
export const getInvoices = () => provider.getInvoices();
export const getSalesSeries = () => provider.getSalesSeries();
export const getPurchases = () => provider.getPurchases();
export const getExpenses = () => provider.getExpenses();
export const getWaste = () => provider.getWaste();
export const getStaff = () => provider.getStaff();
export const getShopInfo = () => provider.getShopInfo();
export const getUsers = () => provider.getUsers();

/** الموردون مشتقّون من المشتريات. */
export async function getSuppliers() {
  const purchases = await provider.getPurchases();
  const { suppliersFrom } = await import("@/lib/data/derive");
  return suppliersFrom(purchases);
}

// ------------------------- حزمة اللوحة التنفيذية -------------------------
export async function getDashboard(): Promise<DashboardData> {
  const [series, invoices, inventory, expenses] = await Promise.all([
    provider.getSalesSeries(),
    provider.getInvoices(),
    provider.getInventory(),
    provider.getExpenses(),
  ]);

  const monthlyExpenses = totalExpenses(expenses);
  const last7 = series.slice(-7);
  const today = series[series.length - 1];

  return {
    kpis: buildKpis(series, monthlyExpenses),
    last7,
    topProducts: topProducts(invoices),
    stockAlerts: stockAlerts(inventory),
    revenueVsExpense: revenueVsExpense(last7, monthlyExpenses),
    today,
  };
}

// ------------------------- إعادة تصدير الاشتقاقات النقية -------------------------
// (دوال متزامنة تعمل على البيانات المجلوبة — تُستعمل في طبقة العرض)
export {
  profitabilityOf,
  recipeTotal,
  daysLeft,
  stockValue,
  stockStatus,
  stockAlerts,
  topProducts,
  suppliersFrom,
  totalExpenses,
  fixedExpenses,
  variableExpenses,
  biggestExpense,
  wasteTotal,
  buildKpis,
  revenueVsExpense,
  monthRevenue,
  monthCost,
} from "@/lib/data/derive";

// ------------------------- إعادة تصدير الأنواع -------------------------
export type * from "@/lib/types";
