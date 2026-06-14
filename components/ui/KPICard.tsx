import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

export interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  delta?: number; // نسبة التغير %
  hint?: string;
  accent?: "caramel" | "olive" | "espresso" | "danger";
}

const accentMap = {
  caramel: "from-caramel/15 text-caramel-dark",
  olive: "from-olive/15 text-olive-dark",
  espresso: "from-espresso/12 text-espresso-700",
  danger: "from-danger/12 text-danger",
};

export function KPICard({ title, value, icon: Icon, delta, hint, accent = "caramel" }: KPICardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-beige-line bg-beige-card p-5 shadow-soft transition hover:shadow-card">
      {/* خط علوي بلون الهوية */}
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-caramel to-caramel-light opacity-80" />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted">{title}</p>
          <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink">{value}</p>
        </div>
        <div className={cn("rounded-xl bg-gradient-to-br to-transparent p-2.5", accentMap[accent])}>
          <Icon className="h-5 w-5" strokeWidth={2.2} />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {typeof delta === "number" && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold",
              positive ? "bg-olive/12 text-olive-dark" : "bg-danger/12 text-danger"
            )}
          >
            {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(delta)}%
          </span>
        )}
        {hint && <span className="text-xs text-muted">{hint}</span>}
      </div>
    </div>
  );
}
