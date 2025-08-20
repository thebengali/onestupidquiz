import type { MetadataRoute } from 'next';
import { quizzes } from '@/app/data/quizzes';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://onestupidquiz.com';
  const items: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
  ];
  quizzes.forEach(q => items.push({ url: `${base}/quiz/${q.id}`, lastModified: new Date() }));
  return items;
}
