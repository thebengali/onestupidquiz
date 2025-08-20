'use client';
import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/visitors', { method: 'POST', cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => setCount(typeof d?.value === 'number' ? d.value : null))
      .catch(() => setCount(null));
  }, []);

  if (count === null) return null;
  return <div className="small">Visitors: {count}</div>;
}
