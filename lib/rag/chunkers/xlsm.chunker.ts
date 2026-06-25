export function chunkXLSM(sheets: any[]) {
  const chunks: string[] = [];

  for (const sheet of sheets) {
    const headers = sheet.headers?.join(" | ") || "";
    const rows = sheet.rows || [];

    const BATCH_SIZE = 30;

    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const batch = rows.slice(i, i + BATCH_SIZE);

      chunks.push(`
Sheet: ${sheet.name}

Headers:
${headers}

Rows:
${batch.map((r: any[]) => r.join(" | ")).join("\n")}
      `.trim());
    }
  }

  return chunks;
}