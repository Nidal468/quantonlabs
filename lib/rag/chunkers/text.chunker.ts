import { encodingForModel } from "js-tiktoken";

const enc = encodingForModel("gpt-4o-mini");

export function chunkText(text: string, maxTokens = 1000, overlap = 150) {
  const tokens = enc.encode(text);
  const chunks: string[] = [];

  let i = 0;

  while (i < tokens.length) {
    chunks.push(enc.decode(tokens.slice(i, i + maxTokens)));

    if (i + maxTokens >= tokens.length) break;
    i += maxTokens - overlap;
  }

  return chunks;
}