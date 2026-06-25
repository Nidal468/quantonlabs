import { DataPage } from "@/model/datapage";
import { DataPageChunk } from "@/model/datapageChunk";

export async function savePage({
  pageData,
  embeddings,
  user,
  agentId,
  workspaceId,
}: any) {
  const page = await DataPage.create({
    ...pageData,
    agentId,
    workspaceId,
    uploaderId: user._id,
  });

  await DataPageChunk.insertMany(
    embeddings.map((e: any) => ({
      pageId: page._id,
      agentId,
      workspaceId,
      uploaderId: user._id,
      chunkIndex: e.chunkIndex,
      content: e.content,
      vector: e.vector,
    }))
  );

  return page;
}