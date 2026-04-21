import ReactMarkdown from 'react-markdown';
import { getPostBySlug, getPosts } from '../../../lib/posts'; // パスは適宜調整してください
import { notFound } from 'next/navigation';

// SSG（静的サイト生成）のために全スラグを事前に定義
export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto pt-32 px-6 pb-20">
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-mono text-sky-500">{post.date}</span>
          <span className="h-[1px] w-12 bg-slate-800"></span>
          <span className="text-xs font-mono text-slate-500 uppercase">System Log</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight sm:text-5xl">
          {post.title}
        </h1>
      </header>

      {/* Markdownを表示 */}
      <div className="prose prose-invert prose-sky max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <footer className="mt-20 pt-8 border-t border-slate-800">
        <a href="/" className="text-sky-500 hover:text-sky-400 font-mono text-sm">
          ← ./return_to_home
        </a>
      </footer>
    </article>
  );
}