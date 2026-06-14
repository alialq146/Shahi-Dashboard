// =============================================================
//  شاهي الجبل — بيانات تجريبية خام (Mock Seed)
//  هذه هي البيانات «كما لو» كانت قادمة من نظام محاسبي: كيانات
//  خام فقط، بلا أي اشتقاق (الاشتقاق في lib/data/derive.ts).
// =============================================================

import type {
  ProductBase,
  Recipe,
  InventoryItem,
  DailySales,
  Invoice,
  Purchase,
  Expense,
  Waste,
  Staff,
  AppUser,
  ShopInfo,
  PaymentMethod,
  Shift,
} from "@/lib/types";

// ------------------------- المنتجات -------------------------
export const productsBase: ProductBase[] = [
  { id: "P-01", name: "شاهي كرك صغير", sellPrice: 3, ingredientsCost: 0.78, packagingCost: 0.35 },
  { id: "P-02", name: "شاهي كرك كبير", sellPrice: 5, ingredientsCost: 1.35, packagingCost: 0.45 },
  { id: "P-03", name: "شاهي أحمر", sellPrice: 2, ingredientsCost: 0.32, packagingCost: 0.3 },
  { id: "P-04", name: "شاهي نعناع", sellPrice: 2.5, ingredientsCost: 0.46, packagingCost: 0.3 },
  { id: "P-05", name: "شاهي حليب", sellPrice: 3, ingredientsCost: 0.62, packagingCost: 0.35 },
  { id: "P-06", name: "زنجبيل", sellPrice: 3.5, ingredientsCost: 0.7, packagingCost: 0.35 },
  { id: "P-07", name: "قهوة عربية", sellPrice: 4, ingredientsCost: 0.95, packagingCost: 0.4 },
  { id: "P-08", name: "ماء", sellPrice: 1, ingredientsCost: 0.45, packagingCost: 0.0 },
];

// ------------------------- الوصفات -------------------------
export const recipes: Recipe[] = [
  {
    productId: "P-01",
    productName: "شاهي كرك صغير",
    items: [
      { material: "شاي", qty: 5, unit: "جم", unitCost: 0.045 },
      { material: "حليب", qty: 120, unit: "مل", unitCost: 0.0035 },
      { material: "سكر", qty: 10, unit: "جم", unitCost: 0.004 },
      { material: "بهارات كرك", qty: 2, unit: "جم", unitCost: 0.03 },
      { material: "كوب ورقي صغير", qty: 1, unit: "حبة", unitCost: 0.22 },
      { material: "غطاء", qty: 1, unit: "حبة", unitCost: 0.13 },
    ],
  },
  {
    productId: "P-02",
    productName: "شاهي كرك كبير",
    items: [
      { material: "شاي", qty: 8, unit: "جم", unitCost: 0.045 },
      { material: "حليب", qty: 220, unit: "مل", unitCost: 0.0035 },
      { material: "سكر", qty: 16, unit: "جم", unitCost: 0.004 },
      { material: "بهارات كرك", qty: 3, unit: "جم", unitCost: 0.03 },
      { material: "كوب ورقي كبير", qty: 1, unit: "حبة", unitCost: 0.3 },
      { material: "غطاء", qty: 1, unit: "حبة", unitCost: 0.15 },
    ],
  },
  {
    productId: "P-03",
    productName: "شاهي أحمر",
    items: [
      { material: "شاي", qty: 6, unit: "جم", unitCost: 0.045 },
      { material: "سكر", qty: 12, unit: "جم", unitCost: 0.004 },
      { material: "كوب ورقي صغير", qty: 1, unit: "حبة", unitCost: 0.22 },
      { material: "غطاء", qty: 1, unit: "حبة", unitCost: 0.13 },
    ],
  },
  {
    productId: "P-04",
    productName: "شاهي نعناع",
    items: [
      { material: "شاي", qty: 6, unit: "جم", unitCost: 0.045 },
      { material: "نعناع", qty: 4, unit: "جم", unitCost: 0.025 },
      { material: "سكر", qty: 12, unit: "جم", unitCost: 0.004 },
      { material: "كوب ورقي صغير", qty: 1, unit: "حبة", unitCost: 0.22 },
      { material: "غطاء", qty: 1, unit: "حبة", unitCost: 0.13 },
    ],
  },
  {
    productId: "P-05",
    productName: "شاهي حليب",
    items: [
      { material: "شاي", qty: 5, unit: "جم", unitCost: 0.045 },
      { material: "حليب", qty: 110, unit: "مل", unitCost: 0.0035 },
      { material: "سكر", qty: 10, unit: "جم", unitCost: 0.004 },
      { material: "كوب ورقي صغير", qty: 1, unit: "حبة", unitCost: 0.22 },
      { material: "غطاء", qty: 1, unit: "حبة", unitCost: 0.13 },
    ],
  },
  {
    productId: "P-06",
    productName: "زنجبيل",
    items: [
      { material: "زنجبيل", qty: 6, unit: "جم", unitCost: 0.06 },
      { material: "سكر", qty: 12, unit: "جم", unitCost: 0.004 },
      { material: "كوب ورقي صغير", qty: 1, unit: "حبة", unitCost: 0.22 },
      { material: "غطاء", qty: 1, unit: "حبة", unitCost: 0.13 },
    ],
  },
  {
    productId: "P-07",
    productName: "قهوة عربية",
    items: [
      { material: "قهوة عربية", qty: 9, unit: "جم", unitCost: 0.08 },
      { material: "كوب ورقي صغير", qty: 1, unit: "حبة", unitCost: 0.22 },
      { material: "غطاء", qty: 1, unit: "حبة", unitCost: 0.13 },
    ],
  },
  {
    productId: "P-08",
    productName: "ماء",
    items: [{ material: "عبوة ماء 330مل", qty: 1, unit: "حبة", unitCost: 0.45 }],
  },
];

// ------------------------- المخزون -------------------------
export const inventory: InventoryItem[] = [
  { id: "M-01", name: "شاي", qty: 4200, unit: "جم", min: 3000, dailyUse: 480, unitCost: 0.045 },
  { id: "M-02", name: "حليب", qty: 9000, unit: "مل", min: 12000, dailyUse: 5200, unitCost: 0.0035 },
  { id: "M-03", name: "سكر", qty: 6800, unit: "جم", min: 4000, dailyUse: 620, unitCost: 0.004 },
  { id: "M-04", name: "بهارات كرك", qty: 320, unit: "جم", min: 500, dailyUse: 95, unitCost: 0.03 },
  { id: "M-05", name: "نعناع", qty: 180, unit: "جم", min: 150, dailyUse: 40, unitCost: 0.025 },
  { id: "M-06", name: "زنجبيل", qty: 95, unit: "جم", min: 200, dailyUse: 55, unitCost: 0.06 },
  { id: "M-07", name: "أكواب صغيرة", qty: 1450, unit: "حبة", min: 800, dailyUse: 260, unitCost: 0.22 },
  { id: "M-08", name: "أكواب كبيرة", qty: 380, unit: "حبة", min: 600, dailyUse: 140, unitCost: 0.3 },
  { id: "M-09", name: "أغطية", qty: 2100, unit: "حبة", min: 1000, dailyUse: 400, unitCost: 0.14 },
  { id: "M-10", name: "ماء (عبوات)", qty: 240, unit: "حبة", min: 150, dailyUse: 60, unitCost: 0.45 },
  { id: "M-11", name: "قهوة عربية", qty: 720, unit: "جم", min: 500, dailyUse: 110, unitCost: 0.08 },
];

// ------------------------- توليد المبيعات (شبه عشوائي ثابت) -------------------------
const productNames = productsBase.map((p) => p.name);
const productPrices = new Map(productsBase.map((p) => [p.name, p.sellPrice] as const));
const employees = ["خالد", "ماجد", "سعيد", "فهد"];
const payments: PaymentMethod[] = ["كاش", "شبكة", "دفع إلكتروني", "تحويل"];

function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
const rnd = seeded(73);

function arDayLabel(d: Date): string {
  return new Intl.DateTimeFormat("ar-SA", { day: "numeric", month: "short" }).format(d);
}

export const salesDaily: DailySales[] = Array.from({ length: 30 }).map((_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  const weekend = d.getDay() === 5 || d.getDay() === 6; // جمعة/سبت
  const base = 1100 + (weekend ? 650 : 0);
  const revenue = Math.round(base + rnd() * 700);
  const invoices = Math.round(revenue / (9 + rnd() * 4));
  const cost = Math.round(revenue * (0.34 + rnd() * 0.06));
  return { date: d.toISOString().slice(0, 10), label: arDayLabel(d), revenue, invoices, cost };
});

export const invoices: Invoice[] = Array.from({ length: 64 })
  .map((_, i) => {
    const dayOffset = Math.floor(rnd() * 7);
    const d = new Date();
    d.setDate(d.getDate() - dayOffset);
    const hour = 6 + Math.floor(rnd() * 16);
    d.setHours(hour, Math.floor(rnd() * 60));
    const name = productNames[Math.floor(rnd() * productNames.length)];
    const qty = 1 + Math.floor(rnd() * 4);
    return {
      id: `INV-${(2480 - i).toString()}`,
      datetime: d.toISOString(),
      product: name,
      qty,
      amount: +((productPrices.get(name) ?? 0) * qty).toFixed(2),
      payment: payments[Math.floor(rnd() * payments.length)],
      shift: (hour < 15 ? "صباحي" : "مسائي") as Shift,
      employee: employees[Math.floor(rnd() * employees.length)],
    };
  })
  .sort((a, b) => +new Date(b.datetime) - +new Date(a.datetime));

// ------------------------- المشتريات -------------------------
export const purchases: Purchase[] = [
  { id: "PO-1042", supplier: "مؤسسة الوادي للمواد الغذائية", material: "شاي", qty: 25, unit: "كجم", price: 1050, date: "2026-06-08", payment: "تحويل", status: "مدفوعة", prevUnitPrice: 40, currUnitPrice: 42 },
  { id: "PO-1041", supplier: "ألبان نجد", material: "حليب", qty: 200, unit: "لتر", price: 660, date: "2026-06-07", payment: "شبكة", status: "مدفوعة", prevUnitPrice: 3.4, currUnitPrice: 3.3 },
  { id: "PO-1040", supplier: "بهارات الجزيرة", material: "بهارات كرك", qty: 8, unit: "كجم", price: 256, date: "2026-06-05", payment: "كاش", status: "مدفوعة", prevUnitPrice: 28, currUnitPrice: 32 },
  { id: "PO-1039", supplier: "مصنع الأكواب الحديثة", material: "أكواب صغيرة", qty: 5000, unit: "حبة", price: 1050, date: "2026-06-04", payment: "تحويل", status: "آجلة", prevUnitPrice: 0.2, currUnitPrice: 0.21 },
  { id: "PO-1038", supplier: "مصنع الأكواب الحديثة", material: "أكواب كبيرة", qty: 3000, unit: "حبة", price: 870, date: "2026-06-04", payment: "تحويل", status: "آجلة", prevUnitPrice: 0.28, currUnitPrice: 0.29 },
  { id: "PO-1037", supplier: "مؤسسة الوادي للمواد الغذائية", material: "سكر", qty: 50, unit: "كجم", price: 195, date: "2026-06-02", payment: "كاش", status: "مدفوعة", prevUnitPrice: 4.2, currUnitPrice: 3.9 },
  { id: "PO-1036", supplier: "بهارات الجزيرة", material: "زنجبيل", qty: 4, unit: "كجم", price: 248, date: "2026-06-01", payment: "كاش", status: "مدفوعة جزئياً", prevUnitPrice: 58, currUnitPrice: 62 },
  { id: "PO-1035", supplier: "بن الحرمين", material: "قهوة عربية", qty: 10, unit: "كجم", price: 820, date: "2026-05-29", payment: "تحويل", status: "مدفوعة", prevUnitPrice: 78, currUnitPrice: 82 },
];

// ------------------------- المصروفات -------------------------
export const expenses: Expense[] = [
  { id: "E-01", name: "إيجار المحل", type: "ثابتة", amount: 6000, category: "إيجار" },
  { id: "E-02", name: "رواتب الموظفين", type: "ثابتة", amount: 9500, category: "رواتب" },
  { id: "E-03", name: "اشتراك إنترنت", type: "ثابتة", amount: 350, category: "إنترنت" },
  { id: "E-04", name: "كهرباء", type: "متغيرة", amount: 1850, category: "كهرباء" },
  { id: "E-05", name: "ماء", type: "متغيرة", amount: 420, category: "ماء" },
  { id: "E-06", name: "صيانة ومعدات", type: "متغيرة", amount: 680, category: "صيانة" },
  { id: "E-07", name: "مواد تنظيف", type: "متغيرة", amount: 310, category: "تنظيف" },
  { id: "E-08", name: "عمولات الدفع الإلكتروني", type: "متغيرة", amount: 540, category: "عمولات" },
  { id: "E-09", name: "توصيل الطلبات", type: "متغيرة", amount: 760, category: "توصيل" },
  { id: "E-10", name: "تسويق وإعلانات", type: "متغيرة", amount: 1200, category: "تسويق" },
];

// ------------------------- الهدر والتالف -------------------------
export const waste: Waste[] = [
  { id: "W-21", item: "شاهي كرك كبير", qty: 3, unit: "كوب", reason: "تحضير خاطئ", cost: 16.2, date: "2026-06-12", employee: "ماجد", shift: "مسائي" },
  { id: "W-20", item: "حليب", qty: 800, unit: "مل", reason: "انسكاب", cost: 2.8, date: "2026-06-12", employee: "سعيد", shift: "صباحي" },
  { id: "W-19", item: "شاهي نعناع", qty: 2, unit: "كوب", reason: "مرتجع عميل", cost: 5.5, date: "2026-06-11", employee: "خالد", shift: "صباحي" },
  { id: "W-18", item: "قهوة عربية", qty: 1, unit: "كوب", reason: "خطأ في الطلب", cost: 1.35, date: "2026-06-11", employee: "فهد", shift: "مسائي" },
  { id: "W-17", item: "نعناع", qty: 60, unit: "جم", reason: "انتهاء صلاحية", cost: 1.5, date: "2026-06-10", employee: "ماجد", shift: "صباحي" },
  { id: "W-16", item: "شاهي كرك صغير", qty: 4, unit: "كوب", reason: "انسكاب", cost: 4.5, date: "2026-06-09", employee: "سعيد", shift: "مسائي" },
  { id: "W-15", item: "أكواب صغيرة", qty: 18, unit: "حبة", reason: "تحضير خاطئ", cost: 3.96, date: "2026-06-08", employee: "خالد", shift: "مسائي" },
];

// ------------------------- الموظفين -------------------------
export const staff: Staff[] = [
  { id: "S-01", name: "خالد العمري", shift: "صباحي", invoices: 312, sales: 4180, wasteCases: 2, rating: 4.7 },
  { id: "S-02", name: "ماجد الحربي", shift: "مسائي", invoices: 358, sales: 4920, wasteCases: 4, rating: 4.4 },
  { id: "S-03", name: "سعيد الغامدي", shift: "صباحي", invoices: 268, sales: 3510, wasteCases: 3, rating: 4.5 },
  { id: "S-04", name: "فهد القحطاني", shift: "مسائي", invoices: 291, sales: 3870, wasteCases: 1, rating: 4.8 },
];

// ------------------------- المستخدمون -------------------------
export const users: AppUser[] = [
  { name: "المالك", role: "مدير تنفيذي", perms: "كل الصلاحيات", status: "نشط" },
  { name: "ماجد الحربي", role: "مشرف وردية", perms: "المبيعات + المخزون", status: "نشط" },
  { name: "خالد العمري", role: "كاشير", perms: "المبيعات فقط", status: "نشط" },
  { name: "سعيد الغامدي", role: "كاشير", perms: "المبيعات فقط", status: "موقوف" },
];

// ------------------------- بيانات المحل -------------------------
export const shopInfo: ShopInfo = {
  name: "شاهي الجبل",
  tagline: "لوحة الإدارة والمتابعة التشغيلية",
  branch: "الفرع الرئيسي — جدة",
  phone: "0500000000",
  vat: "3000000000000003",
  currency: "ر.س",
};
