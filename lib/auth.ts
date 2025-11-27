import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "./generated/prisma/client";
import { verifyRecaptcha } from "./verify-captcha";
import { sendEmail } from "./sendemail";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  async onRequest(request: Request) {
    const captchaToken = request.headers.get("x-captcha-token");

    const path = new URL(request.url).pathname;
    if (path.includes("/sign-in") || path.includes("/sign-up")) {
      if (captchaToken) {
        const isValid = await verifyRecaptcha(captchaToken);
        if (!isValid) {
          throw new Error("reCAPTCHA verification failed");
        }
      }
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 * 60, //Cache for every 5 hours
      strategy: "jwt"
    },
  },
  emailVerification: {
    enabled: true,
    sendVerificationEmail: async ({ user, url }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        html: `
          <p>Click to verify:</p>
          <a href="${url}">${url}</a>
        `,
      });
    },
  },
});
