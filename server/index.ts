import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson: any, ...args: any[]) {
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

// Register routes
(async () => {
  const server = await registerRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Express error handler:", err);

    if (!res.headersSent) {
      res.status(status).json({ message });
    }

    if (process.env.NODE_ENV !== "production") {
      throw err;
    }
  });

  // Static serving (production only)
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    try {
      console.log("Setting up static file serving for production...");
      serveStatic(app);
      console.log("✅ Static file serving configured");
    } catch (error: any) {
      console.error("❌ Static file serving failed:", error.message);
    }
  }

  // Healthcheck route (for Railway)
  app.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      message: "Server is healthy",
      timestamp: new Date().toISOString(),
    });
  });

  // Root route
  app.get("/", (_req, res) => {
    res.json({
      message: "EnhansorAI API Server",
      status: "running",
      timestamp: new Date().toISOString(),
      note: "Static files not available - API only mode",
    });
  });

  // Fallback route
  app.get("*", (req, res) => {
    console.log(`404: ${req.method} ${req.path}`);
    res.status(404).json({
      error: "Not found",
      path: req.path,
      available: ["/health", "/api/*"],
    });
  });

  console.log("✅ Fallback routes configured");

  // Start server
  const port = parseInt(process.env.PORT || "5000", 10);

  try {
    server.listen({ port, host: "0.0.0.0", reusePort: true }, () => {
      console.log(`✅ Server listening on http://0.0.0.0:${port}`);
      console.log(`✅ Healthcheck available at http://0.0.0.0:${port}/health`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
})();
