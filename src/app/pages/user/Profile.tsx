"use client";

import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { authClient } from "@/app/lib/auth-client";

const { useSession } = authClient;

export function Profile() {
  const { data: session, isPending, error } = useSession();
  
  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };
  
  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md text-center">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }
  
  if (error || !session?.user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md text-center">
          <h2 className="text-xl font-bold mb-4">Not logged in</h2>
          <p className="mb-4">You need to log in to view your profile.</p>
          <a 
            href="/login" 
            className="text-blue-600 hover:underline"
          >
            Go to login
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-500">Name</h3>
                <p>{session.user.name || "Not provided"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-500">Email</h3>
                <p>{session.user.email}</p>
                <div className="mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    session.user.emailVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {session.user.emailVerified ? "Verified" : "Not verified"}
                  </span>
                </div>
              </div>
              
              <div className="pt-4">
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-100 text-red-800 hover:bg-red-200"
                >
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}