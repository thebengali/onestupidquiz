import './globals.css';

export const metadata = {
  title: 'One Stupid Quiz',
  description: 'One stupid quiz a day. Fun, respectful, minimal.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{borderBottom: '1px solid #e5e5e5'}}>
          <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
            <a href="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>onestupidquiz.com</a>
            <nav style={{fontSize:14}}>
              <a href="/today">Today</a>{' '}|{' '}
              <a href="/leaderboard">Leaderboard</a>{' '}|{' '}
              <a href="/about">About</a>{' '}|{' '}
              <a href="/admin">Admin</a>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer>
          <div className="container">
            <div>© Sanjay Mahendrakumar Mukherjee</div>
            <div className="small">Minimal black/white/grey. Respectful humor. Absurd scoring.</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
