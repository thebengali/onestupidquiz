'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

/**
 * Header layout per mockup:
 * - Left: fixed logo inside green oval image (OSQ_Logo.png), links to home
 * - Center: site name wordmark (OSQ_SiteNameBrand.png) centered
 * - Right: Home / About nav
 * NOTE: Do not change anything else.
 */
export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Left: Logo (green oval) */}
        <Link href="/" className="block" aria-label="OneStupidQuiz home">
          <Image
            src="/brand/OSQ_Logo.png"
            alt="OSQ Logo"
            width={56}
            height={56}
            priority
            style={{ width: 56, height: 56, objectFit: 'contain' }}
          />
        </Link>

        {/* Center: Wordmark */}
        <div className="flex justify-center">
          <Image
            src="/brand/OSQ_SiteNameBrand.png"
            alt="OneStupidQuiz"
            height={56}
            width={560}
            priority
            style={{ height: 56, width: 'auto' }}
          />
        </div>

        {/* Right: Nav (unchanged) */}
        <nav className="flex items-center gap-6 text-lg font-semibold">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}
