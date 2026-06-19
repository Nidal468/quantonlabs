import { OpenRouter } from "@/server/openrouter";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64File = buffer.toString("base64");

        const isImage = file.type.startsWith("image/");

        const messages = [
            {
                role: "system",
                content: "You are an OCR and document text extraction AI. Extract ALL readable text exactly as written. Do not summarize."
            },
            {
                role: "user",
                content: isImage
                    ? [
                        {
                            type: "text",
                            text: "Extract all readable text from this image."
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:${file.type};base64,${base64File}`
                            }
                        }
                    ]
                    : `Extract all text from this document:\n\n${buffer.toString()}`
            }
        ]

        const extracted = await OpenRouter({
            config: {
                mode: "chat",
                max_tokens: 60000,
                stream: false,
                model: "openai/gpt-4o-mini", messages
            }, openRouterKey: ""
        })

        return NextResponse.json({ text: extracted });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
}