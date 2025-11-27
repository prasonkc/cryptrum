import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authClient } from "@/lib/auth-client";

export async function proxy(request: NextRequest) {
  const { data: session } = await authClient.getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
