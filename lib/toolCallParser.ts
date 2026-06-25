export function extractToolCall(text: string) {
    try {
        const trimmed = text.trim();

        /**
         * -----------------------------
         * 1. PURE JSON TOOL CALL
         * -----------------------------
         */
        if (trimmed.startsWith("{")) {
            try {
                const json = JSON.parse(trimmed);

                if (json.tool) {
                    return {
                        tool: json.tool,
                        args: json,
                    };
                }
            } catch {}
        }

        /**
         * -----------------------------
         * 2. OPENAI-STYLE TOOL CALL
         * (future / function calling format)
         * -----------------------------
         */
        try {
            const parsed = JSON.parse(trimmed);

            if (
                parsed?.name ||
                parsed?.tool ||
                parsed?.function ||
                parsed?.function_call
            ) {
                return {
                    tool:
                        parsed.name ||
                        parsed.tool ||
                        parsed.function ||
                        parsed.function_call?.name,
                    args:
                        parsed.arguments ||
                        parsed.args ||
                        parsed.function_call?.arguments ||
                        parsed,
                };
            }
        } catch {}

        /**
         * -----------------------------
         * 3. OSS CHANNEL FORMAT (your case)
         * <|channel|>commentary to=search_knowledge code
         * <|message|>{...}
         * -----------------------------
         */
        const channelRegex =
            /<\|channel\|\>\s*commentary\s+to=([a-zA-Z0-9_]+)[^\n]*<\|message\|\>\s*(\{[\s\S]*?\})/;

        const match = trimmed.match(channelRegex);

        if (match) {
            return {
                tool: match[1].trim(),
                args: JSON.parse(match[2]),
            };
        }

        /**
         * -----------------------------
         * 4. FALLBACK: embedded JSON anywhere
         * -----------------------------
         */
        const jsonMatch = trimmed.match(
            /\{[\s\S]*\}/
        );

        if (jsonMatch) {
            try {
                const json = JSON.parse(jsonMatch[0]);

                if (json.tool || json.query) {
                    return {
                        tool:
                            json.tool ||
                            "search_knowledge",
                        args: json,
                    };
                }
            } catch {}
        }

        return null;
    } catch (err) {
        console.error("Tool parse error:", err);
        return null;
    }
}