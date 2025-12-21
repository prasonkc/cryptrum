import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { postId, userId, content } = await req.json();

    const comment = await prisma.comment.create({
      data: {
        postId,
        userId,
        content
      },
    });

    return NextResponse.json({ message: "success", comment: comment }, {status: 201});
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
