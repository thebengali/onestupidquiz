import "./globals.css";
import Header from "./components/Header";
import Link from "next/link";

export const metadata = {
  title: "onestupidquiz",
  description: "A satirical take on quizzes and society",
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
        <main className="p-4">{children}</main>
        <footer className="p-4 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} onestupidquiz · <Link href="/terms">Terms</Link>
        </footer>
      </body>
    </html>
  );
}
