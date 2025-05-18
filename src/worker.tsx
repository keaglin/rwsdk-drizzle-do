import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import { userRoutes } from "@/app/pages/user/routes";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { prefix, render, route } from "rwsdk/router";
import { defineApp, ErrorResponse } from "rwsdk/worker";
import { db, setupDb } from "./db";
import * as schema from "./db/schema";
import type { User } from "./db/types";
import { auth } from "./lib/auth";
import { Session } from "./session/durableObject";
import { sessions, setupSessionStore } from "./session/store";
export { SessionDurableObject } from "./session/durableObject";

export type AppContext = {
  session: Session | null;
  user: User | null;
};

export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    await setupDb(env);
    setupSessionStore(env);

    try {
      ctx.session = await sessions.load(request);
    } catch (error) {
      if (error instanceof ErrorResponse && error.code === 401) {
        await sessions.remove(request, headers);
        headers.set("Location", "/user/login");

        return new Response(null, {
          status: 302,
          headers,
        });
      }

      throw error;
    }

    if (ctx.session?.userId) {
      const users = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, ctx.session.userId))
        .limit(1);
      ctx.user = users[0] || null;
    }
  },
  render(Document, [
    route("/", () => new Response("Hello, World!")),
    route("/protected", [
      ({ ctx }) => {
        if (!ctx.user) {
          return new Response(null, {
            status: 302,
            headers: { Location: "/user/login" },
          });
        }
      },
      Home,
    ]),
    prefix("/user", userRoutes),
  ]),
  route("/api/auth/**", [({ request }) => auth.handler(request)]),
]);
