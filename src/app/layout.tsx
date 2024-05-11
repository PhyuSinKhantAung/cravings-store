import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/Navbar";
import Headbar from "./components/ui/Headbar";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import StoreProvider from "./providers/StoreProvider";
// import AuthProvider from "./providers/AuthProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snacks Store",
  description: "Order your snacks!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <StoreProvider>
      <html lang="en">
        <body className={montserrat.className}>
          <Toaster position="top-center" reverseOrder={false} />

          <Headbar user={session?.user ?? null} />

          <Navbar user={session?.user ?? null} />

          <main className="lg:px-10 px-4">{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
