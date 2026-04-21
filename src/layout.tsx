import './globals.css'; // Tailwind等のスタイル
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Rieru.dev',
  description: 'Infrastructure Engineer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${inter.className} bg-[#020617] text-slate-200 antialiased`}>
        {/* 重要: ここで HomePage を直接インポートして置いてはいけません。
          Next.jsが現在のURLに基づいたページを children として渡してくれます。
        */}
        <div className="relative min-h-screen">
          {/* 背景の装飾（ドット背景など）が必要ならここに配置 */}
          <div className="fixed inset-0 z-[-1] bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          
          {children}
        </div>
      </body>
    </html>
  );
}