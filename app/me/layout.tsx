import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";
import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import DashboardSideBar from "@/components/dashboard-sidebar";

export const metadata: Metadata = {
  title: "Your Dashboard - Church Finder PH",
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(siteConfig.font.sans.className, "min-h-screen flex")}>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <aside className='fixed inset-y-0 w-[240px] border-r'>
            <DashboardSideBar />
          </aside>
          <div className='pl-[240px] flex-1 flex flex-col'>
            <header className='h-20 w-full border-b'>Header</header>
            <main className='p-6 flex-1 flex flex-col'>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
