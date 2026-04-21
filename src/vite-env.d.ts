// src/vite-env.d.ts
interface ImportMetaEnv {
  readonly VITE_GITHUB_USERNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}