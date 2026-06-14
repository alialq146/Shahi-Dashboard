"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "./nav";
import { Mountain, X } from "lucide-react";

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const groups = Array.from(new Set(navItems.map((n) => n.group)));

  return (
    <>
      {/* خلفية معتمة للجوال */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-espresso/40 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "topo-bg fixed inset-y-0 right-0 z-40 flex w-72 flex-col bg-espresso text-beige transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        {/* الشعار */}
        <div className="flex items-center justify-between gap-3 px-6 pb-5 pt-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-caramel to-caramel-dark text-espresso shadow-lg">
              <Mountain className="h-6 w-6" strokeWidth={2.4} />
            </div>
            <div>
              <p className="font-display text-lg font-extrabold leading-none text-beige">شاهي الجبل</p>
              <p className="mt-1 text-[11px] text-caramel-light">لوحة الإدارة الداخلية</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-beige/70 hover:bg-white/5 lg:hidden"
            aria-label="إغلاق القائمة"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-4 pb-6">
          {groups.map((group) => (
            <div key={group}>
              <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-beige/40">
                {group}
              </p>
              <ul className="space-y-1">
                {navItems
                  .filter((n) => n.group === group)
                  .map((item) => {
                    const active = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                            active
                              ? "bg-gradient-to-l from-caramel/25 to-caramel/5 text-beige ring-1 ring-inset ring-caramel/40"
                              : "text-beige/70 hover:bg-white/5 hover:text-beige"
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-[18px] w-[18px] transition",
                              active ? "text-caramel-light" : "text-beige/50 group-hover:text-caramel-light"
                            )}
                            strokeWidth={2.2}
                          />
                          {item.label}
                          {active && <span className="ms-auto h-1.5 w-1.5 rounded-full bg-caramel-light" />}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 px-6 py-4">
          <p className="text-[11px] text-beige/40">الإصدار التجريبي 1.0 — بيانات وهمية</p>
        </div>
      </aside>
    </>
  );
}
