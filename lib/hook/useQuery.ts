import { DataPage, DataPageDocument } from "@/model/datapage";
import { DataPageChunk, DataPageChunkDocument } from "@/model/datapageChunk";
import { Workspace, WorkspaceDocument } from "@/model/workspace";
import { Embeder_Model } from "@/quantonlabs/agents/operations/embeder_model";
import { Reason_Model } from "@/quantonlabs/agents/operations/reason_model";
import mongoose from "mongoose";

function normalize(text: string) {
    return text
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .trim();
}

// cosine similarity
function cosineSimilarity(a: number[], b: number[]) {
    let dot = 0;
    let magA = 0;
    let magB = 0;

    for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        magA += a[i] * a[i];
        magB += b[i] * b[i];
    }

    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export async function useQuery({
    queryText,
    agentId,
    workspaceId,
}: {
    agentId: string;
    queryText: string;
    workspaceId: string;
}) {

    const selectedWorkspace: WorkspaceDocument | null = await Workspace.findById(workspaceId);

    if (!selectedWorkspace) {
        throw new Error("Workspace not found");
    };

    const openrouterkey = selectedWorkspace.config.openrouter?.key;

    // -----------------------------
    // 1. Load pages
    // -----------------------------
    const dataPages = await DataPage.find({
        workspaceId,
        agentId,
        isArchived: false,
    }).lean();

    const pages = dataPages.map((e) => ({
        title: e.title,
        slug: e.slug,
        type: e.type,
        pageId: e._id.toString(),
    }));

    console.log(pages)

    // -----------------------------
    // 2. AI page routing
    // -----------------------------
    const aiResponse: { pageIds: string[] } = await Reason_Model(
        `
        Query:
        ${queryText}

       Available pages:
        ${pages.map(p => ({
            id: p.pageId,
            title: p.title,
            slug: p.slug
        }))}
                `,
        `You are a document retrieval ranking system.

        You MUST rank all available pages by relevance to the query.

        Query:
        ${queryText}

        Available pages:
        ${JSON.stringify(pages)}

        Rules:
        - ALWAYS return 1 to 3 pageIds
        - NEVER return an empty array
        - You MUST rank all pages mentally and pick best matches
        - If nothing is strongly relevant, still return closest semantic matches
        - Prefer title similarity and semantic meaning
        - Do NOT explain anything

        Output ONLY valid JSON:
        {
        "pageIds": ["id1", "id2"]
        }`,
        openrouterkey
    );

    console.log(aiResponse)

    const objectIds = aiResponse.pageIds.map(
        (id) => new mongoose.Types.ObjectId(id)
    );

    if (!objectIds.length) return [];

    // -----------------------------
    // 3. Embed query
    // -----------------------------
    const queryVector = await Embeder_Model(queryText, openrouterkey);
    const normalizedQuery = normalize(queryText);

    // -----------------------------
    // 4. Load ALL chunks manually (NO vector DB search)
    // -----------------------------
    const chunks: DataPageChunkDocument[] = await DataPageChunk.find({
        agentId,
        workspaceId,
        pageId: { $in: objectIds },
    }).lean();

    // -----------------------------
    // 5. Manual scoring (YOUR SYSTEM)
    // -----------------------------
    const scored = [];

    for (const chunk of chunks) {

        if (!chunk.vector || chunk.vector.length === 0) {
            console.log("SKIP: no vector");
            continue;
        }

        const contentRaw = chunk.content || "";
        const contentNorm = normalize(contentRaw);

        // -----------------------------
        // BASE COSINE SCORE
        // -----------------------------
        let score = cosineSimilarity(queryVector, chunk.vector);
        // -----------------------------
        // EXACT MATCH BOOST
        // -----------------------------
        let exactBoost = 0;

        if (contentNorm.includes(normalizedQuery)) {
            score += 0.6;
            exactBoost = 0.6;
        }

        // -----------------------------
        // CODE / SKU BOOST
        // -----------------------------
        let codeBoost = 0;

        const codeRegex = /\b[A-Z0-9]{4,}\b/g;
        const codes = contentRaw.toUpperCase().match(codeRegex);

        if (codes?.includes(normalizedQuery)) {
            score += 1.2;
            codeBoost = 1.2;
        }

        // -----------------------------
        // PARTIAL MATCH BOOST
        // -----------------------------
        let partialBoost = 0;

        if (
            normalizedQuery.length >= 4 &&
            contentNorm.includes(normalizedQuery.slice(0, 4))
        ) {
            score += 0.2;
            partialBoost = 0.2;
        }

        // -----------------------------
        // FINAL SCORE
        // -----------------------------

        scored.push({
            pageId: chunk.pageId,
            chunkIndex: chunk.chunkIndex,
            content: chunk.content,
            score,
        });
    }

    // -----------------------------
    // 6. Sort + return top results
    // -----------------------------
    scored.sort((a, b) => b.score - a.score);

    const topResults = scored.slice(0, 20);

    return topResults.map(({ chunkIndex, content }) => ({
        chunkIndex,
        content,
    }));
}