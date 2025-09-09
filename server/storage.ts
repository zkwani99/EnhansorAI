import {
  users,
  creditPricing,
  creditPacks,
  userCredits,
  creditTransactions,
  videoJobs,
  aiSuggestions,
  generatedFiles,
  videoStitchingProjects,
  userPreferences,
  userSubscriptions,
  userSubscriptionOutputs,
  type User,
  type UpsertUser,
  type InsertUser,
  type CreditPricing,
  type CreditPack,
  type UserCredits,
  type CreditTransaction,
  type InsertUserCredits,
  type InsertCreditTransaction,
  type VideoJob,
  type InsertVideoJob,
  type AISuggestion,
  type InsertAISuggestion,
  type GeneratedFile,
  type InsertGeneratedFile,
  type VideoStitchingProject,
  type InsertVideoStitchingProject,
  type UserPreferences,
  type InsertUserPreferences,
  type UserSubscription,
  type InsertUserSubscription,
  type UserSubscriptionOutputs,
  type InsertUserSubscriptionOutputs,
} from "@shared/schema";
import { db } from "./db";
import { eq, sql, and, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  // Legacy operations for backward compatibility
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Credit operations
  getCreditPricing(): Promise<CreditPricing[]>;
  getCreditPacks(): Promise<CreditPack[]>;
  getCreditPack(id: string): Promise<CreditPack | null>;
  getUserCredits(userId: string): Promise<UserCredits | null>;
  addCredits(userId: string, credits: number, description?: string): Promise<UserCredits>;
  useCredits(userId: string, service: string, tier: string, creditsUsed: number, description?: string): Promise<CreditTransaction>;
  initializeUserCredits(userId: string, initialCredits?: number): Promise<UserCredits>;
  
  // File management operations
  createGeneratedFile(file: InsertGeneratedFile): Promise<GeneratedFile>;
  getUserFiles(userId: string, service?: string): Promise<GeneratedFile[]>;
  getFileById(id: string): Promise<GeneratedFile | null>;
  updateFileDownloadCount(id: string): Promise<void>;
  deleteExpiredFiles(): Promise<number>;
  deleteFile(id: string): Promise<void>;
  
  // Video stitching operations
  createVideoStitchingProject(project: InsertVideoStitchingProject): Promise<VideoStitchingProject>;
  getUserVideoStitchingProjects(userId: string): Promise<VideoStitchingProject[]>;
  getVideoStitchingProject(id: string): Promise<VideoStitchingProject | null>;
  updateVideoStitchingProject(id: string, updates: Partial<VideoStitchingProject>): Promise<VideoStitchingProject>;
  
  // Subscription management operations
  getUserSubscription(userId: string, service?: string): Promise<UserSubscription | null>;
  activateSubscription(subscription: InsertUserSubscription): Promise<UserSubscription>;
  cancelSubscription(userId: string, service: string): Promise<void>;
  updateSubscriptionStatus(userId: string, service: string, status: string): Promise<UserSubscription>;

  // Subscription outputs operations
  getUserSubscriptionOutputs(userId: string): Promise<UserSubscriptionOutputs | null>;
  initializeUserSubscriptionOutputs(userId: string, planType: string): Promise<UserSubscriptionOutputs>;
  useSubscriptionOutput(userId: string, service: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Legacy operations for backward compatibility
  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!username) return undefined;
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Credit operations
  async getCreditPricing(): Promise<CreditPricing[]> {
    return await db.select().from(creditPricing);
  }

  async getCreditPacks(): Promise<CreditPack[]> {
    return await db.select().from(creditPacks).orderBy(creditPacks.sortOrder);
  }

  async getCreditPack(id: string): Promise<CreditPack | null> {
    const [pack] = await db.select().from(creditPacks).where(eq(creditPacks.id, id));
    return pack || null;
  }

  async getUserCredits(userId: string): Promise<UserCredits | null> {
    const [credits] = await db.select().from(userCredits).where(eq(userCredits.userId, userId));
    return credits || null;
  }

  async useCredits(userId: string, service: string, tier: string, creditsUsed: number, description?: string): Promise<CreditTransaction> {
    // Start transaction
    return await db.transaction(async (tx) => {
      // Get current user credits
      const [currentCredits] = await tx.select().from(userCredits).where(eq(userCredits.userId, userId));
      
      if (!currentCredits) {
        throw new Error("User credits not found");
      }

      const remainingCredits = currentCredits.totalCredits - currentCredits.usedCredits;
      if (remainingCredits < creditsUsed) {
        throw new Error("Insufficient credits");
      }

      // Update usage based on service type
      let serviceUpdate = {};
      switch (service) {
        case 'image-enhance':
          serviceUpdate = { imageEnhanceUsed: currentCredits.imageEnhanceUsed + creditsUsed };
          break;
        case 'text-to-image':
          serviceUpdate = { textToImageUsed: currentCredits.textToImageUsed + creditsUsed };
          break;
        case 'text-to-video':
          serviceUpdate = { textToVideoUsed: currentCredits.textToVideoUsed + creditsUsed };
          break;
        case 'image-to-video':
          serviceUpdate = { imageToVideoUsed: currentCredits.imageToVideoUsed + creditsUsed };
          break;
      }

      // Update user credits
      await tx
        .update(userCredits)
        .set({
          usedCredits: currentCredits.usedCredits + creditsUsed,
          ...serviceUpdate,
          updatedAt: new Date(),
        })
        .where(eq(userCredits.userId, userId));

      // Create transaction record
      const [transaction] = await tx
        .insert(creditTransactions)
        .values({
          userId,
          service,
          tier,
          creditsUsed,
          description,
        })
        .returning();

      return transaction;
    });
  }

  async addCredits(userId: string, credits: number, description?: string): Promise<UserCredits> {
    return await db.transaction(async (tx) => {
      // Get current user credits or create if not exists
      let [currentCredits] = await tx.select().from(userCredits).where(eq(userCredits.userId, userId));
      
      if (!currentCredits) {
        // Initialize user credits first
        currentCredits = await this.initializeUserCredits(userId, 0);
      }

      // Add credits to total
      const [updatedCredits] = await tx
        .update(userCredits)
        .set({
          totalCredits: currentCredits.totalCredits + credits,
          updatedAt: new Date(),
        })
        .where(eq(userCredits.userId, userId))
        .returning();

      // Create transaction record for credit purchase
      await tx
        .insert(creditTransactions)
        .values({
          userId,
          service: 'credit-purchase',
          tier: 'pack',
          creditsUsed: -credits, // Negative value indicates credits added
          description: description || `Added ${credits} credits`,
        });

      return updatedCredits;
    });
  }

  async initializeUserCredits(userId: string, initialCredits: number = 100): Promise<UserCredits> {
    const [credits] = await db
      .insert(userCredits)
      .values({
        userId,
        totalCredits: initialCredits,
        usedCredits: 0,
        imageEnhanceUsed: 0,
        textToImageUsed: 0,
        textToVideoUsed: 0,
        imageToVideoUsed: 0,
      })
      .onConflictDoNothing()
      .returning();

    if (credits) {
      return credits;
    }

    // If already exists, return existing
    const [existing] = await db.select().from(userCredits).where(eq(userCredits.userId, userId));
    return existing;
  }

  // Video Jobs Management
  async createVideoJob(jobData: InsertVideoJob): Promise<VideoJob> {
    const [job] = await db
      .insert(videoJobs)
      .values(jobData)
      .returning();
    return job;
  }

  async getVideoJob(jobId: string): Promise<VideoJob | null> {
    const [job] = await db
      .select()
      .from(videoJobs)
      .where(eq(videoJobs.id, jobId));
    return job || null;
  }

  async getUserVideoJobs(userId: string, limit: number = 10): Promise<VideoJob[]> {
    return await db
      .select()
      .from(videoJobs)
      .where(eq(videoJobs.userId, userId))
      .orderBy(desc(videoJobs.createdAt))
      .limit(limit);
  }

  async updateVideoJob(jobId: string, updates: Partial<VideoJob>): Promise<VideoJob> {
    const [job] = await db
      .update(videoJobs)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(videoJobs.id, jobId))
      .returning();
    return job;
  }

  // AI Suggestions Management
  async saveAISuggestions(suggestionData: InsertAISuggestion): Promise<AISuggestion> {
    const [suggestion] = await db
      .insert(aiSuggestions)
      .values(suggestionData)
      .returning();
    return suggestion;
  }

  async getAISuggestions(userId: string, context: string, type: string): Promise<AISuggestion | null> {
    const [suggestion] = await db
      .select()
      .from(aiSuggestions)
      .where(
        and(
          eq(aiSuggestions.userId, userId),
          eq(aiSuggestions.context, context),
          eq(aiSuggestions.type, type)
        )
      )
      .orderBy(desc(aiSuggestions.createdAt))
      .limit(1);
    return suggestion || null;
  }

  async incrementSuggestionUsage(suggestionId: string): Promise<void> {
    await db
      .update(aiSuggestions)
      .set({ 
        usedCount: sql`${aiSuggestions.usedCount} + 1`
      })
      .where(eq(aiSuggestions.id, suggestionId));
  }

  // File management operations
  async createGeneratedFile(fileData: InsertGeneratedFile): Promise<GeneratedFile> {
    // Calculate scheduled deletion date (30 days from now)
    const scheduledDeletion = new Date();
    scheduledDeletion.setDate(scheduledDeletion.getDate() + 30);

    const [file] = await db
      .insert(generatedFiles)
      .values({
        ...fileData,
        scheduledDeletion,
      })
      .returning();
    return file;
  }

  async getUserFiles(userId: string, service?: string): Promise<GeneratedFile[]> {
    const conditions = [eq(generatedFiles.userId, userId)];
    if (service) {
      conditions.push(eq(generatedFiles.service, service));
    }

    return await db
      .select()
      .from(generatedFiles)
      .where(and(...conditions))
      .orderBy(desc(generatedFiles.createdAt));
  }

  async getFileById(id: string): Promise<GeneratedFile | null> {
    const [file] = await db
      .select()
      .from(generatedFiles)
      .where(eq(generatedFiles.id, id));
    return file || null;
  }

  async updateFileDownloadCount(id: string): Promise<void> {
    await db
      .update(generatedFiles)
      .set({
        downloadCount: sql`${generatedFiles.downloadCount} + 1`,
        lastDownloaded: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(generatedFiles.id, id));
  }

  async deleteExpiredFiles(): Promise<number> {
    const now = new Date();
    const result = await db
      .delete(generatedFiles)
      .where(sql`${generatedFiles.scheduledDeletion} <= ${now}`);
    
    return result.rowCount || 0;
  }

  async deleteFile(id: string): Promise<void> {
    await db
      .delete(generatedFiles)
      .where(eq(generatedFiles.id, id));
  }

  // Video stitching operations
  async createVideoStitchingProject(project: InsertVideoStitchingProject): Promise<VideoStitchingProject> {
    const [result] = await db
      .insert(videoStitchingProjects)
      .values(project)
      .returning();
    return result;
  }

  async getUserVideoStitchingProjects(userId: string): Promise<VideoStitchingProject[]> {
    return await db
      .select()
      .from(videoStitchingProjects)
      .where(eq(videoStitchingProjects.userId, userId))
      .orderBy(desc(videoStitchingProjects.createdAt));
  }

  async getVideoStitchingProject(id: string): Promise<VideoStitchingProject | null> {
    const [project] = await db
      .select()
      .from(videoStitchingProjects)
      .where(eq(videoStitchingProjects.id, id));
    return project || null;
  }

  async updateVideoStitchingProject(id: string, updates: Partial<VideoStitchingProject>): Promise<VideoStitchingProject> {
    const [result] = await db
      .update(videoStitchingProjects)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(videoStitchingProjects.id, id))
      .returning();
    return result;
  }

  // User preferences operations
  async getUserPreferences(userId: string): Promise<UserPreferences | null> {
    const [preferences] = await db
      .select()
      .from(userPreferences)
      .where(eq(userPreferences.userId, userId));
    return preferences || null;
  }

  async createUserPreferences(prefsData: InsertUserPreferences): Promise<UserPreferences> {
    const [preferences] = await db
      .insert(userPreferences)
      .values(prefsData)
      .returning();
    return preferences;
  }

  async updateUserPreferences(userId: string, updates: Partial<UserPreferences>): Promise<UserPreferences> {
    const [result] = await db
      .update(userPreferences)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(userPreferences.userId, userId))
      .returning();
    return result;
  }

  async upsertUserPreferences(userId: string, prefsData: Partial<InsertUserPreferences>): Promise<UserPreferences> {
    const existing = await this.getUserPreferences(userId);
    
    if (existing) {
      return await this.updateUserPreferences(userId, prefsData);
    } else {
      return await this.createUserPreferences({
        userId,
        ...prefsData,
      } as InsertUserPreferences);
    }
  }

  // Subscription management operations
  async getUserSubscription(userId: string, service?: string): Promise<UserSubscription | null> {
    const whereConditions = [eq(userSubscriptions.userId, userId)];
    
    if (service) {
      whereConditions.push(eq(userSubscriptions.service, service));
    }
    
    const [subscription] = await db
      .select()
      .from(userSubscriptions)
      .where(whereConditions.length === 1 ? whereConditions[0] : and(...whereConditions));
      
    return subscription || null;
  }

  async activateSubscription(subscription: InsertUserSubscription): Promise<UserSubscription> {
    // Calculate expiration date (1 month from now for monthly, 1 year for yearly)
    const expiresAt = new Date();
    if (subscription.billingPeriod === 'yearly') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    // First, cancel any existing subscription for the same service
    await this.cancelSubscription(subscription.userId, subscription.service);

    // Create new subscription
    const [result] = await db
      .insert(userSubscriptions)
      .values({
        ...subscription,
        expiresAt,
        status: 'active',
      })
      .returning();

    // Initialize subscription outputs for the user
    await this.initializeUserSubscriptionOutputs(subscription.userId, subscription.planType);

    return result;
  }

  async cancelSubscription(userId: string, service: string): Promise<void> {
    await db
      .update(userSubscriptions)
      .set({
        status: 'cancelled',
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(userSubscriptions.userId, userId),
          eq(userSubscriptions.service, service),
          eq(userSubscriptions.status, 'active')
        )
      );
  }

  async updateSubscriptionStatus(userId: string, service: string, status: string): Promise<UserSubscription> {
    const [result] = await db
      .update(userSubscriptions)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(userSubscriptions.userId, userId),
          eq(userSubscriptions.service, service)
        )
      )
      .returning();

    if (!result) {
      throw new Error('Subscription not found');
    }

    return result;
  }

  // Subscription outputs operations
  async getUserSubscriptionOutputs(userId: string): Promise<UserSubscriptionOutputs | null> {
    const [outputs] = await db
      .select()
      .from(userSubscriptionOutputs)
      .where(eq(userSubscriptionOutputs.userId, userId));
    return outputs || null;
  }

  async initializeUserSubscriptionOutputs(userId: string, planType: string): Promise<UserSubscriptionOutputs> {
    // Define limits based on plan type
    let limits = {
      imageEnhanceLimit: 0,
      textToImageLimit: 0,
      textToVideoLimit: 0,
      imageToVideoLimit: 0,
    };

    switch (planType) {
      case 'basic':
        limits = {
          imageEnhanceLimit: 50,
          textToImageLimit: 100,
          textToVideoLimit: 20,
          imageToVideoLimit: 15,
        };
        break;
      case 'growth':
        limits = {
          imageEnhanceLimit: 200,
          textToImageLimit: 500,
          textToVideoLimit: 100,
          imageToVideoLimit: 75,
        };
        break;
      case 'business':
        limits = {
          imageEnhanceLimit: 1000,
          textToImageLimit: 2000,
          textToVideoLimit: 500,
          imageToVideoLimit: 300,
        };
        break;
    }

    const billingCycleEnd = new Date();
    billingCycleEnd.setMonth(billingCycleEnd.getMonth() + 1);

    const [result] = await db
      .insert(userSubscriptionOutputs)
      .values({
        userId,
        ...limits,
        billingCycleEnd,
      })
      .returning();
    return result;
  }

  async useSubscriptionOutput(userId: string, service: string): Promise<void> {
    const fieldMap: Record<string, string> = {
      'image-enhancement': 'imageEnhanceUsed',
      'text-to-image': 'textToImageUsed',
      'text-to-video': 'textToVideoUsed',
      'image-to-video': 'imageToVideoUsed',
    };

    const field = fieldMap[service];
    if (!field) {
      throw new Error(`Unknown service: ${service}`);
    }

    await db
      .update(userSubscriptionOutputs)
      .set({
        [field]: sql`${userSubscriptionOutputs[field as keyof typeof userSubscriptionOutputs]} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(userSubscriptionOutputs.userId, userId));
  }
}

export const storage = new DatabaseStorage();
