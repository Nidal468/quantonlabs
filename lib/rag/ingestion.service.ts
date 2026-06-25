import { normalizeInput } from "./normalize";
import { chunkText } from "./chunkers/text.chunker";
import { chunkPDF } from "./chunkers/pdf.chunker";
import { chunkXLSM } from "./chunkers/xlsm.chunker";
import { embedChunks } from "./embedding.service";

export async function ingestDocument(content: any, openRouterKey: string | undefined) {
  const normalized = normalizeInput(content);

  if (!normalized) throw new Error("Invalid content");

  let chunks: string[] = [];

  switch (normalized.type) {
    case "xlsm":
      chunks = chunkXLSM(normalized.sheets);
      break;

    case "pdf":
      chunks = chunkPDF(normalized.pages);
      break;

    case "text":
      chunks = chunkText(normalized.content);
      break;
  }

  const embeddings = await embedChunks(chunks, openRouterKey);

  return embeddings;
}