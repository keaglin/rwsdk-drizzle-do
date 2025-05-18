import { db, setupDb } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { defineScript } from "rwsdk/worker";

export default defineScript(async ({ env }) => {
  setupDb(env);

  await db.delete(users).where(eq(users.id, "1"));

  await db.insert(users).values([
    {
      id: "1",
      username: "testuser",
    },
  ]);

  console.log("🌱 Finished seeding");
});
