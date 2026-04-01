import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function generateFlamengoPost() {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables.");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Você é um redator de um blog apaixonado pelo Flamengo. 
    Escreva um post curto e empolgante sobre as últimas notícias do Flamengo ou uma curiosidade histórica do clube.
    
    O post deve estar em formato JSON com a seguinte estrutura:
    {
      "title": "Título chamativo",
      "content": "Conteúdo do post em formato Markdown",
      "excerpt": "Um pequeno resumo de 1 frase",
      "tags": ["Flamengo", "Futebol", "..."]
    }
    
    Responda APENAS o JSON, sem blocos de código ou explicações.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  try {
    return JSON.parse(text);
  } catch (error) {
    // Caso a IA retorne markdown block, tentamos limpar
    const cleanText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanText);
  }
}
