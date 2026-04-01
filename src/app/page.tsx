"use client";

import { useState } from "react";
import { Sparkles, Newspaper, Tag, Calendar } from "lucide-react";

interface Post {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const generateNewPost = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-post");
      const data = await res.json();
      if (data.success) {
        setPosts([data.post, ...posts]);
      } else {
        alert("Erro: " + data.error);
      }
    } catch (error) {
      alert("Erro ao conectar com a API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero / Admin Control */}
      <section className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">Resumo Diário do Mengão</h2>
          <p className="text-zinc-400 text-lg">
            Gere conteúdo instantâneo sobre o Mais Querido usando inteligência artificial do Gemini.
          </p>
        </div>
        <button
          onClick={generateNewPost}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 text-white font-bold py-4 px-8 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg active:scale-95 whitespace-nowrap"
        >
          {loading ? (
            "Gerando..."
          ) : (
            <>
              <Sparkles className="w-5 h-5 fill-current" />
              GERAR NOVO POST
            </>
          )}
        </button>
      </section>

      {/* Posts Feed */}
      <section className="space-y-8">
        <h3 className="text-2xl font-bold flex items-center gap-2 border-b border-red-700/30 pb-4">
          <Newspaper className="text-red-500" />
          POSTAGENS RECENTES
        </h3>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-800">
            <p className="text-zinc-500 italic">Nenhuma postagem automática ainda. Clique no botão acima para começar!</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post, i) => (
              <article key={i} className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-red-900/50 transition-all group">
                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4 font-mono uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date().toLocaleDateString('pt-BR')}</span>
                  <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> {post.tags?.[0] || 'Geral'}</span>
                </div>
                <h4 className="text-2xl font-bold group-hover:text-red-500 transition-colors mb-4">{post.title}</h4>
                <p className="text-zinc-400 leading-relaxed mb-6 italic border-l-2 border-red-600 pl-4">
                  {post.excerpt}
                </p>
                <div className="prose prose-invert max-w-none prose-red">
                   {/* Simplified markdown preview */}
                   <p dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
                </div>
                <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
                  {post.tags?.map((tag, j) => (
                    <span key={j} className="bg-zinc-950 text-zinc-400 text-[10px] uppercase font-bold py-1 px-3 rounded-full border border-zinc-800">
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
