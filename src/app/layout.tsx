import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Headbar from "./components/ui/Headbar";

const montserrat = Montserrat({ subsets: ["latin"] });

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
      <body className={montserrat.className}>
        <Headbar />

        <Navbar />

        <main className="lg:px-10 px-4">{children}</main>
      </body>
    </html>
  );
}
