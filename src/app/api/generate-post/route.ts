import { NextResponse } from "next/server";
import { generateFlamengoPost } from "@/lib/gemini";
import { sql, createPostsTable } from "@/lib/db";

export async function GET() {
  try {
    // Garantir que a tabela existe (em produção isso seria uma migration)
    await createPostsTable();

    const post = await generateFlamengoPost();
    
    // Salvar no banco de dados
    const [savedPost] = await sql`
      INSERT INTO posts (title, content, excerpt, tags)
      VALUES (${post.title}, ${post.content}, ${post.excerpt}, ${post.tags})
      RETURNING *
    `;
    
    return NextResponse.json({ success: true, post: savedPost });
  } catch (error: any) {
    console.error("Error generating post:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
