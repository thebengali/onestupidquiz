import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ borderBottom: '1px solid #e5e5e5' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '16px',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Link href="/" aria-label="OneStupidQuiz home" style={{ display: 'block', lineHeight: 0 }}>
          <Image
            src="/brand/OSQ_Logo.png"
            alt="OSQ Logo"
            width={60}
            height={60}
            priority
            style={{ width: 60, height: 60, objectFit: 'contain' }}
          />
        </Link>

        <div style={{ display: 'flex', justifyContent: 'center', lineHeight: 0 }}>
          <Image
            src="/brand/OSQ_SiteNameBrand.png"
            alt="OneStupidQuiz"
            height={168}
            width={2000}
            priority
            style={{ height: 168, width: 'auto' }}
          />
        </div>

        <nav style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={btnStyle}>Home</Link>
          <Link href="/about" style={btnStyle}>About</Link>
        </nav>
      </div>
    </header>
  );
}

const btnStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '8px 14px',
  border: '2px solid #222',
  borderRadius: 10,
  fontWeight: 700,
  color: '#111',
  textDecoration: 'none',
};
