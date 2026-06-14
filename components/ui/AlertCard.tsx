import { cn } from "@/lib/utils";
import { AlertTriangle, Info, ShieldAlert, type LucideIcon } from "lucide-react";

type Level = "info" | "warn" | "danger";

const map: Record<Level, { ring: string; bg: string; text: string; icon: LucideIcon }> = {
  info: { ring: "ring-caramel/30", bg: "bg-caramel/8", text: "text-caramel-dark", icon: Info },
  warn: { ring: "ring-warn/30", bg: "bg-warn/8", text: "text-warn", icon: AlertTriangle },
  danger: { ring: "ring-danger/30", bg: "bg-danger/8", text: "text-danger", icon: ShieldAlert },
};

export function AlertCard({
  level = "info",
  title,
  children,
  className,
}: {
  level?: Level;
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const c = map[level];
  const Icon = c.icon;
  return (
    <div className={cn("flex items-start gap-3 rounded-xl p-3.5 ring-1 ring-inset", c.bg, c.ring, className)}>
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", c.text)} />
      <div className="min-w-0">
        <p className={cn("text-sm font-bold", c.text)}>{title}</p>
        {children && <div className="mt-0.5 text-xs text-espresso-600">{children}</div>}
      </div>
    </div>
  );
}
