import { GoogleGenAI } from "@google/genai";

// A chave é acessada aqui de forma segura (do ENV do Netlify)
const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

export async function handler(event, context) {
  // 1. A função só aceita requisições POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    //  Desestruturar 'prompt' em vez de 'contents'
    const { prompt } = JSON.parse(event.body);

    // Adicionar uma verificação básica
    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "O corpo da requisição deve conter o campo 'prompt'.",
        }),
      };
    } // 2. Chame o modelo Gemini de forma segura

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Passar 'prompt' como 'contents'
      contents: prompt,
    }); // 3. Retorne a resposta para o frontend

    return {
      statusCode: 200,
      body: JSON.stringify({
        text: response.text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao se comunicar com o Assistente." }),
    };
  }
}
