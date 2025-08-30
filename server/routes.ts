import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { gpuService, GPUJobRequest } from "./gpuService";
import { initializeWebSocketService, getWebSocketService } from "./websocketService";
import { insertVideoJobSchema } from "@shared/schema";
import { randomUUID } from 'crypto';

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

  // Video Generation Routes
  
  // Text-to-Video Generation
  app.post('/api/video/text-to-video', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { prompt, duration, resolution, style, aiStoryboard, realTimePreview } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
      }

      // Calculate credits needed
      const baseCredits = 5;
      let totalCredits = baseCredits;
      if (resolution === '1080p') totalCredits = Math.ceil(totalCredits * 1.5);
      if (resolution === '4k') totalCredits = Math.ceil(totalCredits * 2.5);
      if (duration > 5) totalCredits = Math.ceil(totalCredits * 1.3);
      if (aiStoryboard) totalCredits += 2;
      if (realTimePreview) totalCredits += 1;

      // Check user credits
      const userCreditsInfo = await storage.getUserCredits(userId);
      if (!userCreditsInfo || userCreditsInfo.totalCredits - userCreditsInfo.usedCredits < totalCredits) {
        return res.status(400).json({ 
          message: "Insufficient credits",
          required: totalCredits,
          available: userCreditsInfo ? userCreditsInfo.totalCredits - userCreditsInfo.usedCredits : 0
        });
      }

      // Create video job
      const jobId = randomUUID();
      const jobData = {
        id: jobId,
        userId,
        type: 'text-to-video',
        prompt,
        duration: duration || 5,
        resolution: resolution || '720p',
        style: style || 'cinematic',
        aiStoryboard: aiStoryboard ? 1 : 0,
        realTimePreview: realTimePreview ? 1 : 0,
        creditsUsed: totalCredits,
        status: 'queued',
      };

      const job = await storage.createVideoJob(jobData);

      // Submit to GPU service
      const gpuRequest: GPUJobRequest = {
        type: 'text-to-video',
        payload: {
          prompt,
          duration,
          resolution,
          style,
          aiStoryboard,
          realTimePreview,
        },
        userId,
        jobId,
      };

      const gpuResponse = await gpuService.submitVideoJob(gpuRequest);

      // Update job with GPU job ID
      await storage.updateVideoJob(jobId, { vastJobId: gpuResponse.jobId });

      // Deduct credits
      await storage.useCredits(userId, 'text-to-video', resolution || '720p', totalCredits, `Video generation: ${prompt.substring(0, 50)}...`);

      res.json({
        jobId,
        status: gpuResponse.status,
        estimatedTime: gpuResponse.estimatedTime,
        creditsUsed: totalCredits,
      });

    } catch (error) {
      console.error("Error creating text-to-video job:", error);
      res.status(500).json({ message: "Failed to create video generation job" });
    }
  });

  // Image-to-Video Generation
  app.post('/api/video/image-to-video', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { prompt, imageUrl, duration, resolution, style, aiStoryboard, realTimePreview } = req.body;
      
      if (!imageUrl) {
        return res.status(400).json({ message: "Image URL is required" });
      }

      // Calculate credits needed (image-to-video costs more)
      const baseCredits = 7;
      let totalCredits = baseCredits;
      if (resolution === '1080p') totalCredits = Math.ceil(totalCredits * 1.5);
      if (resolution === '4k') totalCredits = Math.ceil(totalCredits * 2.5);
      if (duration > 5) totalCredits = Math.ceil(totalCredits * 1.3);
      if (aiStoryboard) totalCredits += 2;
      if (realTimePreview) totalCredits += 1;

      // Check user credits
      const userCreditsInfo = await storage.getUserCredits(userId);
      if (!userCreditsInfo || userCreditsInfo.totalCredits - userCreditsInfo.usedCredits < totalCredits) {
        return res.status(400).json({ 
          message: "Insufficient credits",
          required: totalCredits,
          available: userCreditsInfo ? userCreditsInfo.totalCredits - userCreditsInfo.usedCredits : 0
        });
      }

      // Create video job
      const jobId = randomUUID();
      const jobData = {
        id: jobId,
        userId,
        type: 'image-to-video',
        prompt: prompt || '',
        imageUrl,
        duration: duration || 5,
        resolution: resolution || '720p',
        style: style || 'cinematic',
        aiStoryboard: aiStoryboard ? 1 : 0,
        realTimePreview: realTimePreview ? 1 : 0,
        creditsUsed: totalCredits,
        status: 'queued',
      };

      const job = await storage.createVideoJob(jobData);

      // Submit to GPU service
      const gpuRequest: GPUJobRequest = {
        type: 'image-to-video',
        payload: {
          prompt,
          image: imageUrl,
          duration,
          resolution,
          style,
          aiStoryboard,
          realTimePreview,
        },
        userId,
        jobId,
      };

      const gpuResponse = await gpuService.submitVideoJob(gpuRequest);

      // Update job with GPU job ID
      await storage.updateVideoJob(jobId, { vastJobId: gpuResponse.jobId });

      // Deduct credits
      await storage.useCredits(userId, 'image-to-video', resolution || '720p', totalCredits, `Image-to-video: ${prompt?.substring(0, 50) || 'Image animation'}`);

      res.json({
        jobId,
        status: gpuResponse.status,
        estimatedTime: gpuResponse.estimatedTime,
        creditsUsed: totalCredits,
      });

    } catch (error) {
      console.error("Error creating image-to-video job:", error);
      res.status(500).json({ message: "Failed to create video generation job" });
    }
  });

  // Get Job Status
  app.get('/api/video/jobs/:jobId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { jobId } = req.params;

      const job = await storage.getVideoJob(jobId);
      if (!job || job.userId !== userId) {
        return res.status(404).json({ message: "Job not found" });
      }

      // Get status from GPU service if still processing
      if (job.status === 'queued' || job.status === 'processing') {
        try {
          const gpuStatus = await gpuService.getJobStatus(job.vastJobId || jobId);
          
          // Update local job status
          if (gpuStatus.status !== job.status) {
            const updates: any = {
              status: gpuStatus.status,
              progress: gpuStatus.progress || job.progress,
            };

            if (gpuStatus.status === 'completed' && gpuStatus.result) {
              updates.resultUrl = gpuStatus.result.videoUrl;
              updates.storyboardFrames = JSON.stringify(gpuStatus.result.storyboardFrames || []);
              updates.completedAt = new Date();
            }

            if (gpuStatus.error) {
              updates.error = gpuStatus.error;
            }

            await storage.updateVideoJob(jobId, updates);
            Object.assign(job, updates);
          }
        } catch (error) {
          console.error("Error fetching GPU job status:", error);
        }
      }

      res.json({
        ...job,
        storyboardFrames: job.storyboardFrames ? JSON.parse(job.storyboardFrames) : [],
      });

    } catch (error) {
      console.error("Error fetching job status:", error);
      res.status(500).json({ message: "Failed to fetch job status" });
    }
  });

  // Get User's Video Jobs
  app.get('/api/video/jobs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const limit = parseInt(req.query.limit as string) || 10;

      const jobs = await storage.getUserVideoJobs(userId, limit);
      
      // Parse storyboard frames for each job
      const processedJobs = jobs.map(job => ({
        ...job,
        storyboardFrames: job.storyboardFrames ? JSON.parse(job.storyboardFrames) : [],
      }));

      res.json(processedJobs);

    } catch (error) {
      console.error("Error fetching user jobs:", error);
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  // AI Storyboard Generation
  app.post('/api/ai/storyboard', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { prompt, imageUrl } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
      }

      // Check credits (2 credits for storyboard)
      const creditsNeeded = 2;
      const userCreditsInfo = await storage.getUserCredits(userId);
      if (!userCreditsInfo || userCreditsInfo.totalCredits - userCreditsInfo.usedCredits < creditsNeeded) {
        return res.status(400).json({ 
          message: "Insufficient credits",
          required: creditsNeeded,
          available: userCreditsInfo ? userCreditsInfo.totalCredits - userCreditsInfo.usedCredits : 0
        });
      }

      // Generate storyboard
      const frames = await gpuService.generateStoryboard(prompt, imageUrl);
      
      // Deduct credits
      await storage.useCredits(userId, 'ai-storyboard', 'standard', creditsNeeded, `AI Storyboard: ${prompt.substring(0, 50)}...`);

      res.json({
        frames,
        creditsUsed: creditsNeeded,
      });

    } catch (error) {
      console.error("Error generating storyboard:", error);
      res.status(500).json({ message: "Failed to generate storyboard" });
    }
  });

  // AI Concierge Suggestions
  app.post('/api/ai/suggestions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { context, type } = req.body;
      
      if (!context || !type) {
        return res.status(400).json({ message: "Context and type are required" });
      }

      // Check for cached suggestions first
      const cached = await storage.getAISuggestions(userId, context, type);
      if (cached) {
        await storage.incrementSuggestionUsage(cached.id);
        return res.json({
          suggestions: JSON.parse(cached.suggestions),
          cached: true,
          creditsUsed: 0,
        });
      }

      // Check credits (1 credit for AI suggestions)
      const creditsNeeded = 1;
      const userCreditsInfo = await storage.getUserCredits(userId);
      if (!userCreditsInfo || userCreditsInfo.totalCredits - userCreditsInfo.usedCredits < creditsNeeded) {
        return res.status(400).json({ 
          message: "Insufficient credits",
          required: creditsNeeded,
          available: userCreditsInfo ? userCreditsInfo.totalCredits - userCreditsInfo.usedCredits : 0
        });
      }

      // Generate new suggestions
      const suggestions = await gpuService.getAIConciergesuggestions(context, type as 'text-to-video' | 'image-to-video');
      
      // Cache the suggestions
      await storage.saveAISuggestions({
        userId,
        context,
        type,
        suggestions: JSON.stringify(suggestions),
        usedCount: 1,
      });
      
      // Deduct credits
      await storage.useCredits(userId, 'ai-concierge', 'standard', creditsNeeded, `AI Suggestions: ${type}`);

      res.json({
        suggestions,
        cached: false,
        creditsUsed: creditsNeeded,
      });

    } catch (error) {
      console.error("Error generating suggestions:", error);
      res.status(500).json({ message: "Failed to generate suggestions" });
    }
  });

  // File Management Routes
  
  // Get user's generated files
  app.get('/api/files', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { service } = req.query;
      
      const files = await storage.getUserFiles(userId, service);
      res.json(files);
    } catch (error) {
      console.error("Error fetching user files:", error);
      res.status(500).json({ message: "Failed to fetch files" });
    }
  });

  // Download a specific file
  app.get('/api/files/:id/download', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      
      const file = await storage.getFileById(id);
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      
      // Check if user owns the file
      if (file.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      // Update download count
      await storage.updateFileDownloadCount(id);
      
      // Return file URL for frontend to handle download
      res.json({ 
        downloadUrl: file.fileUrl,
        fileName: file.fileName,
        fileType: file.fileType
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      res.status(500).json({ message: "Failed to download file" });
    }
  });

  // Create a new generated file record
  app.post('/api/files', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const fileData = {
        ...req.body,
        userId,
      };
      
      const file = await storage.createGeneratedFile(fileData);
      res.json(file);
    } catch (error) {
      console.error("Error creating file record:", error);
      res.status(500).json({ message: "Failed to create file record" });
    }
  });

  // Delete expired files (admin/cron job endpoint)
  app.post('/api/files/cleanup', async (req, res) => {
    try {
      const deletedCount = await storage.deleteExpiredFiles();
      res.json({ 
        message: `Cleaned up ${deletedCount} expired files`,
        deletedCount 
      });
    } catch (error) {
      console.error("Error cleaning up files:", error);
      res.status(500).json({ message: "Failed to cleanup files" });
    }
  });

  const httpServer = createServer(app);

  // Initialize WebSocket service
  const wsService = initializeWebSocketService(httpServer);

  // Start periodic job status checking for real-time updates
  setInterval(async () => {
    try {
      // This is a simplified version - in production, you'd track active jobs
      // and only check those that are still processing
    } catch (error) {
      console.error("Error in periodic job check:", error);
    }
  }, 10000); // Check every 10 seconds

  return httpServer;
}
