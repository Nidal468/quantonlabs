import { cleanAIResponse } from "@/quantonlabs/utils/clean_response";
import { OpenRouter } from "@/server/openrouter";

export async function Reason_Model(
    prompt: string,
    system_prompt: string,
    openRouterKey: string | undefined
) {
    try {
        const aiResponse = await OpenRouter({
            config: {
                mode: "chat",
                model: openRouterKey ? process.env.OPENROUTER_MODEL! : "openai/gpt-oss-20b",
                max_tokens: 60000,
                stream: false,

                messages: [
                    {
                        role: "system",
                        content: system_prompt,
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            },
            openRouterKey
        });

        const cleaned = cleanAIResponse(aiResponse.content);

        if (!cleaned) throw new Error("No valid JSON found");

        return JSON.parse(cleaned);
    } catch (err) {
        console.error("AI JSON parsing failed:", err);
        return null;
    }
}