import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Agent from "@/models/Agent";

const AgentUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50).trim().optional(),
  description: z.string().max(500, "Description must be under 500 characters").optional().or(z.literal("")),
  type: z.enum(["assistant", "copilot", "custom"]).optional(),
  status: z.enum(["idle", "running", "paused", "failed"]).optional(),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const agent = await Agent.findById(id).populate("createdBy", "name email");
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Owner or Admin check
    if (session.user.role !== "admin" && agent.createdBy._id.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(agent);
  } catch (err) {
    console.error("[GET_AGENT_BY_ID]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const parsed = AgentUpdateSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Validation failed";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    await connectDB();

    const agent = await Agent.findById(id);
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Owner or Admin check
    if (session.user.role !== "admin" && agent.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update fields
    if (parsed.data.name !== undefined) agent.name = parsed.data.name;
    if (parsed.data.description !== undefined) agent.description = parsed.data.description;
    if (parsed.data.type !== undefined) agent.type = parsed.data.type;
    if (parsed.data.status !== undefined) agent.status = parsed.data.status;

    await agent.save();
    const populated = await Agent.findById(agent._id).populate("createdBy", "name email");

    return NextResponse.json(populated);
  } catch (err) {
    console.error("[UPDATE_AGENT]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const agent = await Agent.findById(id);
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    // Owner or Admin check
    if (session.user.role !== "admin" && agent.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Agent.findByIdAndDelete(id);

    return NextResponse.json({ message: "Agent deleted successfully" });
  } catch (err) {
    console.error("[DELETE_AGENT]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
