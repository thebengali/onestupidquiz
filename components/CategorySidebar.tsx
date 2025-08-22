'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

type Props = {
  categories: string[];
  selected: string;
  onSelect?: (cat: string) => void; // optional callback for client filtering
};

export default function CategorySidebar({ categories, selected, onSelect }: Props) {
  return (
    <aside className="w-full sm:w-56 shrink-0">
      <div className="sticky top-4 bg-white/70 rounded-2xl p-3 shadow">
        <h3 className="text-sm font-semibold mb-2">Categories</h3>
        <div className="flex sm:block gap-2 sm:gap-0">
          {categories.map((c) => {
            const active = c === selected;
            return (
              <button
                key={c}
                onClick={() => onSelect?.(c)}
                className={`px-3 py-2 rounded-xl border w-full text-left mb-2 ${active ? 'bg-black text-white border-black' : 'hover:bg-neutral-50'}`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
