import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates strategic CRM advice based on current KPIs.
 * Uses a lightweight text model for quick reasoning.
 */
export const getStrategicAdvice = async (kpiContext: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Sen "Kiler" akıllı tarif platformu için ödüllü bir CRM Mimarısı ve Veri Hikayeleştiricisisin.
        Aşağıdaki KPI bağlamını analiz et ve kısa, stratejik, 2 cümlelik aksiyon içeren bir içgörü sun.
        Tonun "Yönetim Danışmanı" gibi olsun: net, stratejik, rakam odaklı.
        Yanıtı kesinlikle Türkçe ver.
        
        Bağlam: ${kpiContext}
      `,
    });
    return response.text || "Şu anda içgörü oluşturulamıyor.";
  } catch (error) {
    console.error("AI Advice Error:", error);
    return "AI bağlantı kesintisi. Analiz yapılamıyor.";
  }
};

/**
 * Generates a future forecast based on simulation parameters.
 */
export const getFutureSimulation = async (params: { budget: number, tech: number, market: number }): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Sen Kiler uygulamasının Gelecek Simülasyonu (Predictive AI) modülüsün.
        Yönetici şu parametreleri değiştirdi:
        - Pazarlama Bütçesi Artışı: %${params.budget}
        - Teknoloji/AI Yatırımı: %${params.tech}
        - Yeni Pazar Açılımı: %${params.market}

        Bu senaryoya göre:
        1. Beklenen Kullanıcı Büyümesi (Tahmini %)
        2. Olası Risk (Tek cümle)
        3. Stratejik Tavsiye (Tek cümle)
        
        Format: JSON değil, okunaklı, maddeli bir Türkçe metin olsun. Samimi ama profesyonel bir dil kullan.
      `,
    });
    return response.text || "Simülasyon oluşturulamadı.";
  } catch (error) {
    console.error("Simulation Error:", error);
    return "Simülasyon servisi yanıt vermiyor.";
  }
};

/**
 * Edits an image using Gemini 2.5 Flash Image based on a text prompt.
 * Examples: "Add a vintage filter", "Remove the spoon", "Make the background dark".
 */
export const editRecipeImage = async (base64Image: string, prompt: string, mimeType: string = 'image/png'): Promise<string> => {
  try {
    // Ensure base64 string doesn't have the header
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: `Edit this image: ${prompt}. Return only the edited image.`,
          },
        ],
      },
      // No responseMimeType/Schema allowed for this model
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data returned from model.");

  } catch (error) {
    console.error("Image Edit Error:", error);
    throw error;
  }
};