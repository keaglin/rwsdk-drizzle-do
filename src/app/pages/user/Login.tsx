"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { MailIcon, LockIcon } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { loginWithEmail } from "./functions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setIsPending(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message || "Login failed");
      } else {
        setSuccess("Login successful!");
      }
    } catch (err) {
      console.error(err);
    }
    // Create new FormData with the React state values
    // const newFormData = new FormData();
    // newFormData.append("email", email);
    // newFormData.append("password", password);
    
    // try {
    //   const result = await loginWithEmail(newFormData);
    //   if (result.success) {
    //     setSuccess(result.message ?? "Login successful!");
    //     // Redirect after successful login
    //     setTimeout(() => {
    //       window.location.href = "/";
    //     }, 1000);
    //   } else {
    //     setError(result.error ?? "Login failed");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   setError(err instanceof Error ? err.message : "Login failed");
    // } finally {
    //   setIsPending(false);
    // }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome back! Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent>
        {success && (
          <div className="mb-4 p-2 text-sm text-green-600 bg-green-50 rounded">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <MailIcon.render className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input.render
                type="email"
                value={email}
                onChange={(e) => {
                  console.log("Email changed", e.target.value);
                  setEmail(e.target.value);
                }}
                placeholder="Email"
                className="pl-10 w-full"
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <LockIcon.render className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input.render
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="pl-10 w-full"
              />
            </div>
          </div>

          <Button.render type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing in..." : "Sign in"}
          </Button.render>
        </form>
      </CardContent>

      {/* <CardFooter>
        <div className="text-sm text-slate-500 w-full text-center">
          Don't have an account?{" "}
          <a
            href="/user/auth/register"
            className="text-blue-600 hover:underline"
          >
            Create account
          </a>
        </div>
      </CardFooter> */}
    </Card>
  );
}
