export type MessageType = {
    role: string;
    content:
    | string
    | (
        | {
            type: string;
            text: string;
            image_url?: string;
        }
        | {
            type: string;
            image_url: {
                url: string;
            };
            text?: string;
        }
    )[];
};

export type ToolDefinition = {
    type: "function";
    function: {
        name: string;
        description?: string;
        parameters: Record<string, any>;
    };
};

export type ChatConfig = {
    mode: "chat";
    messages: MessageType[];
    model: string;
    max_tokens: number;
    stream: boolean;

    // ✅ optional tools support
    tools?: ToolDefinition[];
    tool_choice?: "auto" | "none" | { type: "function"; function: { name: string } };
};

export type EmbeddingConfig = {
    mode: "embedding";
    model: string;
    input: string | string[];
};

export type OpenRouterType = ChatConfig | EmbeddingConfig;

export async function OpenRouter({
    config,
    openRouterKey,
}: {
    config: OpenRouterType;
    openRouterKey: string | undefined;
}) {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 4000 * 60 * 10);

    const isOpenRouter = !!openRouterKey;

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(isOpenRouter
            ? {
                  Authorization: `Bearer ${openRouterKey}`,
                  "HTTP-Referer": "https://your-site.com",
                  "X-Title": "Your App Name",
              }
            : {}),
    };

    try {
        /**
         * EMBEDDINGS
         */
        if (config.mode === "embedding") {
            const res = await fetch(
                isOpenRouter
                    ? "https://openrouter.ai/api/v1/embeddings"
                    : "http://localhost:1234/v1/embeddings",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        model: config.model,
                        input: config.input,
                    }),
                    signal: controller.signal,
                }
            );

            if (!res.ok) {
                throw new Error(`Embedding error: ${await res.text()}`);
            }

            const data = await res.json();

            clearTimeout(timeout);

            return data?.data?.[0]?.embedding ?? [];
        }

        /**
         * CHAT
         */
        const res = await fetch(
            isOpenRouter
                ? "https://openrouter.ai/api/v1/chat/completions"
                : "http://localhost:1234/v1/chat/completions",
            {
                method: "POST",
                headers,
                body: JSON.stringify({
                    model: config.model,
                    messages: config.messages,
                    max_tokens: config.max_tokens,
                    stream: config.stream,

                    // ✅ OPTIONAL TOOL SUPPORT
                    ...(config.tools ? { tools: config.tools } : {}),
                    ...(config.tool_choice ? { tool_choice: config.tool_choice } : {}),
                }),
                signal: controller.signal,
            }
        );

        if (!res.ok) {
            throw new Error(`Chat error: ${await res.text()}`);
        }

        /**
         * STREAM MODE
         */
        if (config.stream) {
            clearTimeout(timeout);
            return res.body;
        }

        /**
         * NORMAL MODE
         */
        const data = await res.json();

        clearTimeout(timeout);

        // ⚠️ return full message (important for tool_calls)
        return data?.choices?.[0]?.message;
    } catch (error) {
        clearTimeout(timeout);
        throw error;
    }
}