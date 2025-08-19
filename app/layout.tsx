import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "OneStupidQuiz",
  description: "A simple quiz app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
          <Link href="/" style={{ marginRight: "15px" }}>Home</Link>
          <Link href="/about" style={{ marginRight: "15px" }}>About</Link>
      <Link href="/quiz" style={{ marginRight: "15px" }}>Quiz</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <main style={{ padding: "20px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
