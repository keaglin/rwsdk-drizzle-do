import { auth } from "@/app/lib/auth";
import { route } from "rwsdk/router";
import { AuthForm } from "./AuthForm";
import { Profile } from "./Profile";

export const userRoutes = [
  route("/auth", [AuthForm]),
  route("/profile", [Profile]),
  route("/logout", async function ({ request }) {
    const headers = new Headers();

    // Logout from both better-auth and passkey session
    await sessions.remove(request, headers);
    await auth.api.signOut({ headers });

    headers.set("Location", "/");

    return new Response(null, {
      status: 302,
      headers,
    });
  }),
];
