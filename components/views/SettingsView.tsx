"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable, type Column } from "@/components/ui/DataTable";
import type { ShopInfo, AppUser } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Store, Plug, Sheet, BellRing, Users } from "lucide-react";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      role="switch"
      aria-checked={on}
      className={cn(
        "relative h-6 w-11 rounded-full transition",
        on ? "bg-olive" : "bg-beige-line"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
          on ? "right-0.5" : "right-[22px]"
        )}
      />
    </button>
  );
}

interface Props {
  shopInfo: ShopInfo;
  users: AppUser[];
}

export default function SettingsView({ shopInfo, users }: Props) {
  const [alerts, setAlerts] = useState({ stock: true, waste: true, daily: false, profit: true });

  const userCols: Column<AppUser>[] = [
    { key: "name", header: "المستخدم", render: (r) => <span className="font-bold text-ink">{r.name}</span> },
    { key: "role", header: "الدور" },
    { key: "perms", header: "الصلاحيات", render: (r) => <span className="text-muted">{r.perms}</span> },
    { key: "status", header: "الحالة", align: "center", render: (r) => <StatusBadge label={r.status} tone={r.status === "نشط" ? "good" : "danger"} /> },
  ];

  return (
    <>
      <PageHeader title="الإعدادات" description="بيانات المحل، الربط الخارجي، التنبيهات، والمستخدمين" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* بيانات المحل */}
        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-caramel/12 text-caramel-dark"><Store className="h-4.5 w-4.5" /></span>
              <h3 className="font-display text-sm font-bold text-ink">بيانات المحل</h3>
            </div>
            <div className="space-y-3">
              {[
                ["اسم المحل", shopInfo.name],
                ["الفرع", shopInfo.branch],
                ["رقم الجوال", shopInfo.phone],
                ["الرقم الضريبي", shopInfo.vat],
                ["العملة", shopInfo.currency],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-beige-line/60 pb-2 last:border-0">
                  <span className="text-sm text-muted">{k}</span>
                  <span className="text-sm font-bold text-ink">{v}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* التنبيهات */}
        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-caramel/12 text-caramel-dark"><BellRing className="h-4.5 w-4.5" /></span>
              <h3 className="font-display text-sm font-bold text-ink">إعدادات التنبيهات</h3>
            </div>
            <div className="space-y-3.5">
              {[
                ["stock", "تنبيه عند انخفاض المخزون"],
                ["waste", "تنبيه عند تسجيل هدر مرتفع"],
                ["daily", "ملخص يومي للمبيعات"],
                ["profit", "تنبيه عند انخفاض هامش الربح"],
              ].map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-ink">{label}</span>
                  <Toggle
                    on={alerts[key as keyof typeof alerts]}
                    onClick={() => setAlerts((a) => ({ ...a, [key]: !a[key as keyof typeof alerts] }))}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ربط دفترة */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-olive/12 text-olive-dark"><Plug className="h-4.5 w-4.5" /></span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink">الربط مع دفترة (Daftra)</h3>
                  <p className="mt-0.5 text-xs text-muted">مزامنة الفواتير والمخزون تلقائياً</p>
                </div>
              </div>
              <StatusBadge label="قريباً" tone="info" />
            </div>
            <button disabled className="mt-4 w-full cursor-not-allowed rounded-xl border border-dashed border-beige-line py-2.5 text-sm font-bold text-muted">
              ربط الحساب (غير مفعّل في النسخة التجريبية)
            </button>
          </CardContent>
        </Card>

        {/* ربط Google Sheets */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-olive/12 text-olive-dark"><Sheet className="h-4.5 w-4.5" /></span>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink">الربط مع Google Sheets</h3>
                  <p className="mt-0.5 text-xs text-muted">تصدير البيانات إلى جداول مباشرة</p>
                </div>
              </div>
              <StatusBadge label="قريباً" tone="info" />
            </div>
            <button disabled className="mt-4 w-full cursor-not-allowed rounded-xl border border-dashed border-beige-line py-2.5 text-sm font-bold text-muted">
              ربط Google (غير مفعّل في النسخة التجريبية)
            </button>
          </CardContent>
        </Card>
      </div>

      {/* المستخدمون */}
      <div className="mt-5">
        <div className="mb-3 flex items-center gap-2.5">
          <Users className="h-5 w-5 text-caramel-dark" />
          <h3 className="font-display text-base font-bold text-ink">إدارة المستخدمين والصلاحيات</h3>
        </div>
        <DataTable columns={userCols} rows={users} rowKey={(r) => r.name} />
      </div>
    </>
  );
}
