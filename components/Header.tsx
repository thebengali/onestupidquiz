import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Left: Logo (green oval) */}
        <Link href="/" aria-label="OneStupidQuiz home" className="block">
          <Image
            src="/brand/OSQ_Logo.png"
            alt="OSQ Logo"
            width={60}
            height={60}
            priority
            style={{ width: 60, height: 60, objectFit: 'contain' }}
          />
        </Link>

        {/* Center: Site name wordmark */}
        <div className="flex justify-center">
          <Image
            src="/brand/OSQ_SiteNameBrand.png"
            alt="OneStupidQuiz"
            height={56}
            width={680}
            priority
            style={{ height: 56, width: 'auto' }}
          />
        </div>

        {/* Right: Nav (button-like) */}
        <nav className="flex items-center gap-4 justify-end">
          <Link href="/" className="inline-block rounded-lg border-2 px-4 py-2 font-semibold hover:bg-neutral-50">Home</Link>
          <Link href="/about" className="inline-block rounded-lg border-2 px-4 py-2 font-semibold hover:bg-neutral-50">About</Link>
        </nav>
      </div>
    </header>
  );
}
