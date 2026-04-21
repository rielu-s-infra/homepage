import { useEffect, useState } from 'react';
import { getPosts, Post } from '../lib/posts';
import { getGitHubRepos, Repo } from '../lib/github';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    // Markdownの取得（ローカル実行）
    setPosts(getPosts());

    // GitHub APIの取得
    getGitHubRepos('your-github-username')
      .then(setRepos)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Official Site</h1>
      
      {/* 以前のコードと同様のJSXをここに配置 */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Posts</h2>
        {posts.map(post => <div key={post.slug}>{post.title}</div>)}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">GitHub</h2>
        {repos.slice(0, 5).map(repo => <div key={repo.id}>{repo.name}</div>)}
      </section>
    </div>
  );
}