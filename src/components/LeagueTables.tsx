import { Trophy, ChevronRight } from "lucide-react";

const leagues = [
  {
    name: "Brasileirão",
    teams: [
      { rank: 1, name: "Flamengo", points: 12, played: 4, form: ["V", "V", "V", "V"] },
      { rank: 2, name: "Palmeiras", points: 10, played: 4, form: ["V", "E", "V", "V"] },
      { rank: 3, name: "Botafogo", points: 9, played: 4, form: ["V", "V", "D", "V"] },
      { rank: 4, name: "Galo", points: 7, played: 4, form: ["E", "V", "D", "V"] },
    ]
  },
  {
    name: "Premier League",
    teams: [
      { rank: 1, name: "Man City", points: 78, played: 31, form: ["V", "V", "V", "E"] },
      { rank: 2, name: "Arsenal", points: 75, played: 31, form: ["V", "D", "V", "V"] },
      { rank: 3, name: "Liverpool", points: 72, played: 31, form: ["E", "V", "V", "D"] },
      { rank: 4, name: "Chelsea", points: 64, played: 31, form: ["V", "V", "E", "V"] },
    ]
  },
  {
    name: "La Liga",
    teams: [
      { rank: 1, name: "Real Madrid", points: 82, played: 32, form: ["V", "V", "V", "V"] },
      { rank: 2, name: "Barcelona", points: 76, played: 32, form: ["V", "E", "V", "V"] },
      { rank: 3, name: "Atlético", points: 68, played: 32, form: ["D", "V", "V", "V"] },
      { rank: 4, name: "Girona", points: 62, played: 32, form: ["E", "D", "V", "E"] },
    ]
  }
];

export default function LeagueTables() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-10 px-4 md:px-0">
      {leagues.map((league) => (
        <div key={league.name} className="bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-zinc-800/50 p-6 shadow-xl hover:border-zinc-700/50 transition-all group">
          <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
            <h4 className="font-black uppercase tracking-tighter flex items-center gap-2 text-zinc-100 italic">
              <Trophy className="w-5 h-5 text-red-600" />
              {league.name}
            </h4>
            <button className="text-zinc-500 hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-zinc-600 font-bold uppercase text-[10px] tracking-widest">
                <th className="pb-3 px-2">#</th>
                <th className="pb-3 px-2">Clube</th>
                <th className="pb-3 px-2 text-right">P</th>
              </tr>
            </thead>
            <tbody className="divide-zinc-800/30">
              {league.teams.map((team) => (
                <tr key={team.name} className="border-t border-zinc-800/20 group/row hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3 px-2 font-black text-zinc-500 group-hover/row:text-red-500">{team.rank}</td>
                  <td className="py-3 px-2 font-bold text-zinc-100 truncate max-w-[120px]">{team.name}</td>
                  <td className="py-3 px-2 text-right font-black text-white">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Temporada 25/26</span>
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-red-600' : 'bg-zinc-800'}`} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
