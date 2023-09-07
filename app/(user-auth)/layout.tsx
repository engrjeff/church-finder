import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";
import type { Metadata } from "next";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Church Finder PH",
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          siteConfig.font.sans.className,
          "min-h-screen flex flex-col"
        )}
      >
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <Header />
          <main className='flex-1'>
            <div className="h-screen bg-[url('/assets/hero-img-1.jpg')] bg-center bg-no-repeat bg-cover relative">
              <section className='inset-0 w-full h-full bg-black/80'>
                <div className='container max-w-5xl h-full w-full flex flex-col items-center justify-center'>
                  {children}
                </div>
              </section>
            </div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
