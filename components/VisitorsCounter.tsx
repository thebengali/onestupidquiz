'use client';
import React, { useEffect, useState } from 'react';

type Cfg = {
  key?: string; // optional: custom counter key (default 'home')
  align?: 'left' | 'right' | 'center';
};

export default function VisitorsCounter({ key: counterKey = 'home', align = 'right' }: Cfg) {
  const [value, setValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    const run = async () => {
      try {
        const g = await fetch(`/api/visitors?key=${encodeURIComponent(counterKey)}`, { cache: 'no-store' });
        if (!g.ok) throw new Error(`GET ${g.status}`);
        const gjson = await g.json();
        if (live && typeof gjson.value === 'number') setValue(gjson.value);

        const p = await fetch(`/api/visitors?key=${encodeURIComponent(counterKey)}`, { method: 'POST' });
        if (!p.ok) throw new Error(`POST ${p.status}`);
        const pjson = await p.json();
        if (live && typeof pjson.value === 'number') setValue(pjson.value);
      } catch (e: any) {
        if (live) setError(e?.message ?? 'error');
      }
    };
    run();
    return () => { live = false; };
  }, [counterKey]);

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    border: '1px solid #ddd',
    borderRadius: 9999,
    padding: '6px 10px',
    fontSize: 12,
    fontWeight: 700,
    background: '#fff',
    color: '#111',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  };

  const wrap: React.CSSProperties = {
    display: 'flex',
    justifyContent: align === 'left' ? 'flex-start' : align === 'center' ? 'center' : 'flex-end',
    marginBottom: 16,
  };

  return (
    <div style={wrap} aria-live="polite">
      <div style={style} title="Unique-ish bumps; just for fun">
        <span>Visitors:</span>
        <span>{value ?? '—'}</span>
      </div>
    </div>
  );
}
