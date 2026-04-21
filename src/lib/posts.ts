// src/lib/posts.ts
import matter from 'gray-matter';

// 最新のViteの書き方に修正
const modules = import.meta.glob('/content/posts/*.md', { 
  query: '?raw', 
  import: 'default', 
  eager: true 
});

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export function getPosts(): Post[] {
  return Object.entries(modules).map(([filepath, content]) => {
    const slug = filepath.split('/').pop()?.replace('.md', '') || '';
    const { data, content: body } = matter(content as string);
    
    return {
      slug,
      content: body,
      title: data.title || 'Untitled',
      date: data.date || '',
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}