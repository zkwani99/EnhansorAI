import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Protected route example
  app.get("/api/protected", isAuthenticated, async (req: any, res) => {
    const userId = req.user?.claims?.sub;
    res.json({ 
      message: "Hello from the protected route!", 
      userId 
    });
  });

  // Service-specific routes for post-auth redirection
  app.get("/api/services/enhance", isAuthenticated, (req, res) => {
    res.json({ service: "enhance", message: "Welcome to Image Enhancement!" });
  });

  app.get("/api/services/generate", isAuthenticated, (req, res) => {
    res.json({ service: "generate", message: "Welcome to Text-to-Image Generation!" });
  });

  app.get("/api/services/video", isAuthenticated, (req, res) => {
    res.json({ service: "video", message: "Welcome to Text-to-Video Creation!" });
  });

  // Credit Pricing Routes
  app.get('/api/credits/pricing', async (req, res) => {
    try {
      const pricing = await storage.getCreditPricing();
      res.json(pricing);
    } catch (error) {
      console.error("Error fetching credit pricing:", error);
      res.status(500).json({ message: "Failed to fetch credit pricing" });
    }
  });

  // User Credits Routes  
  app.get('/api/credits/balance', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const credits = await storage.getUserCredits(userId);
      res.json(credits);
    } catch (error) {
      console.error("Error fetching user credits:", error);
      res.status(500).json({ message: "Failed to fetch user credits" });
    }
  });

  app.post('/api/credits/use', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { service, tier, creditsUsed, description } = req.body;
      
      const transaction = await storage.useCredits(userId, service, tier, creditsUsed, description);
      res.json(transaction);
    } catch (error) {
      console.error("Error using credits:", error);
      res.status(500).json({ message: "Failed to use credits" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
