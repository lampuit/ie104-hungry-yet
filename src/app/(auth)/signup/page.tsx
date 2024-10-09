"use client";

import { signUp } from "@/lib/auth-client";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onClick = async () => {
    await signUp.email({
      name,
      email,
      password,
    });
  };

  return (
    <div>
      <input
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={onClick}>Sign Up</button>
    </div>
  );
}
