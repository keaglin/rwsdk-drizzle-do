import { Card } from "@/app/components/ui/card";
// import { authClient } from "@/app/lib/auth-client";
import { RequestInfo } from "rwsdk/worker";

// const { useSession } = authClient;
export function Home({ ctx }: RequestInfo) {
  // const { data: session, isPending, error, refetch } = useSession();

  // Optional: Use either client-side session or server-side ctx.user
  const user = ctx?.user;

  return (
    <div className="flex min-h-screen flex-col items-center pt-16 bg-slate-50 p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to My App</h1>
          <p className="text-lg text-slate-600">
            A secure application with better-auth and RWSDK
          </p>
        </div>

        <Card>
          <div className="p-8">
            <div className="text-center mb-6">
              {user ? (
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome, {user.name || user.email}!
                  </h2>
                  <p className="text-slate-600 mb-6">
                    You're currently logged in.
                  </p>

                  <div className="flex justify-center gap-4">
                    <a
                      href="/user/profile"
                      className="text-blue-600 hover:underline"
                    >
                      View Profile
                    </a>
                    <a
                      href="/user/logout"
                      className="text-red-600 hover:underline"
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-2">Hello, Guest!</h2>
                  <p className="text-slate-600 mb-6">
                    Sign in to access all features.
                  </p>

                  <div className="flex justify-center gap-4">
                    <a
                      href="/user/login"
                      className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800"
                    >
                      Sign In
                    </a>
                    <a
                      href="/user/register"
                      className="px-4 py-2 bg-white border border-slate-300 rounded hover:bg-slate-50"
                    >
                      Register
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">
              Secure Authentication
            </h3>
            <p className="text-slate-600">
              We use better-auth for email & password authentication with secure
              sessions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Fast Performance</h3>
            <p className="text-slate-600">
              Built with RWSDK for optimal speed and responsiveness.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-2">Modern UI</h3>
            <p className="text-slate-600">
              Clean design using shadcn/ui components and Tailwind CSS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
