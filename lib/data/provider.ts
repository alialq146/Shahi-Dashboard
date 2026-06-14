// =============================================================
//  عقد مزوّد البيانات (DataProvider Contract)
//  أي مصدر بيانات (Mock / دفترة / Google Sheets / قاعدة بيانات)
//  ينفّذ هذه الواجهة فقط. المزوّد يُرجِع الكيانات الخام، والاشتقاقات
//  (المؤشرات، الأكثر مبيعاً، تنبيهات المخزون...) تُحسب في طبقة derive.
//  جميع الدوال غير متزامنة (async) لتناسب جلب البيانات من شبكة حقيقية.
// =============================================================

import type {
  Product,
  Recipe,
  InventoryItem,
  Invoice,
  DailySales,
  Purchase,
  Expense,
  Waste,
  Staff,
  AppUser,
  ShopInfo,
} from "@/lib/types";

export interface DataProvider {
  /** معرّف المصدر — يظهر في الإعدادات/التشخيص. */
  readonly name: string;

  getProducts(): Promise<Product[]>;
  getRecipes(): Promise<Recipe[]>;
  getInventory(): Promise<InventoryItem[]>;
  getInvoices(): Promise<Invoice[]>;
  /** سلسلة المبيعات اليومية (آخر 30 يوماً افتراضياً). */
  getSalesSeries(): Promise<DailySales[]>;
  getPurchases(): Promise<Purchase[]>;
  getExpenses(): Promise<Expense[]>;
  getWaste(): Promise<Waste[]>;
  getStaff(): Promise<Staff[]>;
  getShopInfo(): Promise<ShopInfo>;
  getUsers(): Promise<AppUser[]>;
}
