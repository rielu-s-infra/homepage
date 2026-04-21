// src/main.tsx
import { Buffer } from 'buffer';
import React, { useState, useEffect } from 'react';
import HomePage from './app/page';
import PostPage from './app/posts/[slug]/page';
window.Buffer = Buffer;

import ReactDOM from 'react-dom/client';
import './index.css'; // 必ず他のコンポーネントより後にインポート

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // URLの変更を検知する
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // ルーティングロジック
  if (currentPath.startsWith('/posts/')) {
    const slug = currentPath.split('/').pop() || '';
    return <PostPage params={{ slug }} />;
  }

  return <HomePage />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);