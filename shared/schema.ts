import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table updated for Replit Auth compatibility
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  // Keep legacy fields for backward compatibility if needed
  username: text("username").unique(),
  password: text("password"),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;

// Credit pricing table - stores dynamic pricing for each service tier
export const creditPricing = pgTable("credit_pricing", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  service: varchar("service").notNull(), // 'image', 'text-to-image', 'text-to-video'
  tier: varchar("tier").notNull(), // '2x', '4x', '512px', '1k', '5s-480p', etc.
  credits: integer("credits").notNull(), // Credit cost for this tier
  displayName: varchar("display_name").notNull(), // Human-readable display name
  description: varchar("description"), // Optional description
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User credit balance and usage tracking
export const userCredits = pgTable("user_credits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  totalCredits: integer("total_credits").default(0).notNull(),
  usedCredits: integer("used_credits").default(0).notNull(),
  imageEnhanceUsed: integer("image_enhance_used").default(0).notNull(),
  textToImageUsed: integer("text_to_image_used").default(0).notNull(),
  textToVideoUsed: integer("text_to_video_used").default(0).notNull(),
  imageToVideoUsed: integer("image_to_video_used").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Credit usage history for tracking individual transactions
export const creditTransactions = pgTable("credit_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  service: varchar("service").notNull(), // 'image-enhance', 'text-to-image', 'text-to-video'
  tier: varchar("tier").notNull(), // '2x', '4x', '512px', '1k', '5s-480p', etc.
  creditsUsed: integer("credits_used").notNull(),
  description: varchar("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type CreditPricing = typeof creditPricing.$inferSelect;
export type InsertCreditPricing = typeof creditPricing.$inferInsert;
export type UserCredits = typeof userCredits.$inferSelect;
export type InsertUserCredits = typeof userCredits.$inferInsert;
export type CreditTransaction = typeof creditTransactions.$inferSelect;
export type InsertCreditTransaction = typeof creditTransactions.$inferInsert;

// Insert schemas
export const insertCreditPricingSchema = createInsertSchema(creditPricing).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertUserCreditsSchema = createInsertSchema(userCredits).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCreditTransactionSchema = createInsertSchema(creditTransactions).omit({
  id: true,
  createdAt: true,
});

// Video generation jobs table
export const videoJobs = pgTable("video_jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  type: varchar("type").notNull(), // 'text-to-video', 'image-to-video'
  status: varchar("status").default('queued').notNull(), // 'queued', 'processing', 'completed', 'failed'
  prompt: text("prompt"),
  imageUrl: varchar("image_url"),
  duration: integer("duration").default(5),
  resolution: varchar("resolution").default('720p'),
  style: varchar("style").default('cinematic'),
  aiStoryboard: integer("ai_storyboard").default(0), // 0 or 1 (boolean)
  realTimePreview: integer("real_time_preview").default(0), // 0 or 1 (boolean)
  creditsUsed: integer("credits_used").default(0),
  resultUrl: varchar("result_url"),
  storyboardFrames: text("storyboard_frames"), // JSON array of frame URLs
  progress: integer("progress").default(0),
  error: text("error"),
  vastJobId: varchar("vast_job_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// AI Concierge suggestions cache
export const aiSuggestions = pgTable("ai_suggestions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  context: text("context").notNull(), // Input that generated suggestions
  type: varchar("type").notNull(), // 'text-to-video', 'image-to-video'
  suggestions: text("suggestions").notNull(), // JSON array of suggestions
  usedCount: integer("used_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export type VideoJob = typeof videoJobs.$inferSelect;
export type InsertVideoJob = typeof videoJobs.$inferInsert;
export type AISuggestion = typeof aiSuggestions.$inferSelect;
export type InsertAISuggestion = typeof aiSuggestions.$inferInsert;

export const insertVideoJobSchema = createInsertSchema(videoJobs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAISuggestionSchema = createInsertSchema(aiSuggestions).omit({
  id: true,
  createdAt: true,
});
