"use client";

import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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
    <Card>
      <CardHeader>
        <h2>Sign In</h2>
      </CardHeader>
      <div className="p-4"> {/* Using div as CardBody */}
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
          Sign In
        </Button>
      </div>
    </Card>
  );
}
