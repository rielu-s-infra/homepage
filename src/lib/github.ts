export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export async function getGitHubRepos(username: string): Promise<Repo[]> {
  // Viteの環境変数からトークンを取得（もし設定する場合）
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
    // Vite(React)では next: { revalidate } は無視されますが、
    // ブラウザのキャッシュ機能は働きます。
    method: 'GET',
    headers: headers,
  });

  if (!res.ok) {
    // レートリミット制限などに掛かった場合のハンドリング
    console.error(`GitHub API error: ${res.status}`);
    return []; 
  }

  return res.json();
}