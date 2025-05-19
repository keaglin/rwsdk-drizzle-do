"use client";

import { Card, CardContent } from "@/app/components/ui/card";
import {
  TabContent,
  Tabs,
  TabsList,
  TabTrigger,
} from "@/app/components/ui/tabs";
import { AuthLayout } from "@/app/layouts/AuthLayout";
import { authClient } from "@/app/lib/auth-client";
import { Login } from "@/app/pages/user/Login";
import { Register } from "@/app/pages/user/Register";
import { useState } from "react";

// interface AuthFormProps {
//   defaultTab?: "login" | "register";
// }
const { useSession } = authClient;

// console.log("Card", Card);
// console.log("Input", Input);
// console.log("Tabs", Tabs);
// console.log("Button", Button);
// console.log("LockIcon", LockIcon);
// console.log("MailIcon", MailIcon);

export function AuthForm() {
  // console.log("requestInfo", ctx, params, request);
  const [activeTab, setActiveTab] = useState("login");
  // let activeTab = "login";
  // const setActiveTab = (tab: string) => {
  //   activeTab = tab;
  // };

  // Get session data
  const { data: session, isPending: isSessionLoading } = useSession();

  // If the user is already logged in, show a logged-in state
  if (session?.user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-bold mb-4">You're already logged in</h2>
          <p className="mb-4">
            Welcome back,{" "}
            <span className="font-medium">
              {session.user.name || session.user.email}
            </span>
            !
          </p>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => (window.location.href = "/")}
          >
            Go to dashboard
          </button>
        </CardContent>
      </Card>
    );
  }

  // Show login/signup forms
  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabTrigger value="login">Login</TabTrigger>
            <TabTrigger value="register">Create Account</TabTrigger>
          </TabsList>

          <TabContent value="login">
            <Login />
          </TabContent>

          <TabContent value="register">
            <Register />
          </TabContent>
        </Tabs>
      </div>
    </AuthLayout>
  );
}
