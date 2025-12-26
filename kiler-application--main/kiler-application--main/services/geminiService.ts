
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, FoodStyle, UserPreferences, PlanType } from "../types";
import { Language } from "../translations";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const getRecipeCountByPlan = (plan?: PlanType): number => {
  if (plan === 'Standart') return 2;
  if (plan === 'Aile') return 6;
  return 4; // Default and 'Şef' plan
};

const healthStatsSchema = {
  type: Type.OBJECT,
  properties: {
    calories: { type: Type.STRING },
    protein: { type: Type.STRING },
    carbs: { type: Type.STRING },
    fat: { type: Type.STRING },
    fiber: { type: Type.STRING },
    sugar: { type: Type.STRING },
    sodium: { type: Type.STRING },
    vitamins: { type: Type.ARRAY, items: { type: Type.STRING } },
    healthScore: { type: Type.NUMBER },
    glycemicIndex: { type: Type.STRING },
    comment: { type: Type.STRING }
  },
  required: ["calories", "protein", "carbs", "fat", "fiber", "sugar", "sodium", "vitamins", "healthScore", "glycemicIndex", "comment"]
};

const getPreferenceContext = (prefs?: UserPreferences, isStrict: boolean = false, lang: Language = 'tr') => {
  if (!prefs) return "";
  const allergiesStr = prefs.allergies.length > 0 ? prefs.allergies.join(', ') : (lang === 'tr' ? 'Yok' : 'None');
  const diseasesStr = prefs.diseases.length > 0 ? prefs.diseases.join(', ') : (lang === 'tr' ? 'Belirtilmedi' : 'Not specified');
  
  const healthMsg = lang === 'tr' 
    ? "Bu tarif sağlık tercihleriniz ve alerjileriniz dikkate alınarak hazırlanmıştır."
    : "This recipe was prepared taking into account your health preferences and allergies.";

  let calorieInstruction = "";
  if (prefs.dailyCalorieGoal > 0) {
    calorieInstruction = `
      CALORIE COMPLIANCE RULE:
      - The user has a daily goal of ${prefs.dailyCalorieGoal} kcal.
      - Each individual recipe MUST be a single balanced portion.
      - Each recipe's calories MUST be between 20% and 35% of the daily goal (approx ${Math.floor(prefs.dailyCalorieGoal * 0.2)} - ${Math.floor(prefs.dailyCalorieGoal * 0.35)} kcal per recipe).
    `;
  }

  if (isStrict) {
    return `
      CRITICAL HEALTH RESTRICTIONS:
      - ALLERGIES: ${allergiesStr}. ABSOLUTELY DO NOT USE THESE ITEMS!
      - CONDITIONS: ${diseasesStr}. Optimize components accordingly.
      ${calorieInstruction}
      - IMPORTANT: Include this phrase in the 'comment' field: "${healthMsg}"
    `;
  }

  return `
    HEALTH DATA:
    - ALLERGIES: ${allergiesStr} 
    - CONDITIONS: ${diseasesStr}
    ${calorieInstruction}
  `;
};

export const generateIngredientRecipes = async (ingredients: string, prefs?: UserPreferences, lang: Language = 'tr', plan?: PlanType): Promise<Recipe[]> => {
  const ai = getAI();
  const count = getRecipeCountByPlan(plan);
  const langPrompt = lang === 'tr' ? "Lütfen tüm yanıtları TÜRKÇE ver." : "Please provide all responses in ENGLISH.";
  const prompt = `${langPrompt} Ingredients: ${ingredients}. 
  ${getPreferenceContext(prefs, false, lang)}
  Generate exactly ${count} healthy recipes. Ensure calorie limits are strictly followed if provided.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: `You are a professional nutritionist chef. Respond strictly in ${lang === 'tr' ? 'Turkish' : 'English'}. Provide exactly ${count} recipes.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            summary: { type: Type.STRING },
            prepTime: { type: Type.STRING },
            detailedIngredients: { type: Type.ARRAY, items: { type: Type.STRING } },
            instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            healthStats: healthStatsSchema
          },
          required: ["name", "summary", "prepTime", "detailedIngredients", "instructions", "warnings", "healthStats"]
        }
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateBudgetRecipes = async (budget: string, style: FoodStyle, prefs?: UserPreferences, lang: Language = 'tr', plan?: PlanType): Promise<Recipe[]> => {
  const ai = getAI();
  const count = getRecipeCountByPlan(plan);
  const langPrompt = lang === 'tr' ? "Lütfen tüm yanıtları TÜRKÇE ver." : "Please provide all responses in ENGLISH.";
  const prompt = `${langPrompt} Budget: ${budget} TL. Style: ${style}. 
  ${getPreferenceContext(prefs, true, lang)}
  Generate exactly ${count} recipes. Ensure strict allergen and calorie control.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: `You are a budget-friendly nutritionist chef. Respond strictly in ${lang === 'tr' ? 'Turkish' : 'English'}. Provide exactly ${count} recipes.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            cost: { type: Type.STRING },
            costReason: { type: Type.STRING },
            summary: { type: Type.STRING },
            prepTime: { type: Type.STRING },
            detailedIngredients: { type: Type.ARRAY, items: { type: Type.STRING } },
            instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            healthStats: healthStatsSchema
          },
          required: ["name", "cost", "costReason", "summary", "prepTime", "detailedIngredients", "instructions", "warnings", "healthStats"]
        }
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateGroceryList = async (budget: number, lang: Language = 'tr'): Promise<any> => {
  const ai = getAI();
  const prompt = `
    Budget: ${budget} TL. 
    Create a smart grocery list based on current market prices in Turkey. 
    Focus on essential healthy items (proteins, vegetables, grains).
    DO NOT spend the whole budget, leave about 5-10% as change.
    Response must be JSON.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are a smart shopping assistant. Create realistic grocery lists for Turkey market prices. Respond in JSON.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                price: { type: Type.NUMBER },
                amount: { type: Type.STRING }
              },
              required: ["name", "price", "amount"]
            }
          },
          totalSpent: { type: Type.NUMBER },
          remaining: { type: Type.NUMBER },
          strategy: { type: Type.STRING, description: "Why these items were chosen for this budget" }
        },
        required: ["items", "totalSpent", "remaining", "strategy"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateDailyNutritionPlan = async (calories: number, prefs?: UserPreferences, lang: Language = 'tr'): Promise<string> => {
  const ai = getAI();
  const allergies = prefs?.allergies || [];
  const diseases = prefs?.diseases || [];
  
  const prompt = `
    Lütfen ${calories} kcal hedefi için bir günlük beslenme planı oluştur.
    
    KRİTİK SAĞLIK KISITLAMALARI (KESİNLİKLE UYULMALIDIR):
    - ŞU ALERJENLERİ İÇEREN HİÇBİR ŞEY EKLEME: ${allergies.join(', ') || 'Yok'}
    - ŞU SAĞLIK DURUMLARINA UYGUN OLMAYAN GIDALARDAN KAÇIN: ${diseases.join(', ') || 'Belirtilmedi'}
    
    Talimat: Yukarıdaki kısıtlamaları ihlal eden herhangi bir besin önerirsen bu kullanıcı için tehlikeli olabilir. Lütfen çok dikkatli ol.
    
    Yanıtı şu şekilde bir AĞAÇ YAPISINDA (Tree Structure) ver:
    
    [GÜNLÜK BESLENME PLANI - ${calories} kcal]
    ┃
    ┣━ 🌅 KAHVALTI
    ┃  ┗━ [Yemek/Menü]
    ┃  ┗━ [Porsiyon/Detay]
    ┃
    ┣━ 🥗 ÖĞLE YEMEĞİ
    ┃  ┗━ [Yemek/Menü]
    ┃  ┗━ [Porsiyon/Detay]
    ┃
    ┣━ 🍎 ARA ÖĞÜN
    ┃  ┗━ [Detay]
    ┃
    ┗━ 🌙 AKŞAM YEMEĞİ
       ┗━ [Yemek/Menü]
       ┗━ [Porsiyon/Detay]
       
    Yanıt dili: ${lang === 'tr' ? 'Türkçe' : 'İngilizce'}. Sadece ağaç yapısını gönder, ek açıklama yapma.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: "Sen profesyonel bir diyetisyensin. Beslenme planlarını görsel bir hiyerarşi (ağaç yapısı) içinde sunarsın. Alerjiler ve hastalıklar konusunda %100 hassasiyet gösterirsin.",
    }
  });

  return response.text || "";
};

export const generateFoodHarmAnalysis = async (foodName: string, lang: Language = 'tr'): Promise<string> => {
  const ai = getAI();
  const prompt = `
    Lütfen şu paketli/işlenmiş gıdayı analiz et: "${foodName}".
    İçeriğindeki olası katkı maddelerini (koruyucular, renklendiriciler, tatlandırıcılar vb.) ve bunların insan sağlığı üzerindeki zararlarını bir AĞAÇ YAPISINDA (Tree Structure) sun.
    
    Örnek yapı:
    [${foodName.toUpperCase()} ANALİZİ]
    ┃
    ┣━ 🧪 KATKI MADDELERİ & KORUYUCULAR
    ┃  ┣━ [Katkı Adı / E-Kodu]
    ┃  ┃  ┗━ ⚠️ Zararı: [Kısa sağlık riski]
    ┃  ┣━ [Katkı Adı 2]
    ┃  ┃  ┗━ ⚠️ Zararı: [Kısa sağlık riski]
    ┃
    ┣━ 🧬 UZUN VADELİ RİSKLER
    ┃  ┗━ [Risk 1]
    ┃  ┗━ [Risk 2]
    ┃
    ┗━ 🏁 SONUÇ & TAVSİYE
       ┗━ [Güvenlik derecesi ve alternatif önerisi]

    Yanıt dili: ${lang === 'tr' ? 'Türkçe' : 'İngilizce'}. Sadece hiyerarşik ağaç yapısını gönder, gereksiz cümle kurma.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: "Sen bir gıda mühendisi ve toksikologsun. Paket gıda içeriklerini ve zararlarını bilimsel verilere dayanarak, görsel bir ağaç yapısında sunarsın.",
    }
  });

  return response.text || "";
};
