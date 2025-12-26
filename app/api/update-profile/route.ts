import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name") as string | null;
    const imageFile = formData.get("image") as File | null;

    const updateData: { name?: string; image?: string | null } = {};
    
    if (name !== undefined && name !== null && name.trim() !== "") {
      updateData.name = name.trim();
    }

    let imageUrl: string | null = null;
    if (imageFile && imageFile.size > 0) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { error: "Invalid file type. Only images are allowed." },
          { status: 400 }
        );
      }

      const maxSize = 5 * 1024 * 1024; 
      if (imageFile.size > maxSize) {
        return NextResponse.json(
          { error: "File size too large. Maximum size is 5MB." },
          { status: 400 }
        );
      }

      const uploadsDir = join(process.cwd(), "public", "uploads", "profiles");
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileExtension = imageFile.name.split(".").pop() || "jpg";
      const fileName = `${session.user.id}-${Date.now()}.${fileExtension}`;
      const filePath = join(uploadsDir, fileName);

      await writeFile(filePath, buffer);

      imageUrl = `/uploads/profiles/${fileName}`;
      updateData.image = imageUrl;
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error updating profile:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Internal server error" },
      { status: 500 }
    );
  }
}

