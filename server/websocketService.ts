import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { gpuService, GPUJobResponse } from './gpuService';

export interface WebSocketMessage {
  type: 'subscribe' | 'unsubscribe' | 'progress_update' | 'preview_frame' | 'storyboard_update';
  jobId?: string;
  userId?: string;
  data?: any;
}

export class WebSocketService {
  private wss: WebSocketServer;
  private connections: Map<string, Set<WebSocket>> = new Map();
  private userConnections: Map<string, Set<WebSocket>> = new Map();

  constructor(server: Server) {
    this.wss = new WebSocketServer({ 
      server,
      path: '/ws'
    });

    this.wss.on('connection', this.handleConnection.bind(this));
    console.log('WebSocket server initialized on /ws');
  }

  private handleConnection(ws: WebSocket, request: any) {
    console.log('New WebSocket connection');

    ws.on('message', async (data: Buffer) => {
      try {
        const message: WebSocketMessage = JSON.parse(data.toString());
        await this.handleMessage(ws, message);
      } catch (error) {
        console.error('WebSocket message error:', error);
        ws.send(JSON.stringify({ 
          type: 'error', 
          message: 'Invalid message format' 
        }));
      }
    });

    ws.on('close', () => {
      this.removeConnection(ws);
    });
  }

  private async handleMessage(ws: WebSocket, message: WebSocketMessage) {
    const { type, jobId, userId } = message;

    switch (type) {
      case 'subscribe':
        if (jobId && userId) {
          this.addConnection(jobId, userId, ws);
          ws.send(JSON.stringify({ 
            type: 'subscribed', 
            jobId, 
            message: 'Subscribed to job updates' 
          }));
        }
        break;

      case 'unsubscribe':
        if (jobId) {
          this.removeConnection(ws, jobId);
        }
        break;

      default:
        ws.send(JSON.stringify({ 
          type: 'error', 
          message: 'Unknown message type' 
        }));
    }
  }

  private addConnection(jobId: string, userId: string, ws: WebSocket) {
    // Add to job-specific connections
    if (!this.connections.has(jobId)) {
      this.connections.set(jobId, new Set());
    }
    this.connections.get(jobId)!.add(ws);

    // Add to user-specific connections
    if (!this.userConnections.has(userId)) {
      this.userConnections.set(userId, new Set());
    }
    this.userConnections.get(userId)!.add(ws);
  }

  private removeConnection(ws: WebSocket, jobId?: string) {
    if (jobId) {
      const jobConnections = this.connections.get(jobId);
      if (jobConnections) {
        jobConnections.delete(ws);
        if (jobConnections.size === 0) {
          this.connections.delete(jobId);
        }
      }
    } else {
      // Remove from all connections
      this.connections.forEach((connections, id) => {
        connections.delete(ws);
        if (connections.size === 0) {
          this.connections.delete(id);
        }
      });

      this.userConnections.forEach((connections, userId) => {
        connections.delete(ws);
        if (connections.size === 0) {
          this.userConnections.delete(userId);
        }
      });
    }
  }

  public broadcastJobUpdate(jobId: string, update: Partial<GPUJobResponse>) {
    const connections = this.connections.get(jobId);
    if (!connections) return;

    const message = JSON.stringify({
      type: 'job_update',
      jobId,
      data: update
    });

    connections.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  }

  public broadcastPreviewFrame(jobId: string, frameUrl: string, progress: number) {
    const connections = this.connections.get(jobId);
    if (!connections) return;

    const message = JSON.stringify({
      type: 'preview_frame',
      jobId,
      data: {
        frameUrl,
        progress,
        timestamp: Date.now()
      }
    });

    connections.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  }

  public broadcastStoryboard(jobId: string, frames: string[]) {
    const connections = this.connections.get(jobId);
    if (!connections) return;

    const message = JSON.stringify({
      type: 'storyboard_update',
      jobId,
      data: {
        frames,
        timestamp: Date.now()
      }
    });

    connections.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  }

  public broadcastToUser(userId: string, message: any) {
    const connections = this.userConnections.get(userId);
    if (!connections) return;

    const data = JSON.stringify(message);

    connections.forEach(ws => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    });
  }

  // Cleanup method
  public close() {
    this.wss.close();
  }
}

let websocketService: WebSocketService | null = null;

export function initializeWebSocketService(server: Server): WebSocketService {
  if (!websocketService) {
    websocketService = new WebSocketService(server);
  }
  return websocketService;
}

export function getWebSocketService(): WebSocketService | null {
  return websocketService;
}