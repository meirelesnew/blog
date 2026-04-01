import { getRecentPosts, createPostsTable } from "@/lib/db";
import PostList from "@/components/PostList";
import GenerateButton from "@/components/GenerateButton";
import LeagueTables from "@/components/LeagueTables";
import { Newspaper, Flame, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  await createPostsTable();
  const posts = await getRecentPosts(20);

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Hero / CTA Section */}
      <section className="relative overflow-hidden bg-zinc-900 rounded-[2.5rem] p-10 md:p-16 border border-zinc-800 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 justify-between text-center md:text-left">
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-red-600/10 text-red-500 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest border border-red-600/20">
              <Flame className="w-4 h-4" />
              Notícias em Tempo Real
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight text-white uppercase italic">
              FUT <span className="text-red-600">INTELIGENTE</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed">
              O portal definitivo do futebol mundial, com o coração pulsando no <span className="text-white font-bold">Mais Querido</span>. Análises e histórias movidas por IA.
            </p>
          </div>
          
          <div className="shrink-0">
            <GenerateButton />
          </div>
        </div>
      </section>

      {/* League Tables Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-l-4 border-red-600 pl-4">
          <Activity className="w-6 h-6 text-red-600" />
          <h3 className="text-xl font-black uppercase tracking-tighter italic">Classificações em Tempo Real</h3>
        </div>
        <LeagueTables />
      </section>

      {/* Posts Section */}
      <section className="space-y-10">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <h3 className="text-2xl md:text-3xl font-black flex items-center gap-3">
            <Newspaper className="text-red-500 w-8 h-8" />
            ÚLTIMAS DO MAIS QUERIDO
          </h3>
          <span className="text-zinc-500 font-bold text-sm bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800 uppercase tracking-wide">
            {posts.length} {posts.length === 1 ? "POST" : "POSTS"} DISPONÍVEIS
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Newspaper className="w-10 h-10 text-zinc-700" />
            </div>
            <p className="text-zinc-500 text-xl font-medium max-w-md">
              Ainda não temos notícias salvas. Use o botão acima para convocar o time de IA!
            </p>
          </div>
        ) : (
          <PostList initialPosts={posts} />
        )}
      </section>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
}
