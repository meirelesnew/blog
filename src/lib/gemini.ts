import { GoogleGenerativeAI } from "@google/generative-ai";

export interface GeminiPost {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  category: string;
}

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function generateFlamengoPost(context?: string): Promise<GeminiPost> {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Você é o editor-chefe do "FUT INTELIGENTE", um blog premium que cobre o futebol mundial. 
    Seu público é composto por fãs de futebol de alto nível, com uma paixão especial pelo Flamengo.
    
    ${context ? `
    Use as seguintes informações em tempo real como base para o seu post:
    ---
    ${context}
    ---
    Transforme esses dados em um texto envolvente, apaixonado e informativo.
    ` : `
    Escolha aleatoriamente entre dois tipos de conteúdo:
    1. NOTÍCIA: Um resumo vibrante das últimas movimentações, jogos ou especulações (seja criativo e atual).
    2. HISTÓRIA: Uma curiosidade épica ou um fato histórico marcante do CRF (ex: Mundial de 81, a era Zico, a fundação do remo).
    `}

    O post deve estar rigorosamente em formato JSON com a seguinte estrutura:
    {
      "title": "Título impactante (máx 60 caracteres)",
      "content": "Conteúdo detalhado em Markdown (3-4 parágrafos, use negrito e listas se necessário)",
      "excerpt": "Um resumo provocativo de 1 frase para o card",
      "tags": ["Flamengo", "Futebol", "Categoria_Aqui"],
      "category": "${context ? 'Notícia Real' : 'Notícia ou História'}"
    }
    
    Importante: No Markdown do 'content', não use H1 ou H2, comece direto no texto. 
    Responda APENAS o JSON puríssimo.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  try {
    // Tenta encontrar o JSON no texto (caso haja texto extra ao redor)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Não foi possível encontrar um objeto JSON na resposta da IA.");
    }
    
    const jsonStr = jsonMatch[0].replace(/```json|```/g, "").trim();
    return JSON.parse(jsonStr) as GeminiPost;
  } catch (error) {
    console.error("Erro ao processar JSON do Gemini:", error);
    throw new Error(`Falha ao processar resposta da IA: ${text}`);
  }
}
