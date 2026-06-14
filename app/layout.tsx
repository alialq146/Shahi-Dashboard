import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";

export const metadata: Metadata = {
  title: "شاهي الجبل — لوحة الإدارة",
  description: "لوحة داخلية لإدارة ومتابعة محل شاهي الجبل التشغيلية والتحليلية",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`:root{--font-body:'Tajawal',system-ui,sans-serif;--font-display:'Cairo',system-ui,sans-serif;}`}</style>
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
