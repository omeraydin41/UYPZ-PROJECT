import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const generateRecipesFromIngredients = async (ingredients: string[], allergies: string[] = []): Promise<Recipe[]> => {
  if (!apiKey) {
    console.error("API Key is missing");
    // Return mock data if API key is missing to prevent app crash during preview without key
    return getMockRecipes();
  }

  const model = "gemini-2.5-flash";
  
  let allergyNote = "";
  if (allergies.length > 0) {
    allergyNote = `ÖNEMLİ: Kullanıcının şu besinlere alerjisi vardır: ${allergies.join(", ")}. Oluşturacağın tariflerde bu malzemeleri ASLA kullanma ve bunları içeren tarifler önerme.`;
  }

  const prompt = `
    Kullanıcının elindeki malzemeler: ${ingredients.join(", ")}.
    ${allergyNote}
    
    Bu malzemeleri (ve evde bulunabilecek temel malzemeleri: tuz, yağ, baharat vb.) kullanarak yapılabilecek 3 adet lezzetli Türk mutfağına uygun veya global pratik yemek tarifi oluştur.
    
    Çıktı JSON formatında olmalı ve şu alanları içermelidir:
    - name (Yemek adı)
    - description (Kısa, iştah açıcı açıklama)
    - cookingTime (Hazırlama ve pişirme süresi, örn: "30 dk")
    - difficulty ("Kolay", "Orta" veya "Zor")
    - calories (Tahmini kalori, sayı olarak)
    - protein (Tahmini protein gramajı, sayı olarak)
    - carbs (Tahmini karbonhidrat gramajı, sayı olarak)
    - fat (Tahmini yağ gramajı, sayı olarak)
    - ingredients (Gerekli malzemeler listesi)
    - steps (Hazırlanış adımları listesi)
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              cookingTime: { type: Type.STRING },
              difficulty: { type: Type.STRING, enum: ["Kolay", "Orta", "Zor"] },
              calories: { type: Type.NUMBER },
              protein: { type: Type.NUMBER },
              carbs: { type: Type.NUMBER },
              fat: { type: Type.NUMBER },
              ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
              steps: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["name", "description", "cookingTime", "difficulty", "calories", "protein", "carbs", "fat", "ingredients", "steps"]
          },
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as Recipe[];
    }
    return [];
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw new Error("Tarifler oluşturulurken bir hata oluştu.");
  }
};

const getMockRecipes = (): Recipe[] => [
  {
    name: "Örnek: Hızlı Menemen",
    description: "Klasik, hızlı ve lezzetli bir Türk kahvaltısı vazgeçilmezi.",
    cookingTime: "15 dk",
    difficulty: "Kolay",
    calories: 250,
    protein: 12,
    carbs: 8,
    fat: 18,
    ingredients: ["2 Yumurta", "2 Domates", "2 Biber", "Sıvı Yağ", "Tuz"],
    steps: ["Biberleri doğrayıp kavurun.", "Domatesleri ekleyip pişirin.", "Yumurtaları kırıp karıştırın."]
  }
];