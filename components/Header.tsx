import Link from 'next/link'

export default function Header({ visitorCount }: { visitorCount: number }) {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full">Q</div>
        <span className="font-bold text-xl font-comic">onestupidquiz</span>
      </div>
      <nav className="flex space-x-6">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/signup" className="hover:underline">Sign Up</Link>
      </nav>
      <div className="text-sm">Visitors: {visitorCount}</div>
    </header>
  )
}