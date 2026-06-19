export function normalizeInput(content: any) {
  if (!content) return null;

  switch (content.type) {
    case "spreadsheet":
      return {
        type: "xlsm",
        sheets: content.data.sheets || [],
      };

    case "pdf":
      return {
        type: "pdf",
        pages: content.data.pages || [],
      };

    case "text":
    default:
      return {
        type: "text",
        content: content.data?.content || "",
      };
  }
}