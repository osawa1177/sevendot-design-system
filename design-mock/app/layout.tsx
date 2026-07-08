import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sevendot design-mock",
  description: "デザイン案プレイグラウンド（実装都合は持ち込まない）",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
