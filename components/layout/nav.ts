import {
  LayoutDashboard,
  Receipt,
  Coins,
  BookOpen,
  Boxes,
  Truck,
  Wallet,
  Trash2,
  Users,
  FileBarChart,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  group: string;
}

export const navItems: NavItem[] = [
  { href: "/", label: "اللوحة التنفيذية", icon: LayoutDashboard, group: "نظرة عامة" },
  { href: "/sales", label: "المبيعات", icon: Receipt, group: "العمليات" },
  { href: "/products", label: "تكلفة المنتجات", icon: Coins, group: "العمليات" },
  { href: "/recipes", label: "الوصفات", icon: BookOpen, group: "العمليات" },
  { href: "/inventory", label: "المخزون", icon: Boxes, group: "العمليات" },
  { href: "/purchases", label: "المشتريات والموردين", icon: Truck, group: "المالية" },
  { href: "/expenses", label: "المصروفات", icon: Wallet, group: "المالية" },
  { href: "/waste", label: "الهدر والتالف", icon: Trash2, group: "المالية" },
  { href: "/staff", label: "أداء الموظفين", icon: Users, group: "الإدارة" },
  { href: "/reports", label: "التقارير", icon: FileBarChart, group: "الإدارة" },
  { href: "/settings", label: "الإعدادات", icon: Settings, group: "الإدارة" },
];
