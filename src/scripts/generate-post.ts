import { generateFlamengoPost } from "../lib/gemini";
import { sql, createPostsTable } from "../lib/db";
import { validateEnv } from "../lib/env";

async function main() {
  try {
    console.log("--- Iniciando Geração de Post ---");
    
    console.log("Validando variáveis de ambiente...");
    const env = validateEnv();
    console.log("Ambiente: OK");

    if (!sql) {
      throw new Error("Conexão com o banco de dados não disponível (DATABASE_URL ausente).");
    }

    console.log("Garantindo que a tabela 'posts' existe...");
    await createPostsTable();

    console.log("Chamando Gemini para gerar conteúdo...");
    const post = await generateFlamengoPost(env.POST_CONTEXT);
    console.log("Conteúdo gerado com sucesso!");
    console.log("Título:", post.title);
    console.log("Categoria:", post.category);
    
    console.log("Salvando no Neon Postgres...");
    const [savedPost] = await sql`
      INSERT INTO posts (title, content, excerpt, tags, category)
      VALUES (${post.title}, ${post.content}, ${post.excerpt}, ${post.tags}, ${post.category})
      RETURNING id
    `;
    
    console.log("SUCESSO! Post salvo com ID:", savedPost.id);
    process.exit(0);
  } catch (error: any) {
    console.error("--- ERRO NA EXECUÇÃO ---");
    console.error("Mensagem:", error.message);
    process.exit(1);
  }
}

main();
