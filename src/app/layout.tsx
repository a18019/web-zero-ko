import type { Metadata } from "next";
import { Noto_Sans_JP, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
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
    <html lang="ja">
      <body className={cn(roboto.variable, notoSansJp.variable, "antialiased")}>
        {children}
      </body>
    </html>
  );
}
