"use client";

import { useState, useCallback, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSignIn = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const response = await signIn.email(formData);
        if (response.data == null) {
          throw new Error("Sign in failed. Please try again.");
        }
        startTransition(() => {
          router.push("/dashboard");
        });
      } catch (error) {
        console.error("Sign in error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Sign in failed. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [formData, router],
  );

  const isFormValid = useMemo(() => {
    return formData.email.trim() !== "" && formData.password.trim() !== "";
  }, [formData]);

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gray-100 transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-center text-2xl font-bold">Sign In</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading || isPending}
              aria-label="Email Address"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading || isPending}
              aria-label="Password"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isPending || !isFormValid}
            >
              {isLoading || isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLoading ? "Signing In..." : "Redirecting..."}
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Button
              variant="link"
              className="p-0 text-blue-500 hover:underline"
              onClick={() => router.push("/signup")}
              disabled={isLoading || isPending}
            >
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
}
