import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
import { fetchActiveCategories } from "@/lib/notion";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { BIZ_UDGothic, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bizUdGothic = BIZ_UDGothic({
  variable: "--font-biz-ud-gothic",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ゼロ高等学院",
  description:
    "ゼロ高等学院の学び、学校生活、イベント情報を紹介する公式サイト。",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await fetchActiveCategories();

  return (
    <html lang="ja" className={cn(inter.variable, bizUdGothic.variable)}>
      <body className="antialiased">
        <Header />
        <SubNav categories={categories} />
        <main>{children}</main>
        <Cta />
        <Footer />
      </body>
    </html>
  );
}
