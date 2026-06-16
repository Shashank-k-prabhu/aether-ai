import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Agent from "@/models/Agent";

const AgentCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50).trim(),
  description: z.string().max(500, "Description must be under 500 characters").optional().or(z.literal("")),
  type: z.enum(["assistant", "copilot", "custom"]),
  status: z.enum(["idle", "running", "paused", "failed"]).default("idle"),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const query = session.user.role === "admin" ? {} : { createdBy: session.user.id };
    const agents = await Agent.find(query)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(agents);
  } catch (err) {
    console.error("[GET_AGENTS]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = AgentCreateSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Validation failed";
      return NextResponse.json({ error: message }, { status: 400 });
    }

    await connectDB();

    const agent = await Agent.create({
      name: parsed.data.name,
      description: parsed.data.description || "",
      type: parsed.data.type,
      status: parsed.data.status,
      createdBy: session.user.id,
    });

    // Populate createdBy before returning
    const populated = await Agent.findById(agent._id).populate("createdBy", "name email");

    return NextResponse.json(populated, { status: 201 });
  } catch (err) {
    console.error("[CREATE_AGENT]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
