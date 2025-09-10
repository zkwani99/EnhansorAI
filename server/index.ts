import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error('Express error handler:', err);
    
    if (!res.headersSent) {
      res.status(status).json({ message });
    }
    
    // Don't throw in production - this crashes the server
    if (process.env.NODE_ENV !== 'production') {
      throw err;
    }
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    try {
      console.log('Setting up static file serving for production...');
      serveStatic(app);
      console.log('✅ Static file serving configured');
    } catch (error: any) {
      console.error("❌ Static file serving failed:", error.message);
      console.error("Setting up fallback routes...");
      
      // Add fallback route for root path if static serving fails
      app.get('/', (req, res) => {
        res.json({ 
          message: 'EnhansorAI API Server', 
          status: 'running',
          timestamp: new Date().toISOString(),
          note: 'Static files not available - API only mode'
        });
      });
      
      app.get('*', (req, res) => {
        console.log(`404: ${req.method} ${req.path}`);
        res.status(404).json({ 
          error: 'Not found',
          path: req.path,
          available: ['/health', '/api/*']
        });
      });
      
      console.log('✅ Fallback routes configured');
    }
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Port from env: ${process.env.PORT}`);
  console.log(`Final port: ${port}`);
  console.log(`Starting server on ${port} with host 0.0.0.0`);
  
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
    console.log(`✅ Server successfully started and listening on http://0.0.0.0:${port}`);
    console.log(`✅ Health check available at http://0.0.0.0:${port}/health`);
    console.log(`🚀 Railway deployment should now be healthy!`);
  }).on('error', (err) => {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
  });
})();
