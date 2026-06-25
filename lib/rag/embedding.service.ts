import { Embeder_Model } from "@/quantonlabs/agents/operations/embeder_model";

export async function embedChunks(chunks: string[], openRouterKey: string | undefined) {
  const embeddings: any[] = [];

  const concurrency = 3;
  let index = 0;

  async function worker() {
    while (index < chunks.length) {
      const i = index++;
      const chunk = chunks[i];

      try {
        const vector = await Embeder_Model(chunk, openRouterKey);

        if (vector?.length) {
          embeddings.push({
            chunkIndex: i,
            content: chunk,
            vector,
          });
        }
      } catch (err) {
        console.error("Embedding failed:", err);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));

  return embeddings;
}