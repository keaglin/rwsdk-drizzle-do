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
import Login from "@/app/pages/user/Login";
import { Register } from "@/app/pages/user/Register";
import { useState } from "react";

const { useSession } = authClient;

// console.log("Card", Card);
// console.log("Input", Input);
// console.log("Tabs", Tabs);
// console.log("Button", Button);
// console.log("LockIcon", LockIcon);
// console.log("MailIcon", MailIcon);

export function AuthForm() {
  const [activeTab, setActiveTab] = useState("login");

  // Get session data
  const { data: session, isPending: isSessionLoading } = useSession();


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
            onClick={() => (window.location.href = "/user/profile")}
          >
            Go to dashboard
          </button>
        </CardContent>
      </Card>
    );
  }

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
