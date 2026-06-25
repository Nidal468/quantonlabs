export function cleanAIResponse(text: string) {
    if (!text) return null;

    text = text.trim();

    // Remove markdown ```json ... ```
    if (text.startsWith("```")) {
        text = text.replace(/```json|```/g, "").trim();
    }

    // Extract JSON array or object safely
    const match = text.match(/\[[\s\S]*\]|\{[\s\S]*\}/);

    if (!match) {
        console.error("cleanAIResponse failed to parse JSON from text:", text);
        return null;
    }

    return match[0];
}