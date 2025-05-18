import { InferSelectModel } from "drizzle-orm";
// import * as schema from "./schema";
import * as authSchema from "./auth-schema";

// Schema types
export type User = InferSelectModel<typeof authSchema.user>;
export type Session = InferSelectModel<typeof authSchema.session>;
export type Account = InferSelectModel<typeof authSchema.account>;
export type Verification = InferSelectModel<typeof authSchema.verification>;
