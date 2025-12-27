import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function DELETE(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Check if the post exists and belongs to the user
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      select: { userId: true },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    if (post.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden: You can only delete your own posts" },
        { status: 403 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: parseInt(postId) },
    });

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error deleting post:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Internal server error" },
      { status: 500 }
    );
  }
}

