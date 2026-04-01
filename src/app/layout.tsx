import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FUT INTELIGENTE | Futebol Global & Mengão",
  description: "O portal definitivo para o torcedor exigente. Notícias de futebol mundial com o coração no Flamengo, movido por IA.",
  keywords: ["Futebol", "Flamengo", "Libertadores", "Champions League", "Brasileirão", "IA"],
  openGraph: {
    title: "FUT INTELIGENTE",
    description: "Futebol mundial com a alma rubro-negra.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "FUT INTELIGENTE",
    description: "Onde a inteligência encontra a paixão pelo futebol.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen`}>
        <header className="bg-zinc-900 border-b border-zinc-800 py-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-zinc-800 to-black" />
          <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
            <h1 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-2">
              <span className="text-red-600">FUT</span>
              <span>INTELIGENTE</span>
            </h1>
            <nav className="flex gap-6 font-bold uppercase text-xs tracking-widest text-zinc-400">
              <a href="/" className="hover:text-white transition-colors">Início</a>
              <a href="#" className="hover:text-white transition-colors">Campeonatos</a>
              <a href="#" className="hover:text-white transition-colors">Flamengo</a>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-12">
          {children}
        </main>
        <footer className="border-t border-zinc-800 py-8 text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} - FUT INTELIGENTE | Onde a paixão encontra a tecnologia.
        </footer>
      </body>
    </html>
  );
}
