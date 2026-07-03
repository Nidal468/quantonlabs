import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { UserDocument } from "@/model/user";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

// Skill document shape (from JSON files)
export interface AgentSkillDoc {
  id: string;
  name: string;
  domain: string;
  description: string;
  icon: string;
  capabilities: string[];
  stats: { speed: number; accuracy: number; tokenEfficiency: number; power: number };
  buffs: { domain: string; value: number }[];
  debuffs: { domain: string; value: number }[];
  cost: number;
}

// Map agent id to JSON file path
const AGENT_SKILL_MAP: Record<string, string> = {
  cx: "cx_agent_skill.json",
  marketing: "marketing_agent_skill.json",
  sales: "sales_agent_skill.json",
  people: "people_agent_skill.json",
  operations: "operations_agent_skill.json",
  inventory: "inventory_agent_skill.json",
  finance: "finance_agent_skill.json",
  governing: "governing_agent_skill.json",
};

function loadSkillsFromJson(agentId: string): AgentSkillDoc[] {
  const fileName = AGENT_SKILL_MAP[agentId];
  if (!fileName) return [];

  const filePath = path.join(process.cwd(), "db", fileName);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as AgentSkillDoc[];
  } catch (err) {
    console.error(`Failed to load skills from ${filePath}:`, err);
    return [];
  }
}

// GET: Fetch all skills for a given agent id (from JSON files, fallback to MongoDB)
export async function GET(req: NextRequest) {
  const user: UserDocument | null = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Invalid authentication" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const agentId = searchParams.get("agentId");

  // If agentId provided, load from JSON file
  if (agentId) {
    const skills = loadSkillsFromJson(agentId);
    return NextResponse.json(skills);
  }

  // Otherwise fetch all skills from MongoDB
  try {
    await connectMongo();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not established");
    const skills = await db.collection<any>("agentskills").find({}).toArray();
    return NextResponse.json(skills);
  } catch (err: any) {
    console.error("Failed to fetch skills:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch skills" }, { status: 500 });
  }
}

// POST: Activate a skill for an agent in the workspace
export async function POST(req: NextRequest) {
  const user: UserDocument | null = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Invalid authentication" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { workspaceId, agentId, skillName }: { workspaceId: string; agentId: string; skillName: string } = body;

    if (!workspaceId || !agentId || !skillName) {
      return NextResponse.json({ error: "workspaceId, agentId, and skillName are required" }, { status: 400 });
    }

    await connectMongo();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not established");

    // Find the workspace's agent entry
    const workspace = await db.collection("workspaces").findOne({ _id: new mongoose.Types.ObjectId(workspaceId) });
    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    // Find the agent entry within this workspace
    const workspaceAgent = workspace.agents?.find((a: any) => a.id.toString() === agentId);
    if (!workspaceAgent) {
      return NextResponse.json({ error: "Agent not found in this workspace" }, { status: 404 });
    }

    const activeSkillIds: string[] = workspaceAgent.activeSkillIds || [];

    // Check max limit of 5
    if (activeSkillIds.length >= 5 && !activeSkillIds.includes(skillName)) {
      return NextResponse.json({ error: "Maximum 5 skills can be activated at once" }, { status: 400 });
    }

    // Add skill to activeSkillIds if not already present
    if (!activeSkillIds.includes(skillName)) {
      activeSkillIds.push(skillName);
    }

    await db.collection("workspaces").updateOne(
      { _id: new mongoose.Types.ObjectId(workspaceId), "agents.id": new mongoose.Types.ObjectId(agentId) },
      { $set: { "agents.$.activeSkillIds": activeSkillIds } }
    );

    return NextResponse.json({ activeSkillIds, message: "Skill activated" });
  } catch (err: any) {
    console.error("Failed to activate skill:", err);
    return NextResponse.json({ error: err.message || "Failed to activate skill" }, { status: 500 });
  }
}

// DELETE: Deactivate a skill for an agent in the workspace
export async function DELETE(req: NextRequest) {
  const user: UserDocument | null = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Invalid authentication" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { workspaceId, agentId, skillName }: { workspaceId: string; agentId: string; skillName: string } = body;

    if (!workspaceId || !agentId || !skillName) {
      return NextResponse.json({ error: "workspaceId, agentId, and skillName are required" }, { status: 400 });
    }

    await connectMongo();
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB connection not established");

    // Find the workspace's agent entry
    const workspace = await db.collection("workspaces").findOne({ _id: new mongoose.Types.ObjectId(workspaceId) });
    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    // Find the agent entry within this workspace
    const workspaceAgent = workspace.agents?.find((a: any) => a.id.toString() === agentId);
    if (!workspaceAgent) {
      return NextResponse.json({ error: "Agent not found in this workspace" }, { status: 404 });
    }

    let activeSkillIds: string[] = workspaceAgent.activeSkillIds || [];
    const initialLength = activeSkillIds.length;
    activeSkillIds = activeSkillIds.filter((s) => s !== skillName);

    if (activeSkillIds.length === initialLength) {
      return NextResponse.json({ error: "Skill is not currently active" }, { status: 400 });
    }

    await db.collection("workspaces").updateOne(
      { _id: new mongoose.Types.ObjectId(workspaceId), "agents.id": new mongoose.Types.ObjectId(agentId) },
      { $set: { "agents.$.activeSkillIds": activeSkillIds } }
    );

    return NextResponse.json({ activeSkillIds, message: "Skill deactivated" });
  } catch (err: any) {
    console.error("Failed to deactivate skill:", err);
    return NextResponse.json({ error: err.message || "Failed to deactivate skill" }, { status: 500 });
  }
}