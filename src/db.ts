import { drizzle } from "drizzle-orm/d1";
import * as schema from "./db/schema";

export let db: ReturnType<typeof createDbClient>;

export const createDbClient = (env: Env) => {
  return drizzle(env.DB, { schema });
};

export const setupDb = async (env: Env) => {
  db = createDbClient(env);
  // Perform a simple query to verify connection
  await db.select().from(schema.users).limit(1);
};
