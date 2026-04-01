import { generateFlamengoPost } from "../lib/gemini";

async function main() {
  try {
    console.log("--- INICIANDO DRY-RUN (TESTE) ---");
    
    // Simula um contexto de notícia real
    const mockContext = "O Flamengo venceu o Bragantino por 2x0 no Maracanã com gols de Arrascaeta e Pedro. A torcida ovacionou o time após a partida.";
    
    console.log("Usando contexto de teste:", mockContext);
    
    const post = await generateFlamengoPost(mockContext);
    
    console.log("\n--- RESULTADO DA GERAÇÃO ---");
    console.log("TÍTULO:", post.title);
    console.log("RESUMO:", post.excerpt);
    console.log("CATEGORIA:", post.category);
    console.log("TAGS:", post.tags.join(", "));
    console.log("\nCONTEÚDO (MARKDOWN):\n");
    console.log(post.content);
    console.log("\n--- FIM DO TESTE ---");
    
  } catch (error: any) {
    console.error("ERRO NO DRY-RUN:", error.message);
    process.exit(1);
  }
}

main();
