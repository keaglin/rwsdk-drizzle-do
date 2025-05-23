import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { auth } from "@/app/lib/auth";
import { Home } from "@/app/pages/Home";
import { userRoutes } from "@/app/pages/user/routes";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { prefix, render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { createDrizzleClient } from "./db";
import * as schema from "./db/auth-schema";
import type { Session, User } from "better-auth";

export type AppContext = {
  session: Session | null;
  user: User | null;
};

export default defineApp([
  // Set common headers and setup middleware
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    // Setup database and session store
    const db = createDrizzleClient(env.DB);

    // Check for better-auth session
    try {
      const authSession = await auth.api.getSession({ headers: request.headers });
      console.log("authSession", authSession);
      if (authSession?.user) {
        ctx.user = authSession.user;
        ctx.session = authSession.session;
      }
    } catch (error) {
      console.log("Auth session error:", error);
    }

    // If we have a session but no user yet, try to load the user from db
    if (!ctx.user && ctx.session?.userId) {
      const users = await db
        .select()
        .from(schema.user)
        .where(eq(schema.user.id, ctx.session.userId))
        .limit(1);
      ctx.user = users[0] || null;
    }
  },

  // Application routes
  render(Document, [
    // Public routes
    route("/", [Home]),

    // Protected routes
    route("/protected", [
      // Middleware to check authentication
      ({ ctx, headers }) => {
        if (!ctx.user) {
          headers.set("Location", "/user/auth");
          return new Response(null, {
            status: 302,
            headers,
          });
        }
      },
      Home, // Protected home page
    ]),

    // User routes (login, register, profile, logout)
    prefix("/user", userRoutes),
  ]),

  // Better-auth API routes
  route("/api/auth/**", [({ request }) => auth.handler(request)]),
]);
