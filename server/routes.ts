import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { gpuService, GPUJobRequest } from "./gpuService";
import { initializeWebSocketService, getWebSocketService } from "./websocketService";
import { insertVideoJobSchema } from "@shared/schema";
import { randomUUID } from 'crypto';
import Stripe from "stripe";

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-08-27.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint (before auth middleware)
  app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || 'development'
    });
  });

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

  // Credit Packs Routes
  app.get('/api/credits/packs', async (req, res) => {
    try {
      const packs = await storage.getCreditPacks();
      res.json(packs);
    } catch (error) {
      console.error("Error fetching credit packs:", error);
      res.status(500).json({ message: "Failed to fetch credit packs" });
    }
  });

  // Create Stripe payment intent for credit pack purchase
  app.post('/api/credits/purchase', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { creditPackId } = req.body;

      if (!creditPackId) {
        return res.status(400).json({ message: "Credit pack ID is required" });
      }

      // Get credit pack details
      const creditPack = await storage.getCreditPack(creditPackId);
      if (!creditPack) {
        return res.status(404).json({ message: "Credit pack not found" });
      }

      // Create Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: creditPack.price, // Price is already in cents
        currency: "usd",
        metadata: {
          userId,
          creditPackId,
          credits: creditPack.credits.toString(),
          packName: creditPack.name,
        },
      });

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        creditPack: {
          name: creditPack.name,
          credits: creditPack.credits,
          price: creditPack.displayPrice,
        }
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Failed to create payment intent" });
    }
  });

  // Confirm credit pack purchase and add credits to user account
  app.post('/api/credits/confirm-purchase', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { paymentIntentId } = req.body;

      if (!paymentIntentId) {
        return res.status(400).json({ message: "Payment intent ID is required" });
      }

      // Retrieve payment intent from Stripe to verify payment
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status !== 'succeeded') {
        return res.status(400).json({ message: "Payment not completed" });
      }

      // Verify user owns this payment
      if (paymentIntent.metadata.userId !== userId) {
        return res.status(403).json({ message: "Unauthorized payment" });
      }

      const credits = parseInt(paymentIntent.metadata.credits);
      const packName = paymentIntent.metadata.packName;

      // Add credits to user account
      const updatedCredits = await storage.addCredits(
        userId, 
        credits, 
        `Purchased ${packName} (${credits} credits)`
      );

      res.json({
        message: "Credits added successfully",
        creditsAdded: credits,
        totalCredits: updatedCredits.totalCredits,
        remainingCredits: updatedCredits.totalCredits - updatedCredits.usedCredits,
        packName,
      });
    } catch (error) {
      console.error("Error confirming purchase:", error);
      res.status(500).json({ message: "Failed to confirm purchase" });
    }
  });

  // Credit configuration endpoint for cost estimation
  app.get('/api/credits/config', async (req, res) => {
    try {
      const creditConfig = [
        {
          service: "image-enhancement",
          baseCost: 2,
          resolutionMultipliers: {
            "720p": 1,
            "1080p": 1.5,
            "2K": 2,
            "4K": 3
          },
          sizeMultipliers: {
            "square": 1,
            "portrait": 1.2,
            "landscape": 1.2
          }
        },
        {
          service: "text-to-image",
          baseCost: 3,
          resolutionMultipliers: {
            "512x512": 1,
            "1024x1024": 1.5,
            "2048x2048": 2.5
          },
          sizeMultipliers: {
            "square": 1,
            "portrait": 1.3,
            "landscape": 1.3
          }
        },
        {
          service: "text-to-video",
          baseCost: 8,
          resolutionMultipliers: {
            "720p": 1,
            "1080p": 1.8,
            "2K": 3,
            "4K": 5
          },
          durationMultipliers: {
            "short": 1,
            "medium": 2,
            "long": 3.5
          }
        },
        {
          service: "image-to-video",
          baseCost: 6,
          resolutionMultipliers: {
            "720p": 1,
            "1080p": 1.6,
            "2K": 2.8,
            "4K": 4.5
          },
          durationMultipliers: {
            "short": 1,
            "medium": 1.8,
            "long": 3
          }
        }
      ];
      
      res.json(creditConfig);
    } catch (error) {
      console.error('Error fetching credit config:', error);
      res.status(500).json({ message: 'Failed to fetch credit configuration' });
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

  // User Preferences Routes
  app.get('/api/preferences', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const preferences = await storage.getUserPreferences(userId);
      
      // If no preferences exist, create default ones
      if (!preferences) {
        const defaultPrefs = await storage.createUserPreferences({
          userId,
          styleMemoryEnabled: 0,
          defaultResolution: "1024x1024",
          defaultAspectRatio: "square",
          watermarkEnabled: 1,
          realTimePreviewEnabled: 1,
          showCopilot: 1,
          copilotLevel: "beginner",
        });
        return res.json(defaultPrefs);
      }
      
      res.json(preferences);
    } catch (error) {
      console.error("Error fetching user preferences:", error);
      res.status(500).json({ message: "Failed to fetch user preferences" });
    }
  });

  app.put('/api/preferences', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const updates = req.body;
      
      const preferences = await storage.upsertUserPreferences(userId, updates);
      res.json(preferences);
    } catch (error) {
      console.error("Error updating user preferences:", error);
      res.status(500).json({ message: "Failed to update user preferences" });
    }
  });

  app.post('/api/preferences/reset', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      const defaultPrefs = {
        styleMemoryEnabled: 0,
        savedBrandColors: null,
        preferredStyles: null,
        defaultResolution: "1024x1024",
        defaultAspectRatio: "square",
        watermarkEnabled: 1,
        realTimePreviewEnabled: 1,
        imageEnhancePrefs: null,
        textToImagePrefs: null,
        textToVideoPrefs: null,
        imageToVideoPrefs: null,
        showCopilot: 1,
        copilotLevel: "beginner",
      };
      
      const preferences = await storage.upsertUserPreferences(userId, defaultPrefs);
      res.json(preferences);
    } catch (error) {
      console.error("Error resetting user preferences:", error);
      res.status(500).json({ message: "Failed to reset user preferences" });
    }
  });

  // User subscription outputs endpoint
  // Subscription activation endpoint
  app.post('/api/subscription/activate', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { planType, planId, service, billingPeriod } = req.body;

      if (!planType || !planId || !service) {
        return res.status(400).json({ error: "Missing required fields: planType, planId, service" });
      }

      // Validate service type
      const validServices = ['image', 'ai', 'video', 'imageVideo'];
      if (!validServices.includes(service)) {
        return res.status(400).json({ error: "Invalid service type" });
      }

      // Validate plan type  
      const validPlanTypes = ['payg', 'basic', 'growth', 'business'];
      if (!validPlanTypes.includes(planType)) {
        return res.status(400).json({ error: "Invalid plan type" });
      }

      // Activate the subscription
      const subscription = await storage.activateSubscription({
        userId,
        planType,
        planId,
        service,
        billingPeriod: billingPeriod || 'monthly',
      });

      console.log(`Subscription activated for user ${userId}: ${planType} plan for ${service} service`);

      res.json({
        message: "Subscription activated successfully",
        subscription: {
          id: subscription.id,
          planType: subscription.planType,
          service: subscription.service,
          status: subscription.status,
          activatedAt: subscription.activatedAt,
          expiresAt: subscription.expiresAt,
        }
      });
    } catch (error) {
      console.error("Error activating subscription:", error);
      res.status(500).json({ error: "Failed to activate subscription" });
    }
  });

  app.get('/api/subscription/outputs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const outputs = await storage.getUserSubscriptionOutputs(userId);
      res.json(outputs);
    } catch (error) {
      console.error("Error fetching subscription outputs:", error);
      res.status(500).json({ error: "Failed to fetch subscription outputs" });
    }
  });

  // Get user's active subscription
  app.get('/api/subscription/current', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { service } = req.query;
      
      const subscription = await storage.getUserSubscription(userId, service as string);
      res.json(subscription);
    } catch (error) {
      console.error("Error fetching current subscription:", error);
      res.status(500).json({ error: "Failed to fetch current subscription" });
    }
  });

  // Stripe subscription management endpoints
  
  // Price mapping for Stripe products (you'll need to set these up in your Stripe dashboard)
  const stripePriceMapping = {
    'basic-monthly': process.env.STRIPE_BASIC_MONTHLY_PRICE_ID || 'price_basic_monthly_placeholder',
    'basic-yearly': process.env.STRIPE_BASIC_YEARLY_PRICE_ID || 'price_basic_yearly_placeholder',
    'growth-monthly': process.env.STRIPE_GROWTH_MONTHLY_PRICE_ID || 'price_growth_monthly_placeholder',
    'growth-yearly': process.env.STRIPE_GROWTH_YEARLY_PRICE_ID || 'price_growth_yearly_placeholder',
    'business-monthly': process.env.STRIPE_BUSINESS_MONTHLY_PRICE_ID || 'price_business_monthly_placeholder',
    'business-yearly': process.env.STRIPE_BUSINESS_YEARLY_PRICE_ID || 'price_business_yearly_placeholder',
  };

  // Create Stripe subscription
  app.post('/api/subscription/create-stripe-subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { planType, billingPeriod = 'monthly', service } = req.body;

      if (!planType || !service) {
        return res.status(400).json({ error: "Missing required fields: planType, service" });
      }

      // Validate plan type (no payg for subscriptions)
      const validPlanTypes = ['basic', 'growth', 'business'];
      if (!validPlanTypes.includes(planType)) {
        return res.status(400).json({ error: "Invalid plan type for subscription" });
      }

      // Get user information
      const user = await storage.getUser(userId);
      if (!user || !user.email) {
        return res.status(400).json({ error: "User not found or email missing" });
      }

      // Create or get Stripe customer
      let stripeCustomerId = user.stripeCustomerId;
      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
          metadata: {
            userId: userId,
          },
        });
        stripeCustomerId = customer.id;
        // Update user with Stripe customer ID
        await storage.updateUserStripeCustomer(userId, stripeCustomerId);
      }

      // Get the correct price ID
      const priceKey = `${planType}-${billingPeriod}` as keyof typeof stripePriceMapping;
      const priceId = stripePriceMapping[priceKey];

      if (!priceId || priceId.includes('placeholder')) {
        return res.status(400).json({ 
          error: "Stripe price ID not configured. Please set up your Stripe products and price IDs in environment variables.",
          requiredEnvVar: `STRIPE_${planType.toUpperCase()}_${billingPeriod.toUpperCase()}_PRICE_ID`
        });
      }

      // Create Stripe subscription
      const subscription = await stripe.subscriptions.create({
        customer: stripeCustomerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          userId: userId,
          planType: planType,
          service: service,
          billingPeriod: billingPeriod,
        },
      });

      // Update user with Stripe subscription ID
      await storage.updateUserStripeSubscription(userId, subscription.id);

      const invoice = subscription.latest_invoice as any;
      const paymentIntent = invoice.payment_intent;

      res.json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
        status: subscription.status,
      });

    } catch (error: any) {
      console.error("Error creating Stripe subscription:", error);
      res.status(500).json({ error: "Failed to create subscription: " + error.message });
    }
  });

  // Confirm subscription payment and activate
  app.post('/api/subscription/confirm-stripe-subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { subscriptionId } = req.body;

      if (!subscriptionId) {
        return res.status(400).json({ error: "Subscription ID is required" });
      }

      // Retrieve subscription from Stripe
      const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);

      if (stripeSubscription.status !== 'active') {
        return res.status(400).json({ error: "Subscription is not active yet" });
      }

      // Verify this subscription belongs to the user
      const user = await storage.getUser(userId);
      if (user?.stripeSubscriptionId !== subscriptionId) {
        return res.status(403).json({ error: "Unauthorized subscription" });
      }

      const metadata = stripeSubscription.metadata;
      
      // Activate the subscription in our database
      const subscription = await storage.activateSubscription({
        userId,
        planType: metadata.planType,
        planId: `${metadata.planType}-${metadata.service}`,
        service: metadata.service,
        billingPeriod: metadata.billingPeriod || 'monthly',
      });

      console.log(`Stripe subscription activated for user ${userId}: ${metadata.planType} plan for ${metadata.service} service`);

      res.json({
        message: "Subscription activated successfully",
        subscription: {
          id: subscription.id,
          stripeSubscriptionId: stripeSubscription.id,
          planType: subscription.planType,
          service: subscription.service,
          status: subscription.status,
          activatedAt: subscription.activatedAt,
          expiresAt: subscription.expiresAt,
        }
      });

    } catch (error: any) {
      console.error("Error confirming Stripe subscription:", error);
      res.status(500).json({ error: "Failed to confirm subscription: " + error.message });
    }
  });

  // Cancel Stripe subscription
  app.post('/api/subscription/cancel-stripe-subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { service } = req.body;

      const user = await storage.getUser(userId);
      if (!user?.stripeSubscriptionId) {
        return res.status(400).json({ error: "No active Stripe subscription found" });
      }

      // Cancel the subscription in Stripe (at period end)
      const stripeSubscription = await stripe.subscriptions.update(user.stripeSubscriptionId, {
        cancel_at_period_end: true,
      });

      // Update our database
      await storage.cancelSubscription(userId, service);

      res.json({
        message: "Subscription will be cancelled at the end of the current billing period",
        cancelAt: new Date((stripeSubscription as any).current_period_end * 1000),
      });

    } catch (error: any) {
      console.error("Error cancelling Stripe subscription:", error);
      res.status(500).json({ error: "Failed to cancel subscription: " + error.message });
    }
  });

  // Stripe webhook endpoint for handling subscription events
  app.post('/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!endpointSecret) {
      console.error('STRIPE_WEBHOOK_SECRET not configured');
      return res.status(400).send('Webhook secret not configured');
    }

    let event;

    try {
      const sig = req.headers['stripe-signature'];
      event = stripe.webhooks.constructEvent(req.body, sig as string, endpointSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      // Handle different Stripe events
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          const subscription = event.data.object;
          await handleSubscriptionUpdate(subscription);
          break;

        case 'customer.subscription.deleted':
          const deletedSubscription = event.data.object;
          await handleSubscriptionCancellation(deletedSubscription);
          break;

        case 'invoice.payment_succeeded':
          const invoice = event.data.object;
          await handlePaymentSucceeded(invoice);
          break;

        case 'invoice.payment_failed':
          const failedInvoice = event.data.object;
          await handlePaymentFailed(failedInvoice);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).send('Webhook processing failed');
    }
  });

  // Helper functions for webhook handling
  async function handleSubscriptionUpdate(subscription: any) {
    const userId = subscription.metadata.userId;
    if (!userId) {
      console.error('No userId in subscription metadata');
      return;
    }

    try {
      // Update user with subscription ID if not already set
      await storage.updateUserStripeSubscription(userId, subscription.id);

      if (subscription.status === 'active') {
        // Activate subscription in our database
        const metadata = subscription.metadata;
        await storage.activateSubscription({
          userId,
          planType: metadata.planType,
          planId: `${metadata.planType}-${metadata.service}`,
          service: metadata.service,
          billingPeriod: metadata.billingPeriod || 'monthly',
        });
        console.log(`Subscription activated via webhook for user ${userId}`);
      } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
        // Cancel subscription in our database
        await storage.cancelSubscription(userId, subscription.metadata.service);
        console.log(`Subscription cancelled via webhook for user ${userId}`);
      }
    } catch (error) {
      console.error('Error handling subscription update:', error);
    }
  }

  async function handleSubscriptionCancellation(subscription: any) {
    const userId = subscription.metadata.userId;
    if (!userId) {
      console.error('No userId in subscription metadata');
      return;
    }

    try {
      await storage.cancelSubscription(userId, subscription.metadata.service);
      console.log(`Subscription cancelled via webhook for user ${userId}`);
    } catch (error) {
      console.error('Error handling subscription cancellation:', error);
    }
  }

  async function handlePaymentSucceeded(invoice: any) {
    // Handle successful payment - could be used for logging or notifications
    console.log(`Payment succeeded for invoice ${invoice.id}`);
  }

  async function handlePaymentFailed(invoice: any) {
    // Handle failed payment - could be used for notifications or grace period management
    console.log(`Payment failed for invoice ${invoice.id}`);
  }

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

  // Video Stitching Routes
  
  // Create a new video stitching project
  app.post('/api/video-stitching/create', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { name, clipIds, totalDuration } = req.body;
      
      // Validate input
      if (!name || !clipIds || !Array.isArray(clipIds) || clipIds.length < 2) {
        return res.status(400).json({ 
          message: "Invalid input: name and at least 2 clip IDs required" 
        });
      }
      
      // Get user's tier limits (simplified - in real app, get from user subscription)
      const maxDuration = 180; // 3 minutes for demo
      
      if (totalDuration > maxDuration) {
        return res.status(400).json({ 
          message: `Duration exceeds limit: ${totalDuration}s > ${maxDuration}s` 
        });
      }
      
      // Verify all clips belong to the user
      const clipFiles = await Promise.all(
        clipIds.map(id => storage.getFileById(id))
      );
      
      const invalidClips = clipFiles.some(clip => 
        !clip || clip.userId !== userId || clip.fileType !== 'video'
      );
      
      if (invalidClips) {
        return res.status(400).json({ 
          message: "Invalid or unauthorized clip IDs provided" 
        });
      }
      
      const project = await storage.createVideoStitchingProject({
        userId,
        name,
        clipIds,
        totalDuration,
        maxDuration,
        status: 'processing'
      });
      
      // For demo, simulate immediate completion
      // In real implementation, this would queue a background job
      setTimeout(async () => {
        try {
          // Simulate stitching process and create output file
          const scheduledDeletion = new Date();
          scheduledDeletion.setDate(scheduledDeletion.getDate() + 30); // Delete after 30 days

          const outputFile = await storage.createGeneratedFile({
            userId,
            service: 'video-stitching',
            fileType: 'video',
            fileName: `${name}_stitched.mp4`,
            fileUrl: `https://example.com/stitched/${project.id}.mp4`,
            fileSize: 15728640, // ~15MB
            originalPrompt: `Stitched video: ${name}`,
            processingDetails: JSON.stringify({
              clipCount: clipIds.length,
              totalDuration,
              stitchingMethod: 'ffmpeg'
            }),
            creditsUsed: Math.ceil(totalDuration / 10), // 1 credit per 10 seconds
            scheduledDeletion,
          });
          
          await storage.updateVideoStitchingProject(project.id, {
            status: 'completed',
            outputFileId: outputFile.id,
            progress: 100
          });
        } catch (error) {
          console.error("Error completing stitching project:", error);
          await storage.updateVideoStitchingProject(project.id, {
            status: 'failed',
            error: 'Failed to stitch video clips'
          });
        }
      }, 5000); // Complete after 5 seconds for demo
      
      res.json(project);
    } catch (error) {
      console.error("Error creating video stitching project:", error);
      res.status(500).json({ message: "Failed to create stitching project" });
    }
  });
  
  // Get user's video stitching projects
  app.get('/api/video-stitching/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const projects = await storage.getUserVideoStitchingProjects(userId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching stitching projects:", error);
      res.status(500).json({ message: "Failed to fetch stitching projects" });
    }
  });
  
  // Get a specific stitching project
  app.get('/api/video-stitching/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { id } = req.params;
      
      const project = await storage.getVideoStitchingProject(id);
      if (!project || project.userId !== userId) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      console.error("Error fetching stitching project:", error);
      res.status(500).json({ message: "Failed to fetch stitching project" });
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
