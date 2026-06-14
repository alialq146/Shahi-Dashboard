// =============================================================
//  مزوّد النظام المحاسبي (Accounting Provider) — هيكل جاهز للربط
//
//  هذا الملف هو نقطة الربط الفعلية مع نظام محاسبي حقيقي
//  (دفترة Daftra / قاعدة بيانات / Google Sheets ...).
//
//  كل دالة تتبع نفس النمط:
//    1) تجلب البيانات الخام من الـ API عبر apiGet
//    2) تُحوّل (map) استجابة النظام إلى أنواع نطاق العمل في lib/types.ts
//
//  حالياً كل دالة ترمي "غير منفّذة" لتجنّب إرجاع بيانات خاطئة
//  بصمت. استبدل جسم كل دالة بالخريطة الصحيحة بحسب وثائق نظامك،
//  وفعّل المصدر عبر DATA_SOURCE=accounting في ملف .env.
// =============================================================

import type { DataProvider } from "@/lib/data/provider";
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
// import { apiGet } from "@/lib/data/accounting/client";
// import { computeProduct } from "@/lib/data/derive";

function notImplemented(entity: string): never {
  throw new Error(
    `[accounting] جلب «${entity}» غير منفّذ بعد. ` +
      `أكمل التحويل في lib/data/accounting/provider.ts ثم فعّل DATA_SOURCE=accounting.`
  );
}

export const accountingProvider: DataProvider = {
  name: "accounting",

  async getProducts(): Promise<Product[]> {
    // مثال للتنفيذ:
    //   type Row = { id: string; name: string; price: number; cost: number; pkg: number };
    //   const rows = await apiGet<Row[]>("/v2/products");
    //   return rows.map((r) => computeProduct({
    //     id: r.id, name: r.name, sellPrice: r.price,
    //     ingredientsCost: r.cost, packagingCost: r.pkg,
    //   }));
    return notImplemented("المنتجات");
  },

  async getRecipes(): Promise<Recipe[]> {
    return notImplemented("الوصفات");
  },

  async getInventory(): Promise<InventoryItem[]> {
    return notImplemented("المخزون");
  },

  async getInvoices(): Promise<Invoice[]> {
    // مثال:
    //   const rows = await apiGet<DaftraInvoice[]>("/v2/invoices?limit=200");
    //   return rows.map(mapInvoice);
    return notImplemented("الفواتير");
  },

  async getSalesSeries(): Promise<DailySales[]> {
    return notImplemented("سلسلة المبيعات اليومية");
  },

  async getPurchases(): Promise<Purchase[]> {
    return notImplemented("المشتريات");
  },

  async getExpenses(): Promise<Expense[]> {
    return notImplemented("المصروفات");
  },

  async getWaste(): Promise<Waste[]> {
    return notImplemented("الهدر");
  },

  async getStaff(): Promise<Staff[]> {
    return notImplemented("الموظفين");
  },

  async getShopInfo(): Promise<ShopInfo> {
    return notImplemented("بيانات المحل");
  },

  async getUsers(): Promise<AppUser[]> {
    return notImplemented("المستخدمين");
  },
};
