import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "OneStupidQuiz",
  description: "Daily quiz with weighted absurdity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#fff", color: "#111", margin: 0 }}>
        <header style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", borderBottom: "1px solid #e5e5e5" }}>
          <Link href="/" aria-label="Home" style={{ display: "inline-flex", alignItems: "center" }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, border: "2px solid #111", display: "grid", placeItems: "center" }}>◻︎</div>
          </Link>
          <div style={{ fontSize: 22, letterSpacing: .5 }}>OneStupidQuiz</div>
          <nav style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
            <Link href="/about">About</Link>
            <Link href="/signup">SignUp</Link>
          </nav>
        </header>
        <main style={{ minHeight: "calc(100dvh - 120px)" }}>{children}</main>
        <footer style={{ borderTop: "1px solid #e5e5e5", padding: "16px", fontSize: 12, display: "flex", gap: 12, alignItems: "center" }}>
          <span>© {new Date().getFullYear()} Sanjay Mahendrakumar Mukherjee. All rights reserved.</span>
          <Link href="/terms" style={{ marginLeft: "auto" }}>Terms</Link>
        </footer>
      </body>
    </html>
  );
}
