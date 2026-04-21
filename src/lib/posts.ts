// src/lib/posts.ts
import matter from 'gray-matter';

// Markdownファイルを一括取得（最新のVite形式）
const postModules = import.meta.glob('/posts/*.md', { 
  query: '?raw', 
  import: 'default', 
  eager: true 
});

const contentModules = import.meta.glob('/content/*.md', { 
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

export interface AboutData {
  attributes: {
    role?: string;
    location?: string;
    [key: string]: any;
  };
  content: string;
}

// 記事一覧を取得する関数
export function getPosts(): Post[] {
  return Object.entries(postModules).map(([filepath, content]) => {
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

// 自己紹介を取得する関数（ここがエラーの原因）
export function getAboutContent(): AboutData {
  const content = contentModules['/content/about.md'] as string;
  
  if (!content) {
    return { attributes: {}, content: 'about.md not found' };
  }

  const { data, content: body } = matter(content);
  return { 
    attributes: data, 
    content: body 
  };
}