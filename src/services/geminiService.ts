import { GoogleGenAI } from "@google/genai";

export async function getMysticInsight(superstition: string, backstory: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return "The oracle's connection is severed (API Key missing). Please check your environment configuration.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a mysterious oracle. Provide a short, cryptic, and atmospheric "Mystic Insight" (max 60 words) about the following superstition: "${superstition}". 
      Context: ${backstory}. 
      Focus on the spiritual or hidden meaning. Use evocative language.`,
      config: {
        temperature: 0.9,
        topP: 0.95,
      }
    });
    
    if (!response.text) {
      throw new Error("Empty response from oracle");
    }
    
    return response.text;
  } catch (error) {
    console.error("Error fetching mystic insight:", error);
    return "The shadows remain silent for now... The stars are not yet aligned. (API Error)";
  }
}
