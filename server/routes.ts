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
  app.get("/api/protected", isAuthenticated, async (req, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}
