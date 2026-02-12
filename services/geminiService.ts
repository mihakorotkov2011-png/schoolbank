import { GoogleGenAI } from "@google/genai";

// NOTE: In a production environment, never expose your API key on the client side.
// This is for demonstration purposes or internal school prototypes.
const apiKey = process.env.API_KEY || ''; 

export const getFinancialAdvice = async (balance: number, question: string): Promise<string> => {
  if (!apiKey) {
    return "Пожалуйста, настройте API_KEY в файле конфигурации для работы ИИ.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      Ты веселый и умный помощник для школьника в приложении школьной валюты "Экси баллы".
      Текущий баланс пользователя: ${balance} баллов.
      Вопрос пользователя: "${question}"
      
      Ответь кратко (до 3 предложений), с юмором, и дай совет, как сэкономить или заработать баллы в школе.
      Используй молодежный сленг, но в меру.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Что-то я задумался... Попробуй еще раз!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Упс, мой финансовый процессор перегрелся. Попробуй позже.";
  }
};