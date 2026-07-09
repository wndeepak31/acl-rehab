import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Athlete Recovery OS",
  description: "Professional ACL Return-to-Sport Rehabilitation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={outfit.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
