import { Calendar, Tag, ChevronRight, Bookmark } from "lucide-react";
import Link from "next/link";
import { Post } from "@/lib/db";

export default function PostCard({ post, onClick }: { post: Post, onClick: () => void }) {
  const dateStr = new Date(post.created_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article 
      onClick={onClick}
      className="group relative cursor-pointer bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 md:p-8 hover:border-red-600/50 hover:bg-zinc-900/80 transition-all duration-300 shadow-xl overflow-hidden"
    >
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-3xl group-hover:bg-red-600/10 transition-colors" />
      
      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-500 mb-4 uppercase tracking-widest">
          <span className="flex items-center gap-1.5 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
            <Calendar className="w-3.5 h-3.5 text-red-500" /> {dateStr}
          </span>
          <span className="flex items-center gap-1.5 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
            <Bookmark className="w-3.5 h-3.5 text-red-500" /> {post.category || "Geral"}
          </span>
          <span className="flex items-center gap-1.5 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
            <Tag className="w-3.5 h-3.5 text-red-500" /> {post.tags?.[0] || "Flamengo"}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-red-500 transition-colors mb-4 leading-tight">
          {post.title}
        </h3>

        <p className="text-zinc-400 text-lg leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-zinc-800/50">
          <div className="flex gap-2">
            {post.tags?.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[10px] font-bold text-zinc-600 uppercase">
                #{tag}
              </span>
            ))}
          </div>
          
          <button className="flex items-center gap-1 text-sm font-bold text-red-500 group/btn transition-all">
            LER POST COMPLETO
            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
}
