import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "JO STUDIO | Premium & Affordable Men's Fashion",
  description:
    "Shop trending men's clothing at JO STUDIO: T-Shirts, Shirts, Jeans, Cargo Trousers, Hoodies, and Jackets at unbeatable direct-to-consumer prices. Instant WhatsApp checkout.",
  keywords: [
    "jo studio",
    "men's fashion",
    "men's t-shirts",
    "casual shirts for men",
    "men's jeans online india",
    "oversized tees",
    "cargo pants",
    "whatsapp shopping",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        <Providers>
          <Suspense fallback={<div className="h-16 bg-white border-b" />}>
            <Header />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <BottomNavigation />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
