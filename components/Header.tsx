import Link from "next/link";
import { Bangers } from "next/font/google";

const titleFont = Bangers({ subsets: ["latin"], weight: "400" });

export default function Header() {
  return (
    <header className="site-header">
      <div className="container row">
        <div className="site-logo">Q</div>
        <div className={`site-title ${titleFont.className}`}>
          ONESTUPIDQUIZ
        </div>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
