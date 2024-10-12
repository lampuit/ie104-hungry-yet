"use client";

import { signUp } from "@/lib/auth-client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Centering the card */}
      <Card className="p-6 w-full max-w-sm"> {/* Card with padding and max width */}
        <CardHeader>
          <h2 className="text-center">Sign Up</h2>
        </CardHeader>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />
          <Button onClick={onClick} color="primary">
            Sign Up
          </Button>
        </div>
      </Card>
    </div>
  );
}
