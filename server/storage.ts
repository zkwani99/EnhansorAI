import {
  users,
  creditPricing,
  userCredits,
  creditTransactions,
  type User,
  type UpsertUser,
  type InsertUser,
  type CreditPricing,
  type UserCredits,
  type CreditTransaction,
  type InsertUserCredits,
  type InsertCreditTransaction,
} from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

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
}

export const storage = new DatabaseStorage();
