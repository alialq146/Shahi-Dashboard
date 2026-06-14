// =============================================================
//  إعدادات مصدر البيانات وبيانات الاعتماد
//  تُقرأ من متغيرات البيئة (.env). انظر .env.example.
// =============================================================

export type DataSource = "mock" | "accounting";

/** المصدر الفعّال: "mock" افتراضياً، أو "accounting" للربط الحقيقي. */
export const DATA_SOURCE: DataSource =
  (process.env.DATA_SOURCE as DataSource) === "accounting" ? "accounting" : "mock";

/** إعدادات الاتصال بالنظام المحاسبي (دفترة Daftra أو ما يماثله). */
export const accountingConfig = {
  /** عنوان الـ API الأساسي، مثال: https://api.daftra.com */
  baseUrl: process.env.ACCOUNTING_API_URL ?? "",
  /** مفتاح الـ API السرّي (يبقى على الخادم فقط — لا يُرسل للمتصفح). */
  apiKey: process.env.ACCOUNTING_API_KEY ?? "",
  /** معرّف الفرع/الموقع إن لزم. */
  branchId: process.env.ACCOUNTING_BRANCH_ID ?? "",
};

/** تأكيد توفّر الإعدادات قبل أي طلب حقيقي — يرمي خطأً واضحاً عند النقص. */
export function assertAccountingConfig() {
  const missing: string[] = [];
  if (!accountingConfig.baseUrl) missing.push("ACCOUNTING_API_URL");
  if (!accountingConfig.apiKey) missing.push("ACCOUNTING_API_KEY");
  if (missing.length) {
    throw new Error(
      `الربط مع النظام المحاسبي غير مكتمل — متغيرات البيئة الناقصة: ${missing.join(", ")}. ` +
        `راجع ملف .env.example.`
    );
  }
}
