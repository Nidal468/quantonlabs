import { chunkText } from "./text.chunker";

export function chunkPDF(pages: any[]) {
  const chunks: string[] = [];

  for (const page of pages) {
    const text = (page.blocks || [])
      .map((b: any) => b.text)
      .join("\n");

    chunks.push(...chunkText(text, 800, 120));
  }

  return chunks;
}