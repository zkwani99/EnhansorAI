import {
  users,
  creditPricing,
  userCredits,
  creditTransactions,
  videoJobs,
  aiSuggestions,
  generatedFiles,
  videoStitchingProjects,
  userPreferences,
  type User,
  type UpsertUser,
  type InsertUser,
  type CreditPricing,
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
  getUserCredits(userId: string): Promise<UserCredits | null>;
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
}

export const storage = new DatabaseStorage();
