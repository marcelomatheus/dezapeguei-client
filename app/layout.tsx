import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/src/app/providers/app-providers";
import { AppFooter } from "@/src/components/app-footer";
import { AppHeader } from "@/src/components/app-header";
import { AppBottomNav } from "@/src/components/app-bottom-nav";
import { NotificationBell } from "@/src/features/notifications/components/notification-bell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dezapeguei",
  description: "Marketplace web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-60 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-zinc-900 focus:shadow"
          >
            Pular para o conteudo principal
          </a>
          <div className="fixed right-4 top-4 z-50 hidden xl:block">
            <NotificationBell />
          </div>
          <div className="flex min-h-screen flex-col bg-zinc-100/60">
            <AppHeader />
            <div id="main-content" tabIndex={-1} className="flex-1 pb-16 md:pb-0">
              {children}
            </div>
            <AppFooter />
          </div>
          <AppBottomNav />
        </AppProviders>
      </body>
    </html>
  );
}
