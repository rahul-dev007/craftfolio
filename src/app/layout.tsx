// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar"; // <-- Navbar ইম্পোর্ট করুন
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Craftfolio - Your Name",
  description: "A professional portfolio built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar /> {/* <-- Navbar কম্পোনেন্ট এখানে যুক্ত করুন */}
        <main>{children}</main>
      </body>
    </html>
  );
}