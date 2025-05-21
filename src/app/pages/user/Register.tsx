"use client";
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { authClient } from "@/app/lib/auth-client";
import { KeyIcon, MailIcon, UserIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { registerWithEmail } from "./functions";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setIsPending(true);

      const result = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/login?verified=true",
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setSuccess(
          "Registration successful! Please check your email to verify your account.",
        );
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsPending(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setError("");
    setSuccess("");
    setIsPending(true);
    
    console.log("formData", formData);
    
    // Create new FormData with the React state values
    const newFormData = new FormData();
    newFormData.append("name", name);
    newFormData.append("email", email);
    newFormData.append("password", password);
    
    try {
      const result = await registerWithEmail(newFormData);
      if (result.success) {
        setSuccess(result.message ?? "Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setError(result.error ?? "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Sign up for a new account</CardDescription>
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
              <UserIcon.render className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input.render
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="pl-10 w-full"
              />
            </div>
          </div>

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
              {/* <LockIcon className="absolute left-3 top-3 h-4 w-4 text-slate-500" /> */}
              <Input.render
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min 8 characters)"
                className="pl-10 w-full"
              />
            </div>
          </div>

          <Button.render type="submit" disabled={isPending} className="w-full">
            {isPending ? "Creating account..." : "Create Account"}
          </Button.render>
        </form>
      </CardContent>
    </Card>
  );
}