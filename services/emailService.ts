import { GoogleGenAI } from "@google/genai";
import { Language } from "../constants/translations";

const apiKey = process.env.API_KEY || "";

export const sendWelcomeEmail = async (fullName: string, email: string, language: Language): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });
  
  const langNames: Record<Language, string> = {
    tr: "Türkçe",
    en: "English",
    de: "Deutsch",
    it: "Italiano",
    zh: "Chinese"
  };

  const prompt = `
    Write a beautiful, friendly, and professional welcome email for a new user of "Kiler.ai".
    User's Name: ${fullName}
    User's Email: ${email}
    Target Language: ${langNames[language]}
    
    The email should:
    1. Have a catchy subject line starting with "Hoş Geldin" or equivalent in the target language.
    2. Welcome them to the Kiler.ai family.
    3. Mention that they can now transform their ingredients into smart recipes and reduce food waste.
    4. Have a warm closing.
    5. Be formatted as a clean text email.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "Welcome to Kiler.ai!";
  } catch (error) {
    console.error("Error generating welcome email:", error);
    return "Welcome to Kiler.ai!";
  }
};
