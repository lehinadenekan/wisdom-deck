import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import ConditionalNavbar from '@/components/layout/ConditionalNavbar';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Yoruba Word Master",
  description: "A Word Master game for Yoruba language learners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ConditionalNavbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}