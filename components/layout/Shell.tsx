"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { navItems } from "./nav";
import { Bell, Menu, Search, ChevronDown } from "lucide-react";

function PageTitle() {
  const pathname = usePathname();
  const current = navItems.find((n) => n.href === pathname);
  return <span className="font-display text-sm font-bold text-ink">{current?.label ?? "شاهي الجبل"}</span>;
}

export function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="lg:pr-72">
        {/* الهيدر */}
        <header className="sticky top-0 z-20 border-b border-beige-line bg-beige/85 backdrop-blur-md">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-lg text-espresso-700 hover:bg-espresso/5 lg:hidden"
              aria-label="فتح القائمة"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden items-center gap-2 text-muted sm:flex">
              <span className="font-display text-sm font-bold text-caramel-dark">شاهي الجبل</span>
              <span className="text-beige-line">/</span>
              <PageTitle />
            </div>

            {/* بحث */}
            <div className="relative ms-auto hidden md:block">
              <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                placeholder="ابحث في اللوحة..."
                className="w-64 rounded-xl border border-beige-line bg-beige-card py-2 pr-9 ps-3 text-sm text-ink placeholder:text-muted focus:border-caramel focus:outline-none"
              />
            </div>

            <button
              className="relative ms-auto grid h-10 w-10 place-items-center rounded-lg text-espresso-700 hover:bg-espresso/5 md:ms-0"
              aria-label="التنبيهات"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger ring-2 ring-beige" />
            </button>

            {/* المستخدم */}
            <button className="flex items-center gap-2 rounded-xl border border-beige-line bg-beige-card py-1.5 pe-2 ps-1.5 hover:border-caramel/40">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-olive to-olive-dark text-sm font-bold text-beige">
                م
              </span>
              <span className="hidden text-right sm:block">
                <span className="block text-xs font-bold text-ink">المالك</span>
                <span className="block text-[10px] text-muted">مدير تنفيذي</span>
              </span>
              <ChevronDown className="hidden h-4 w-4 text-muted sm:block" />
            </button>
          </div>
        </header>

        <main className="fade-up mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
