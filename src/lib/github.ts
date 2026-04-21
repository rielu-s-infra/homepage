// src/lib/github.ts
export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export async function getGitHubRepos(username: string): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`, {
    next: { revalidate: 3600 }, // ISR: 1時間キャッシュ
    headers: {
      // 必要に応じてGitHub Tokenを環境変数から読み込む
      // Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch repos');
  return res.json();
}