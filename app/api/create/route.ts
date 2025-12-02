import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, body, userId } = await req.json();
    const prisma = new PrismaClient();

    await prisma.post.create({
      data: {
        title,
        body,
        status: "pending",
        userId,
      },
    });

    return NextResponse.json({ message: "success" }, {status: 201});
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
