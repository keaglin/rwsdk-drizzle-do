import { createDrizzleClient } from "@/db";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";
import { defineScript } from "rwsdk/worker";

export default defineScript(async ({ env }) => {
  const db = createDrizzleClient(env.DB);

  await db.delete(user).where(eq(user.id, "1"));

  await db.insert(user).values([
    {
      id: "1",
      name: "testuser",
      email: "testuser@example.com",
      emailVerified: true,
    },
  ]);

  console.log("🌱 Finished seeding");
});
