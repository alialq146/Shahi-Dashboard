// =============================================================
//  شاهي الجبل — أنواع نطاق العمل (Domain Types)
//  مصدر الحقيقة الوحيد للأنواع. أي مزوّد بيانات (Mock أو نظام
//  محاسبي حقيقي) يجب أن يُرجِع نفس هذه الأشكال بالضبط.
// =============================================================

export type Profitability = "ممتاز" | "جيد" | "منخفض";
export type StockStatus = "ممتاز" | "منخفض" | "خطر";
export type PaymentMethod = "كاش" | "شبكة" | "تحويل" | "دفع إلكتروني";
export type Shift = "صباحي" | "مسائي";

// ------------------------- المنتجات -------------------------
/** الحقول الأساسية للمنتج كما تأتي من المصدر (قبل الاشتقاق). */
export interface ProductBase {
  id: string;
  name: string;
  sellPrice: number;
  ingredientsCost: number;
  packagingCost: number;
}
/** المنتج بعد اشتقاق التكلفة والربح والهامش — أرقام عادية (JSON-safe). */
export interface Product extends ProductBase {
  totalCost: number;
  profit: number;
  margin: number;
}

// ------------------------- الوصفات -------------------------
export interface RecipeItem {
  material: string;
  qty: number;
  unit: string;
  unitCost: number; // تكلفة الوحدة الواحدة من المادة
}
export interface Recipe {
  productId: string;
  productName: string;
  items: RecipeItem[];
}

// ------------------------- المخزون -------------------------
export interface InventoryItem {
  id: string;
  name: string;
  qty: number;
  unit: string;
  min: number;
  dailyUse: number;
  unitCost: number;
}

// ------------------------- المبيعات -------------------------
export interface DailySales {
  date: string; // ISO (YYYY-MM-DD)
  label: string; // مختصر عربي
  revenue: number;
  invoices: number;
  cost: number;
}

export interface Invoice {
  id: string;
  datetime: string; // ISO
  product: string;
  qty: number;
  amount: number;
  payment: PaymentMethod;
  shift: Shift;
  employee: string;
}

export interface TopProduct {
  name: string;
  qty: number;
  revenue: number;
}

// ------------------------- الموردين والمشتريات -------------------------
export interface Purchase {
  id: string;
  supplier: string;
  material: string;
  qty: number;
  unit: string;
  price: number; // سعر الشراء الإجمالي
  date: string;
  payment: PaymentMethod;
  status: "مدفوعة" | "آجلة" | "مدفوعة جزئياً";
  prevUnitPrice: number;
  currUnitPrice: number;
}

export interface Supplier {
  name: string;
  category: string;
  totalPurchases: number;
  outstanding: number;
}

// ------------------------- المصروفات -------------------------
export interface Expense {
  id: string;
  name: string;
  type: "ثابتة" | "متغيرة";
  amount: number;
  category: string;
}

// ------------------------- الهدر والتالف -------------------------
export interface Waste {
  id: string;
  item: string;
  qty: number;
  unit: string;
  reason: "تحضير خاطئ" | "انسكاب" | "انتهاء صلاحية" | "مرتجع عميل" | "خطأ في الطلب";
  cost: number;
  date: string;
  employee: string;
  shift: Shift;
}

// ------------------------- الموظفين -------------------------
export interface Staff {
  id: string;
  name: string;
  shift: Shift;
  invoices: number;
  sales: number;
  wasteCases: number;
  rating: number; // من 5
}

// ------------------------- المستخدمون والإعدادات -------------------------
export interface AppUser {
  name: string;
  role: string;
  perms: string;
  status: "نشط" | "موقوف";
}

export interface ShopInfo {
  name: string;
  tagline: string;
  branch: string;
  phone: string;
  vat: string;
  currency: string;
}

// ------------------------- مؤشرات اللوحة التنفيذية -------------------------
export interface Kpis {
  todayRevenue: number;
  todayInvoices: number;
  avgInvoice: number;
  netProfitToday: number;
  marginToday: number;
  monthlyExpenses: number;
  monthRevenue: number;
  monthCost: number;
  revenueVsYesterday: number;
}

export interface StockAlert {
  it: InventoryItem;
  status: StockStatus;
  days: number;
}

export interface RevenueVsExpensePoint {
  label: string;
  الإيرادات: number;
  المصروفات: number;
}

/** الحزمة المجمّعة التي تحتاجها اللوحة التنفيذية في طلب واحد. */
export interface DashboardData {
  kpis: Kpis;
  last7: DailySales[];
  topProducts: TopProduct[];
  stockAlerts: StockAlert[];
  revenueVsExpense: RevenueVsExpensePoint[];
  today: DailySales;
}
