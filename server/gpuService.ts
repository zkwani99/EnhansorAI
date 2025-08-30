// Using built-in fetch available in Node.js 18+

export interface GPUJobRequest {
  type: 'text-to-video' | 'image-to-video' | 'ai-storyboard' | 'ai-concierge';
  payload: {
    prompt?: string;
    image?: string;
    duration?: number;
    resolution?: string;
    style?: string;
    aiStoryboard?: boolean;
    realTimePreview?: boolean;
    [key: string]: any;
  };
  userId: string;
  jobId: string;
}

export interface GPUJobResponse {
  jobId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  result?: {
    videoUrl?: string;
    storyboardFrames?: string[];
    previewUrl?: string;
    suggestions?: string[];
  };
  progress?: number;
  error?: string;
  estimatedTime?: number;
}

export class GPUService {
  private vastApiKey: string;
  private vastBaseUrl: string;
  
  constructor() {
    this.vastApiKey = process.env.VAST_AI_API_KEY || '';
    this.vastBaseUrl = process.env.VAST_AI_BASE_URL || 'https://console.vast.ai/api/v0';
    
    if (!this.vastApiKey) {
      console.warn('VAST_AI_API_KEY not configured. GPU processing will be simulated.');
    }
  }

  private async makeVastRequest(endpoint: string, data: any): Promise<any> {
    if (!this.vastApiKey) {
      // Simulation mode for development
      return this.simulateGPUProcessing(data);
    }

    try {
      const response = await fetch(`${this.vastBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.vastApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Vast.ai API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('GPU Service Error:', error);
      throw new Error('Failed to connect to GPU processing service');
    }
  }

  private async simulateGPUProcessing(data: any): Promise<any> {
    // Development simulation - remove when connecting real GPUs
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      job_id: `sim_${Date.now()}`,
      status: 'queued',
      estimated_time: 45,
    };
  }

  async submitVideoJob(request: GPUJobRequest): Promise<GPUJobResponse> {
    const { type, payload, userId, jobId } = request;
    
    // Calculate credit cost based on job parameters
    const creditCost = this.calculateCreditCost(type, payload);
    
    const vastPayload = {
      job_type: type,
      user_id: userId,
      job_id: jobId,
      parameters: {
        ...payload,
        credit_cost: creditCost,
      },
      priority: 'normal',
    };

    const response = await this.makeVastRequest('/jobs', vastPayload);
    
    return {
      jobId: response.job_id || jobId,
      status: response.status || 'queued',
      estimatedTime: response.estimated_time || 60,
    };
  }

  async getJobStatus(jobId: string): Promise<GPUJobResponse> {
    if (!this.vastApiKey) {
      // Simulate completion after some time
      return {
        jobId,
        status: 'completed',
        result: {
          videoUrl: '/api/results/' + jobId,
          storyboardFrames: [
            '/api/storyboard/' + jobId + '/frame1.jpg',
            '/api/storyboard/' + jobId + '/frame2.jpg',
            '/api/storyboard/' + jobId + '/frame3.jpg',
          ],
        },
        progress: 100,
      };
    }

    try {
      const response = await fetch(`${this.vastBaseUrl}/jobs/${jobId}`, {
        headers: {
          'Authorization': `Bearer ${this.vastApiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get job status: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        jobId: data.job_id,
        status: data.status,
        result: data.result,
        progress: data.progress,
        error: data.error,
      };
    } catch (error) {
      console.error('Error getting job status:', error);
      throw error;
    }
  }

  async generateStoryboard(prompt: string, imageUrl?: string): Promise<string[]> {
    const storyboardRequest: GPUJobRequest = {
      type: 'ai-storyboard',
      payload: {
        prompt,
        image: imageUrl,
        frameCount: 6,
      },
      userId: 'system',
      jobId: `storyboard_${Date.now()}`,
    };

    const response = await this.submitVideoJob(storyboardRequest);
    
    // Poll for completion (in real implementation, use webhooks)
    let status = response;
    while (status.status === 'queued' || status.status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 2000));
      status = await this.getJobStatus(response.jobId);
    }

    return status.result?.storyboardFrames || [];
  }

  async getAIConciergesuggestions(context: string, type: 'text-to-video' | 'image-to-video'): Promise<string[]> {
    const conciergeRequest: GPUJobRequest = {
      type: 'ai-concierge',
      payload: {
        context,
        type,
        maxSuggestions: 5,
      },
      userId: 'system',
      jobId: `concierge_${Date.now()}`,
    };

    const response = await this.submitVideoJob(conciergeRequest);
    
    // Poll for completion
    let status = response;
    while (status.status === 'queued' || status.status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      status = await this.getJobStatus(response.jobId);
    }

    return status.result?.suggestions || [
      "Add cinematic camera movements",
      "Include professional lighting effects",
      "Try a different visual style",
      "Adjust the duration for better pacing",
      "Consider adding background music",
    ];
  }

  private calculateCreditCost(type: string, payload: any): number {
    // Base costs for different operations
    const baseCosts: Record<string, number> = {
      'text-to-video': 5,
      'image-to-video': 7,
      'ai-storyboard': 2,
      'ai-concierge': 1,
    };

    let cost = baseCosts[type] || 5;
    
    // Adjust cost based on parameters
    if (payload.resolution === '1080p') cost *= 1.5;
    if (payload.resolution === '4k') cost *= 2.5;
    if (payload.duration > 5) cost *= 1.3;
    if (payload.duration > 10) cost *= 2;
    
    return Math.ceil(cost);
  }
}

export const gpuService = new GPUService();