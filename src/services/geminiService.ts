import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function getMysticInsight(superstition: string, backstory: string) {
  try {
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
    return response.text;
  } catch (error) {
    console.error("Error fetching mystic insight:", error);
    return "The shadows remain silent for now... Try again when the stars align.";
  }
}
