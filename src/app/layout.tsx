import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SubNav from "@/components/SubNav";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { BIZ_UDPGothic, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bizUdpGothic = BIZ_UDPGothic({
  variable: "--font-biz-udp-gothic",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ゼロ高等学院",
  description:
    "ゼロ高等学院の学び、学校生活、イベント情報を紹介する公式サイト。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={cn(inter.variable, bizUdpGothic.variable)}>
      <body className="antialiased">
        <Header />
        <SubNav />
        {children}
        <Cta />
        <Footer />
      </body>
    </html>
  );
}
