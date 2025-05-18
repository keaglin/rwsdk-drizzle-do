// export const users = sqliteTable("User", {
//   id: text("id").primaryKey(),
//   username: text("username").notNull().unique(),
//   createdAt: integer("createdAt", { mode: "timestamp" }).notNull().defaultNow(),
// });

// export const credentials = sqliteTable("Credential", {
//   id: text("id").primaryKey(),
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id),
//   createdAt: integer("createdAt", { mode: "timestamp" }).notNull().defaultNow(),
//   credentialId: text("credentialId").notNull().unique(),
//   publicKey: blob("publicKey").notNull(),
//   counter: integer("counter").notNull().default(0),
// });
