import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { auth } from "@/app/lib/auth";
import { Home } from "@/app/pages/Home";
import { userRoutes } from "@/app/pages/user/routes";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { prefix, render, route } from "rwsdk/router";
import { defineApp, ErrorResponse } from "rwsdk/worker";
import { db, setupDb } from "./db";
import * as schema from "./db/auth-schema";
import type { User } from "./db/types";
import { Session } from "./session/durableObject";
import { sessions, setupSessionStore } from "./session/store";
export { SessionDurableObject } from "./session/durableObject";

export type AppContext = {
  session: Session | null;
  user: User | null;
};

export default defineApp([
  // Set common headers and setup middleware
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    // Setup database and session store
    await setupDb(env);
    setupSessionStore(env);

    // Try to load session from passkeys
    try {
      ctx.session = await sessions.load(request);
    } catch (error) {
      if (error instanceof ErrorResponse && error.code === 401) {
        await sessions.remove(request, headers);
      }
    }

    // Check for better-auth session
    try {
      const authSession = await auth.api.getSession({ headers });
      if (authSession?.user) {
        ctx.user = authSession.user;
      }
    } catch (error) {
      // Ignore auth errors
    }

    // If we have a passkey session but no user yet, try to load the user
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
          headers.set("Location", "/user/login");
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
