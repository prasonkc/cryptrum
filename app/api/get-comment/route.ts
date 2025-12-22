import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const comments = await prisma.comment.findMany({

    });
    return NextResponse.json(comments);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
