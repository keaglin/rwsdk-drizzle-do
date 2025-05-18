import "dotenv/config";
import { defineConfig, type Config } from "drizzle-kit";

const baseConfig: Config = {
  out: "./drizzle",
  schema: ["./src/db/schema.ts", "./src/db/auth-schema.ts"],
  dialect: "sqlite",
};

const localConfig = {
  ...baseConfig,
  // driver: 'd1-http',
  dbCredentials: {
    url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/da776eea6bd3b7c2d10705bc5e15ddb1d6d3ba55563b1e2b83bfa0eef61bd63b.sqlite",
    dbName: "rwsdk-drizzle-do",
    local: true,
  },
};

export default defineConfig(localConfig);
