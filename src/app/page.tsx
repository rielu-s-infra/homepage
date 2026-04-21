import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getPosts, getAboutContent } from '../lib/posts';
import type { Post, AboutData } from '../lib/posts'; 
import { getGitHubRepos } from '../lib/github';
import type { Repo } from '../lib/github';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [about, setAbout] = useState<AboutData | null>(null);

  const username = import.meta.env.VITE_GITHUB_USERNAME || "namonakiheimin";

  useEffect(() => {
    setPosts(getPosts());
    setAbout(getAboutContent());
    getGitHubRepos(username).then(setRepos).catch(console.error);
  }, [username]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="max-w-5xl mx-auto pt-24 px-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">System Active</span>
        </div>
        <h1 className="text-5xl font-black text-white sm:text-7xl tracking-tighter">
          Rieru<span className="text-sky-500">.</span>dev
        </h1>
        <p className="mt-6 text-xl text-slate-400 max-w-2xl leading-relaxed">
          Infrastructure Engineer. focusing on <span className="text-white">Kubernetes</span>, 
          <span className="text-white">IPv6 Networking</span>, and <span className="text-white">Self-hosting</span>.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#repos" className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-sky-900/20">GitHub Projects</a>
          <a href="#posts" className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition-all border border-slate-700">Read Blog</a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-32 space-y-32">
        
        {/* About Section */}
        <section id="about" className="scroll-mt-24">
          <h2 className="section-title">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 prose-custom">
              <ReactMarkdown>{about?.content || ""}</ReactMarkdown>
            </div>
            <div className="space-y-4">
              <AboutInfoCard label="Role" value={about?.attributes.role || "Engineer"} color="text-sky-400" />
              <AboutInfoCard label="Base" value={about?.attributes.location || "Japan"} color="text-slate-200" />
            </div>
          </div>
        </section>

        {/* Server Status - グリッドを少し強調 */}
        <section className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white tracking-tight">Node Status</h2>
            <span className="text-xs font-mono text-slate-500 uppercase">Uptime: 99.9%</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatusCard label="K8s Cluster" status="Healthy" color="text-green-400" />
            <StatusCard label="Nextcloud" status="Online" color="text-green-400" />
            <StatusCard label="S3 Storage" status="Online" color="text-green-400" />
            <StatusCard label="IPv6 Stack" status="Active" color="text-sky-400" />
          </div>
        </section>

        {/* Repos - カードの視認性向上 */}
        <section id="repos" className="scroll-mt-24">
          <h2 className="section-title">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.slice(0, 6).map(repo => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener" className="glass-card group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-white group-hover:text-sky-400 transition-colors">{repo.name}</h3>
                    <span className="text-xs font-mono text-slate-500">⭐ {repo.stargazers_count}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{repo.description || "No description provided."}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-sky-500 border border-slate-700 uppercase tracking-tighter">
                    {repo.language || "Config"}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Posts - 行間のゆとりとホバー */}
        <section id="posts" className="scroll-mt-24">
          <h2 className="section-title">Latest Posts</h2>
          <div className="divide-y divide-slate-800 border-t border-slate-800">
            {posts.map(post => (
              <a key={post.slug} href={`/posts/${post.slug}`} className="group flex flex-col md:flex-row md:items-center justify-between py-6 hover:px-4 hover:bg-slate-800/30 transition-all rounded-lg">
                <span className="text-lg font-bold text-slate-200 group-hover:text-sky-400 transition-colors">{post.title}</span>
                <span className="text-sm font-mono text-slate-500">{post.date}</span>
              </a>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

// ヘルパーコンポーネント
function AboutInfoCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">{label}</div>
      <div className={`font-mono text-sm ${color}`}>{value}</div>
    </div>
  );
}

function StatusCard({ label, status, color }: { label: string; status: string; color: string }) {
  return (
    <div className="p-4 bg-slate-800/30 border border-slate-800/50 rounded-lg">
      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">{label}</div>
      <div className={`text-sm font-bold ${color}`}>{status}</div>
    </div>
  );
}