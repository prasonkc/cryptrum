"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function RequestResetPage() {
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });

    if (error) {
      console.log(error);
    } else {
      console.log("Reset email sent");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="example@mail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Send reset link</button>
    </form>
  );
}
