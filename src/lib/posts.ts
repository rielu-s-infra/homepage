// src/lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

// 共通のファイル読み込み補助関数
const getDirectoryPath = (dir: string) => path.join(process.cwd(), dir);

// 記事一覧を取得する関数
export function getPosts(): Post[] {
  const postsDirectory = getDirectoryPath('posts');
  
  // ディレクトリが存在しない場合のガード
  if (!fs.existsSync(postsDirectory)) return [];

  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .filter((fn) => fn.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content: body } = matter(fileContents);

      return {
        slug,
        content: body,
        title: data.title || 'Untitled',
        date: data.date || '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 自己紹介を取得する関数
export function getAboutContent(): AboutData {
  const contentDirectory = getDirectoryPath('content');
  const filePath = path.join(contentDirectory, 'about.md');

  if (!fs.existsSync(filePath)) {
    return { attributes: {}, content: 'about.md not found' };
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(fileContents);

  return {
    attributes: data,
    content: body
  };
}

export function getPostBySlug(slug: string): Post | undefined {
  const allPosts = getPosts();
  return allPosts.find(p => p.slug === slug);
}