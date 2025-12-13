import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { title, body, userId, plainText } = await req.json();

    const post = await prisma.post.create({
      data: {
        title,
        body,
        status: "pending",
        userId,
        plainText: plainText,
      },
    });

    return NextResponse.json({ message: "success", post: post }, {status: 201});
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
