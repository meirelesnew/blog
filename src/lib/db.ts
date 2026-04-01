import { neon } from "@neondatabase/serverless";

export interface Post {
  id?: number;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  category: string;
  created_at?: Date | string | number;
}

export const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export async function createPostsTable() {
  if (!sql) return;
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      tags TEXT[],
      category TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

export async function getRecentPosts(limit = 10) {
  if (!sql) {
    // Mock data for UI demonstration
    return [
      {
        id: 1,
        title: "Flamengo atropela no Maracanã com show da torcida",
        excerpt: "Em uma noite inspirada, o Mais Querido dominou a partida do início ao fim, garantindo três pontos fundamentais na tabela.",
        content: "O Flamengo entrou em campo com sede de vitória...",
        tags: ["Maracanã", "Brasileirão", "Vitoria"],
        created_at: new Date()
      },
      {
        id: 2,
        title: "Análise: A evolução tática sob o comando da inteligência artificial",
        excerpt: "Como as novas tecnologias estão ajudando o Mengão a mapear adversários e otimizar o rendimento dos atletas.",
        content: "A tecnologia se tornou aliada inseparável do futebol moderno...",
        tags: ["Tecnologia", "Analise", "Evolucao"],
        created_at: new Date(Date.now() - 86400000)
      }
    ];
  }
  return await sql`
    SELECT * FROM posts 
    ORDER BY created_at DESC 
    LIMIT ${limit}
  `;
}
