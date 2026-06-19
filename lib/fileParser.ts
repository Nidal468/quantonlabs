// lib/fileParser.ts
import * as XLSX from "xlsx";
import mammoth from "mammoth";

export interface SpreadsheetSheet {
  name: string;
  headers: string[];
  rows: string[][];
}

export interface PdfBlock {
  type: "heading" | "paragraph" | "list" | "table" | "unknown";
  text: string;
}

export interface PdfPage {
  index: number;
  blocks: PdfBlock[];
}

export type FileContent =
  | { type: "spreadsheet"; sheets: SpreadsheetSheet[] }
  | { type: "pdf"; pages: PdfPage[] }
  | { type: "text" | "docx"; content: string };

export interface ParsedFile {
  file: File;
  type: "spreadsheet" | "pdf" | "text" | "docx" | "unknown";
  content: FileContent;
  selectedSheets: Set<string>;
  selectedPages: Set<number>;
  status: "idle" | "parsing" | "ready" | "uploading" | "success" | "error";
  error?: string;
}

export async function parseSpreadsheet(file: File): Promise<FileContent> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  
  const sheets: SpreadsheetSheet[] = workbook.SheetNames.map((name) => {
    const sheet = workbook.Sheets[name];
    const jsonData = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });
    const headers = (jsonData[0] || []).map((h) => String(h ?? ""));
    const rows = jsonData.slice(1).map((row) => row.map((cell) => String(cell ?? "")));
    return { name, headers, rows };
  });

  return { type: "spreadsheet", sheets };
}

export async function parseDocx(file: File): Promise<FileContent> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return { type: "docx", content: result.value || "" };
}

export async function parseText(file: File): Promise<FileContent> {
  const content = await file.text();
  return { type: "text", content };
}

export async function parsePdf(file: File, pdfjs: any): Promise<FileContent> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  const pages: PdfPage[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const items = textContent.items as any[];

    // Group by Y coordinate (rounded) to form lines
    const lineMap = new Map<number, { text: string; fontSize: number; x: number }[]>();
    for (const item of items) {
      const y = Math.round(item.transform[5]);
      const text = item.str.trim();
      if (!text) continue;
      const fontSize = item.transform[0] || item.transform[3] || 0;
      const x = item.transform[4];
      if (!lineMap.has(y)) lineMap.set(y, []);
      lineMap.get(y)!.push({ text, fontSize, x });
    }

    const blocks: PdfBlock[] = [];
    const sortedYs = Array.from(lineMap.keys()).sort((a, b) => b - a);

    for (const y of sortedYs) {
      const lineItems = lineMap.get(y)!;
      // Sort by X coordinate to reconstruct reading order
      lineItems.sort((a, b) => a.x - b.x);
      const lineText = lineItems.map((i) => i.text).join(" ");
      const maxFontSize = Math.max(...lineItems.map((i) => i.fontSize));
      const blockType: PdfBlock["type"] =
        maxFontSize > 14 ? "heading" : maxFontSize > 10 ? "paragraph" : "unknown";
      blocks.push({ type: blockType, text: lineText });
    }

    pages.push({ index: i, blocks });
  }

  return { type: "pdf", pages };
}
