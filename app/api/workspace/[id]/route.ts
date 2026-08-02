// /api/workspace/[id]

import connectMongo from "@/db/mongoose";
import { getUser } from "@/lib/hook/auth";
import { UserDocument } from "@/model/user";
import { Workspace, WorkspaceDocument } from "@/model/workspace";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectMongo();
    const { pathname } = new URL(req.url);
    const id = pathname.split('/')[pathname.split('/').length - 1]

    const user = await getUser();

    if (!user) {
        return NextResponse.json(
            { error: "Invalid authentication" },
            { status: 401 }
        );
    }

    // Admins can view any workspace, regular users can view their own or ones they're members of
    let workspace: WorkspaceDocument | null = null;
    if (user.role === "admin") {
        workspace = await Workspace.findOne({ _id: id });
    } else {
        workspace = await Workspace.findOne({
            _id: id,
            $or: [
                { ownerId: user._id },
                { "members.id": user._id }
            ]
        });
    }

    if (!workspace) {
        return NextResponse.json(
            { error: "Workspace not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(workspace);
}

export async function DELETE(req: NextRequest) {
    await connectMongo();
    const { pathname } = new URL(req.url);
    const id = pathname.split('/')[pathname.split('/').length - 1]

    const user = await getUser();

    if (!user) {
        return NextResponse.json(
            { error: "Invalid authentication" },
            { status: 401 }
        );
    }

    if (user.role === "admin") {
        const workspace = await Workspace.findOneAndDelete({
            _id: id
        });

        if (!workspace) {
            return NextResponse.json(
                { error: "Workspace not found" },
                { status: 404 }
            );
        }
    } else {
        const workspace = await Workspace.findOneAndDelete({
            _id: id,
            ownerId: user._id,
        });

        if (!workspace) {
            return NextResponse.json(
                { error: "Workspace not found" },
                { status: 404 }
            );
        }
    }

    return NextResponse.json({
        success: true,
    });
}

export async function PATCH(req: NextRequest) {
    try {
        await connectMongo();
        const { pathname } = new URL(req.url);
        const id = pathname.split('/')[pathname.split('/').length - 1]
        const user: UserDocument | null = await getUser();
        console.log(id)
        if (!user) {
            return NextResponse.json(
                { error: "Invalid authentication" },
                { status: 401 }
            );
        }

        const data = await req.json();
        console.log(user)
        // Admins can modify any workspace, regular users can only modify their own
        let workspace: WorkspaceDocument | null = null;
        if (user.role === "admin") {
            workspace = await Workspace.findById(id)
        } else {
            workspace = await Workspace.findOne({
                _id: id,
                ownerId: user._id,
            });
        }

        console.log(workspace)

        if (!workspace) {
            return NextResponse.json(
                { error: "Workspace not found" },
                { status: 404 }
            );
        }

        // Update only allowed fields
        if (typeof data.name === "string") {
            workspace.name = data.name.trim();
        }

        if (data.plan) {
            workspace.plan = data.plan;
        }

        if (data.config) {
            workspace.config = {
                ...workspace.config,
                ...data.config,
            };
        }

        if (data.agents) {
            const agentIndex = workspace.agents.findIndex(
                (a) => a.id.toString() === data.agents.id.toString()
            );

            if (data.agents.status) {
                // Add if not already present
                if (agentIndex === -1) {
                    workspace.agents.push({
                        id: data.agents.id,
                        status: true,
                    });
                } else {
                    workspace.agents[agentIndex].status = true;
                }
            } else {
                // Remove if present
                if (agentIndex !== -1) {
                    workspace.agents.splice(agentIndex, 1);
                }
            }
        }

        if (data.mongodb) {
            workspace.mongodb = data.mongodb;
        }

        await workspace.save();

        return NextResponse.json(workspace);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}