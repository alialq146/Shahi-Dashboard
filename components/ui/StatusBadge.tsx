import { cn } from "@/lib/utils";

type Tone = "good" | "warn" | "danger" | "neutral" | "info";

const toneMap: Record<Tone, string> = {
  good: "bg-olive/12 text-olive-dark ring-1 ring-inset ring-olive/25",
  warn: "bg-warn/12 text-warn ring-1 ring-inset ring-warn/30",
  danger: "bg-danger/12 text-danger ring-1 ring-inset ring-danger/25",
  neutral: "bg-espresso/8 text-espresso-600 ring-1 ring-inset ring-espresso/15",
  info: "bg-caramel/14 text-caramel-dark ring-1 ring-inset ring-caramel/30",
};

// خريطة الكلمات العربية إلى نبرة لونية
const labelTone: Record<string, Tone> = {
  ممتاز: "good",
  جيد: "info",
  منخفض: "warn",
  خطر: "danger",
  مدفوعة: "good",
  آجلة: "danger",
  "مدفوعة جزئياً": "warn",
  كاش: "neutral",
  شبكة: "info",
  "دفع إلكتروني": "info",
  تحويل: "neutral",
  صباحي: "info",
  مسائي: "neutral",
};

export function StatusBadge({
  label,
  tone,
  className,
}: {
  label: string;
  tone?: Tone;
  className?: string;
}) {
  const t = tone ?? labelTone[label] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
        toneMap[t],
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-olive": t === "good",
        "bg-warn": t === "warn",
        "bg-danger": t === "danger",
        "bg-caramel": t === "info",
        "bg-espresso-600": t === "neutral",
      })} />
      {label}
    </span>
  );
}
