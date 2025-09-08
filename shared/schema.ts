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
  // Plan and subscription information
  planType: varchar("plan_type").default("payg"), // 'payg', 'basic', 'growth', 'business'
  subscriptionStatus: varchar("subscription_status").default("active"), // 'active', 'expired', 'cancelled'
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

// Generated files table - tracks all user-generated content for auto-deletion and downloads
export const generatedFiles = pgTable("generated_files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  service: varchar("service").notNull(), // 'image-enhancement', 'text-to-image', 'text-to-video', 'image-to-video'
  fileType: varchar("file_type").notNull(), // 'image', 'video'
  fileName: varchar("file_name").notNull(),
  fileUrl: varchar("file_url").notNull(),
  fileSize: integer("file_size"), // File size in bytes
  originalPrompt: text("original_prompt"), // For AI-generated content
  processingDetails: text("processing_details"), // JSON with processing parameters
  creditsUsed: integer("credits_used").default(0),
  downloadCount: integer("download_count").default(0),
  lastDownloaded: timestamp("last_downloaded"),
  scheduledDeletion: timestamp("scheduled_deletion").notNull(), // Auto-delete date (30 days from creation)
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type GeneratedFile = typeof generatedFiles.$inferSelect;
export type InsertGeneratedFile = typeof generatedFiles.$inferInsert;

export const insertGeneratedFileSchema = createInsertSchema(generatedFiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Video stitching projects table
export const videoStitchingProjects = pgTable("video_stitching_projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  name: varchar("name").notNull(),
  clipIds: jsonb("clip_ids").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  totalDuration: integer("total_duration").notNull().default(0), // in seconds
  maxDuration: integer("max_duration").notNull().default(60), // max allowed duration based on user tier
  status: varchar("status").notNull().default("draft"), // draft, processing, completed, failed
  outputFileId: varchar("output_file_id"),
  progress: integer("progress").default(0), // 0-100
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type VideoStitchingProject = typeof videoStitchingProjects.$inferSelect;
export type InsertVideoStitchingProject = typeof videoStitchingProjects.$inferInsert;

export const insertVideoStitchingProjectSchema = createInsertSchema(videoStitchingProjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// User AI preferences and style memory table
export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull().unique(),
  
  // Style Memory settings for all services
  styleMemoryEnabled: integer("style_memory_enabled").default(0), // 0 or 1 (boolean)
  savedBrandColors: text("saved_brand_colors"), // JSON array of brand colors
  preferredStyles: text("preferred_styles"), // JSON object with preferred styles per service
  
  // General preferences
  defaultResolution: varchar("default_resolution").default("1024x1024"),
  defaultAspectRatio: varchar("default_aspect_ratio").default("square"),
  watermarkEnabled: integer("watermark_enabled").default(1), // 0 or 1 (boolean)
  realTimePreviewEnabled: integer("real_time_preview_enabled").default(1), // 0 or 1 (boolean)
  
  // Service-specific preferences
  imageEnhancePrefs: text("image_enhance_prefs"), // JSON object
  textToImagePrefs: text("text_to_image_prefs"), // JSON object
  textToVideoPrefs: text("text_to_video_prefs"), // JSON object
  imageToVideoPrefs: text("image_to_video_prefs"), // JSON object
  
  // AI Copilot settings
  showCopilot: integer("show_copilot").default(1), // 0 or 1 (boolean)
  copilotLevel: varchar("copilot_level").default("beginner"), // beginner, intermediate, advanced
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = typeof userPreferences.$inferInsert;

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// User subscription outputs table - tracks monthly usage for subscription plans
// User subscriptions table to track active subscription plans
export const userSubscriptions = pgTable("user_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  
  // Subscription plan details
  planType: varchar("plan_type").notNull(), // 'payg', 'basic', 'growth', 'business'
  planId: varchar("plan_id").notNull(), // specific plan identifier
  service: varchar("service").notNull(), // 'image', 'ai', 'video', 'imageVideo'
  
  // Billing details
  billingPeriod: varchar("billing_period").default("monthly"), // 'monthly' or 'yearly'
  status: varchar("status").default("active").notNull(), // 'active', 'cancelled', 'expired'
  
  // Timestamps
  activatedAt: timestamp("activated_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UserSubscription = typeof userSubscriptions.$inferSelect;
export type InsertUserSubscription = typeof userSubscriptions.$inferInsert;

export const insertUserSubscriptionSchema = createInsertSchema(userSubscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const userSubscriptionOutputs = pgTable("user_subscription_outputs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  
  // Monthly limits by service (reset each billing cycle)
  imageEnhanceLimit: integer("image_enhance_limit").default(0).notNull(),
  imageEnhanceUsed: integer("image_enhance_used").default(0).notNull(),
  
  textToImageLimit: integer("text_to_image_limit").default(0).notNull(),
  textToImageUsed: integer("text_to_image_used").default(0).notNull(),
  
  textToVideoLimit: integer("text_to_video_limit").default(0).notNull(),
  textToVideoUsed: integer("text_to_video_used").default(0).notNull(),
  
  imageToVideoLimit: integer("image_to_video_limit").default(0).notNull(),
  imageToVideoUsed: integer("image_to_video_used").default(0).notNull(),
  
  // Billing cycle tracking
  billingCycleStart: timestamp("billing_cycle_start").defaultNow(),
  billingCycleEnd: timestamp("billing_cycle_end"),
  lastReset: timestamp("last_reset"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UserSubscriptionOutputs = typeof userSubscriptionOutputs.$inferSelect;
export type InsertUserSubscriptionOutputs = typeof userSubscriptionOutputs.$inferInsert;

export const insertUserSubscriptionOutputsSchema = createInsertSchema(userSubscriptionOutputs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
