"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={active ? "underline font-semibold" : ""}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded">
          Q
        </div>
        <span className="font-bold text-xl">onestupidquiz</span>
      </div>
      <nav className="flex space-x-4 items-baseline">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/signup">Sign Up</NavLink>
        <span className="text-sm text-gray-500">Visitors: 123</span>
      </nav>
    </header>
  );
}
