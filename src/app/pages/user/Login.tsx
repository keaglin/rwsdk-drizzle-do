"use client";
import { useState, useTransition } from "react";
// import {
//   finishPasskeyLogin,
//   finishPasskeyRegistration,
//   startPasskeyLogin,
//   startPasskeyRegistration,
// } from "./functions";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { LockIcon, MailIcon } from "lucide-react";

// Access the actual renderable component from the .render property
// const ActualCardComponent = CardObject.render;

// console.log("Original CardObject received:", CardObject);
// console.log("ActualCardComponent to be rendered:", ActualCardComponent);
// console.log("Type of ActualCardComponent:", typeof ActualCardComponent);

export function Login() {
  // console.log("Type of Card in Login component:", typeof CardObject);
  // console.log("Imported Card value:", CardObject);

  // Ensure the component is a function before trying to render
  // if (typeof ActualCardComponent !== "function") {
  //   // You could render an error message or null
  //   console.error(
  //     "ActualCardComponent is not a function!",
  //     ActualCardComponent,
  //   );
  //   return <div>Error: Card component is not available.</div>;
  // }
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();

  // Email/password login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Check for URL parameters
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const verified = urlParams.get("verified");

  //   if (verified === "true") {
  //     setMessage("Email verification successful! You can now log in.");
  //   } else if (verified === "false") {
  //     setError(
  //       "Email verification failed. Please try again or contact support.",
  //     );
  //   }
  // }, []);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    // startTransition(async () => {
    //   try {
    //     await authClient.signIn.email({
    //       email,
    //       password,
    //     });
    //     window.location.href = "/"; // Redirect to home on success
    //   } catch (err) {
    //     console.error(err);
    //     setError(err instanceof Error ? err.message : "Login failed");
    //   }
    // });
  };

  // Passkey login
  // const passkeyLogin = async () => {
  //   setResult("");
  //   // 1. Get a challenge from the worker
  //   const options = await startPasskeyLogin();

  //   // 2. Ask the browser to sign the challenge
  //   const login = await startAuthentication({ optionsJSON: options });

  //   // 3. Give the signed challenge to the worker to finish the login process
  //   const success = await finishPasskeyLogin(login);

  //   if (!success) {
  //     setResult("Login failed");
  //   } else {
  //     setResult("Login successful!");
  //     setTimeout(() => {
  //       window.location.href = "/";
  //     }, 1000);
  //   }
  // };

  // const passkeyRegister = async () => {
  //   setResult("");
  //   if (!username) {
  //     setResult("Username is required for registration");
  //     return;
  //   }

  //   // 1. Get a challenge from the worker
  //   const options = await startPasskeyRegistration(username);

  //   // 2. Ask the browser to sign the challenge
  //   const registration = await startRegistration({ optionsJSON: options });

  //   // 3. Give the signed challenge to the worker to finish the registration process
  //   const success = await finishPasskeyRegistration(username, registration);

  //   if (!success) {
  //     setResult("Registration failed");
  //   } else {
  //     setResult("Registration successful!");
  //   }
  // };

  // const handlePerformPasskeyLogin = () => {
  //   startTransition(() => void passkeyLogin());
  // };

  // const handlePerformPasskeyRegister = () => {
  //   startTransition(() => void passkeyRegister());
  // };

  return (
    // <Card.render>Test</Card.render>
    <Card.render>
      <CardHeader.render>
        <CardTitle.render>Sign In</CardTitle.render>
        <CardDescription.render>
          Sign in with email or passkey
        </CardDescription.render>
        {message && (
          <div className="mt-2 text-center w-full text-green-500 text-sm bg-green-50 p-2 rounded">
            {message}
          </div>
        )}
      </CardHeader.render>
      <CardContent.render className="space-y-6">
        {/* Email/Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <MailIcon className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input.render
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <LockIcon className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              <Input.render
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="pl-10"
              />
            </div>
          </div>
          <Button.render
            type="submit"
            disabled={isPending}
            className="w-full"
            variant="default"
          >
            {isPending ? "Signing in..." : "Sign in with Email"}
          </Button.render>
          {error && (
            <div className="text-center w-full text-red-500 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500">
              Or continue with
            </span>
          </div>
        </div>
      </CardContent.render>

      <CardFooter.render className="flex flex-col items-center justify-center">
        <div className="text-sm text-slate-500">
          Don't have an account?&nbsp;
          <a href="/register" className="text-blue-600 hover:underline">
            Create account
          </a>
        </div>
      </CardFooter.render>
    </Card.render>
  );
}
