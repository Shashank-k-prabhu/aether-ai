import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectDB();

    const users = await User.find({}, "name email role createdAt").sort({ createdAt: -1 });

    return NextResponse.json(users);
  } catch (err) {
    console.error("[GET_USERS]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
