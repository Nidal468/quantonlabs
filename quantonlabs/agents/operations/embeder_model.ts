import { OpenRouter } from "@/server/openrouter";

export async function Embeder_Model(text: string, openRouterKey: string | undefined) {
  try {
    const embedding = await OpenRouter({
      config: {
        mode: "embedding",
        model: openRouterKey ? process.env.OPENROUTER_TEXT_EMBEDDIN ? process.env.OPENROUTER_TEXT_EMBEDDIN : "openai/text-embedding-3-small" : "text-embedding-nomic-embed-text-v1.5",
        input: text,
      },
      openRouterKey
    });

    return embedding || [];
  } catch (error) {
    console.error("Embedding generation failed:", error);
    return [];
  }
}