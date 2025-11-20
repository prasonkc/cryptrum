import { createAuthClient } from "better-auth/react";

const baseURL =
  process.env.NEXT_PUBLIC_APP_URL && process.env.NEXT_PUBLIC_APP_URL.trim() !== ""
    ? process.env.NEXT_PUBLIC_APP_URL
    : undefined;

export const authClient = createAuthClient({
  baseURL,
  basePath: "/api/auth",
});