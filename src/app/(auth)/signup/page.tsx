"use client";

import { useState, useCallback, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSignUp = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        const response = await signUp.email(formData);
        if (response.data == null) {
          throw new Error(response?.error?.message);
        }

        startTransition(() => {
          router.push("/dashboard");
        });
      } catch (error) {
        console.error("Sign up error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Sign up failed. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [formData, router],
  );

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== ""
    );
  }, [formData]);

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gray-100 transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-center text-2xl font-bold">Create an Account</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isLoading || isPending}
              aria-label="Full Name"
            />
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
              placeholder="Create Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading || isPending}
              aria-label="Create Password"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isPending || !isFormValid}
            >
              {isLoading || isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLoading ? "Signing Up..." : "Redirecting..."}
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0 text-blue-500 hover:underline"
              onClick={() => router.push("/signin")}
              disabled={isLoading || isPending}
            >
              Log In
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
