import { Calendar, Tag, ChevronRight, Bookmark } from "lucide-react";
import { Post } from "@/lib/db";

export default function PostCard({ post, onClick }: { post: Post, onClick: () => void }) {
  const dateStr = post.created_at
    ? new Date(post.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "Data desconhecida";

  return (
    <article 
      onClick={onClick}
      className="group relative cursor-pointer bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 md:p-8 hover:border-red-600/50 hover:bg-zinc-900/80 transition-all duration-300 shadow-xl overflow-hidden"
    >
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

        <h3 className="text-xl md:text-2xl font-black text-white leading-tight mb-3 group-hover:text-red-500 transition-colors italic">
          {post.title}
        </h3>

        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 mt-6 text-red-500 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
          Ler mais <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </article>
  );
}
