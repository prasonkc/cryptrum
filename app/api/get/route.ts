import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    });
    return NextResponse.json(posts);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
