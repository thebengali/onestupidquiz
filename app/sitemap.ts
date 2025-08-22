import type { MetadataRoute } from 'next';
import { QUIZ_SETS } from '@/lib/quizzes';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.onestupidquiz.com';
  const now = new Date();
  const items: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/about`, lastModified: now },
    { url: `${base}/privacy`, lastModified: now },
  ];
  for (const s of QUIZ_SETS) {
    items.push({ url: `${base}/quiz/${s.slug}`, lastModified: now });
  }
  return items;
}
