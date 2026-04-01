import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flamengo News - Blog Automatizado",
  description: "Notícias e curiosidades do Mengão geradas por IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen`}>
        <header className="bg-red-700 border-b-4 border-black py-6 shadow-xl">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-3xl font-black uppercase tracking-tighter">FLAMENGO NEWS</h1>
            <nav className="flex gap-4 font-bold uppercase text-sm">
              <a href="/" className="hover:text-black transition-colors">Início</a>
              <a href="#" className="hover:text-black transition-colors">Sobre</a>
              <a href="#" className="hover:text-black transition-colors">Contato</a>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-12">
          {children}
        </main>
        <footer className="border-t border-zinc-800 py-8 text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} - Flamengo News | Feito com 💖 e IA.
        </footer>
      </body>
    </html>
  );
}
