'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/brand/logo-q-purple.png"
            alt="OSQ Logo"
            width={48}
            height={48}
            priority
          />
        </Link>
        <div className="flex justify-center">
          <Image
            src="/brand/wordmark-black.png"
            alt="OneStupidQuiz"
            height={40}
            width={520}
            style={{ height: '40px', width: 'auto' }}
            priority
          />
        </div>
        <nav className="flex items-center gap-6 text-lg font-semibold">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
