import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { title, body, userId } = await req.json();
    const prisma = new PrismaClient();

    const post = await prisma.post.create({
      data: {
        title,
        body,
        status: "pending",
        userId,
      },
    });

    return Response.json({ message: "success", post });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
