"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Tag, Share2, Bookmark } from "lucide-react";
import { useEffect } from "react";
import { Post } from "@/lib/db";

interface PostModalProps {
  post: Post | null;
  onClose: () => void;
}

export default function PostModal({ post, onClose }: PostModalProps) {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (post) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [post]);

  if (!post) return null;

  const dateStr = new Date(post.created_at || new Date()).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="relative p-6 md:p-10 border-b border-zinc-800 bg-zinc-900/50">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-zinc-500 mb-6 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-red-500" /> {dateStr}</span>
              <span className="flex items-center gap-2"><Bookmark className="w-4 h-4 text-red-500" /> {post.category || 'Geral'}</span>
              <span className="flex items-center gap-2"><Tag className="w-4 h-4 text-red-500" /> {post.tags?.[0] || 'Flamengo'}</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight italic decoration-red-600 underline-offset-8">
              {post.title}
            </h2>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
            <div className="prose prose-invert prose-red max-w-none">
              <div 
                className="text-zinc-300 text-lg leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/\n/g, '<br/>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
                    .replace(/\* (.*?)(<br\/>|$)/g, '<li class="ml-4 list-disc">$1</li>')
                    .replace(/(<li.*<\/li>)/g, '<ul class="my-4">$1</ul>')
                }} 
              />
            </div>

            {/* Footer / Actions */}
            <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-6">
              <div className="flex gap-2">
                {post.tags?.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-zinc-950 text-zinc-500 text-[10px] rounded-full border border-zinc-800 uppercase font-black">
                    #{tag}
                  </span>
                ))}
              </div>

              <button className="flex items-center gap-2 text-zinc-400 hover:text-red-500 font-bold text-sm transition-colors uppercase tracking-tight">
                <Share2 className="w-4 h-4" /> Compartilhar com a Nação
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
