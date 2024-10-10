"use client";

import { signIn } from "@/lib/auth-client";
import { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClick = async () => {
    await signIn.email({
      email,
      password,
    });
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onClick}>Sign In</button>
    </div>
  );
}
