"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GenerateButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    if (loading) return;
    setLoading(true);
    
    try {
      const res = await fetch("/api/generate-post");
      const data = await res.json();
      
      if (data.success) {
        // Recarrega a página para mostrar o novo post (server component recarrega os dados)
        router.refresh();
      } else {
        alert("Erro ao gerar post: " + data.error);
      }
    } catch (error) {
      alert("Erro na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className={`
        relative group overflow-hidden px-8 py-4 rounded-full font-black text-white transition-all transform active:scale-95
        ${loading ? 'bg-zinc-800 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.4)]'}
      `}
    >
      <div className="flex items-center gap-3 relative z-10">
        <Sparkles className={`w-5 h-5 ${loading ? 'animate-spin' : 'animate-pulse'}`} />
        <span>{loading ? "CONVOCANDO O MISTER..." : "GERAR NOTÍCIA AGORA"}</span>
      </div>
      
      {/* Gloss reflection effect */}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
    </button>
  );
}
