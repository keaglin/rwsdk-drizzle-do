import * as schema from "@/db/auth-schema";
import { drizzle } from "drizzle-orm/d1";

export let db: ReturnType<typeof createDbClient>;

export const createDbClient = (env: Env) => {
  return drizzle(env.DB, { schema });
};

export const setupDb = async (env: Env) => {
  db = createDbClient(env);
  // Perform a simple query to verify connection
  await db.select().from(schema.user).limit(1);
};
