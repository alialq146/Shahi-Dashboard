// =============================================================
//  عميل HTTP للنظام المحاسبي (دفترة Daftra أو ما يماثله)
//  طبقة رقيقة تتكفّل بـ: عنوان الـ API، ترويسات المصادقة،
//  معالجة الأخطاء. يُستخدم فقط على الخادم (Server) — لا يصل
//  مفتاح الـ API إلى المتصفح أبداً.
// =============================================================

// مهم: هذا الملف للخادم فقط. لا تستورده في مكوّن "use client".
// (يمكن تفعيل الحماية بحزمة "server-only" عبر: npm i server-only)
import { accountingConfig, assertAccountingConfig } from "@/lib/config";

/**
 * طلب GET من الـ API المحاسبي ويُرجِع JSON بنوع T.
 * @param path مسار نسبي مثل "/v2/invoices?limit=100"
 */
export async function apiGet<T>(path: string): Promise<T> {
  assertAccountingConfig();
  const url = `${accountingConfig.baseUrl.replace(/\/$/, "")}${path}`;

  const res = await fetch(url, {
    headers: {
      // ملاحظة: عدّل اسم الترويسة بحسب وثائق نظامك.
      // دفترة مثلاً تستخدم "APIKEY"؛ أنظمة أخرى تستخدم "Authorization: Bearer".
      APIKEY: accountingConfig.apiKey,
      Accept: "application/json",
    },
    // إعادة التحقّق كل 5 دقائق (عدّلها حسب الحاجة، أو استخدم "no-store").
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`فشل الطلب المحاسبي ${res.status} على ${path}: ${body.slice(0, 200)}`);
  }
  return (await res.json()) as T;
}
