import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Headbar from "./components/ui/Headbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snacks Store",
  description: "Order your snacks!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Headbar />

        <Navbar />

        <main className="px-10">{children}</main>
      </body>
    </html>
  );
}
