import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sar(value: number, fraction = 0): string {
  return (
    new Intl.NumberFormat("ar-SA", {
      minimumFractionDigits: fraction,
      maximumFractionDigits: fraction,
    }).format(value) + " ر.س"
  );
}

export function num(value: number, fraction = 0): string {
  return new Intl.NumberFormat("ar-SA", {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  }).format(value);
}

export function pct(value: number, fraction = 1): string {
  return (
    new Intl.NumberFormat("ar-SA", {
      minimumFractionDigits: fraction,
      maximumFractionDigits: fraction,
    }).format(value) + "%"
  );
}
