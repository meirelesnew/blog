import { generateFlamengoPost } from "../lib/gemini";
import { sql, createPostsTable } from "../lib/db";

async function main() {
  try {
    console.log("Iniciando geração de post...");
    
    // Garantir que a tabela existe
    await createPostsTable();

    const post = await generateFlamengoPost();
    console.log("Post gerado com sucesso:", post.title);
    
    // Salvar no banco de dados
    const [savedPost] = await sql`
      INSERT INTO posts (title, content, excerpt, tags)
      VALUES (${post.title}, ${post.content}, ${post.excerpt}, ${post.tags})
      RETURNING *
    `;
    
    console.log("Post salvo no banco de dados com ID:", savedPost.id);
    process.exit(0);
  } catch (error) {
    console.error("Erro ao gerar post:", error);
    process.exit(1);
  }
}

main();
