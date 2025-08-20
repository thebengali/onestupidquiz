import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "One Stupid Quiz",
  description: "A fun quiz app built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
