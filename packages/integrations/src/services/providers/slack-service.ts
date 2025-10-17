import { ApiClient, providerClients } from '../http-client.js';
import type { CredentialSecret } from '@duramation/shared/types';

export interface SlackMessage {
  channel: string;
  text?: string;
  blocks?: any[];
  attachments?: any[];
  thread_ts?: string;
  reply_broadcast?: boolean;
}

export interface SlackChannel {
  id: string;
  name: string;
  is_channel: boolean;
  is_group: boolean;
  is_im: boolean;
  is_private: boolean;
  is_archived: boolean;
  is_member: boolean;
}

export interface SlackUser {
  id: string;
  name: string;
  real_name: string;
  display_name: string;
  email?: string;
  is_bot: boolean;
  is_admin: boolean;
  is_owner: boolean;
}

export class SlackService {
  private client: ApiClient;
  
  constructor(credentials: CredentialSecret) {
    this.client = new ApiClient(providerClients.slack(credentials));
  }
  
  // Message methods
  async sendMessage(message: SlackMessage): Promise<any> {
    return this.client.post('/chat.postMessage', message);
  }
  
  async updateMessage(channel: string, ts: string, message: Partial<SlackMessage>): Promise<any> {
    return this.client.post('/chat.update', {
      channel,
      ts,
      ...message
    });
  }
  
  async deleteMessage(channel: string, ts: string): Promise<any> {
    return this.client.post('/chat.delete', {
      channel,
      ts
    });
  }
  
  async getMessageHistory(channel: string, options: {
    latest?: string;
    oldest?: string;
    limit?: number;
    cursor?: string;
  } = {}): Promise<any> {
    const queryParams = new URLSearchParams();
    queryParams.append('channel', channel);
    queryParams.append('limit', (options.limit || 100).toString());
    if (options.latest) queryParams.append('latest', options.latest);
    if (options.oldest) queryParams.append('oldest', options.oldest);
    if (options.cursor) queryParams.append('cursor', options.cursor);
    
    return this.client.get(`/conversations.history?${queryParams.toString()}`);
  }
  
  // Channel methods
  async listChannels(options: {
    exclude_archived?: boolean;
    types?: string;
    limit?: number;
    cursor?: string;
  } = {}): Promise<{ channels: SlackChannel[] }> {
    const queryParams = new URLSearchParams();
    queryParams.append('exclude_archived', (options.exclude_archived ?? true).toString());
    queryParams.append('types', options.types || 'public_channel,private_channel');
    queryParams.append('limit', (options.limit || 200).toString());
    if (options.cursor) queryParams.append('cursor', options.cursor);
    
    return this.client.get(`/conversations.list?${queryParams.toString()}`);
  }
  
  async getChannelInfo(channel: string): Promise<{ channel: SlackChannel }> {
    return this.client.get(`/conversations.info?channel=${encodeURIComponent(channel)}`);
  }
  
  async createChannel(name: string, isPrivate: boolean = false): Promise<{ channel: SlackChannel }> {
    return this.client.post('/conversations.create', {
      name,
      is_private: isPrivate
    });
  }
  
  async joinChannel(channel: string): Promise<any> {
    return this.client.post('/conversations.join', {
      channel
    });
  }
  
  async leaveChannel(channel: string): Promise<any> {
    return this.client.post('/conversations.leave', {
      channel
    });
  }
  
  // User methods
  async listUsers(options: {
    limit?: number;
    cursor?: string;
  } = {}): Promise<{ members: SlackUser[] }> {
    const queryParams = new URLSearchParams();
    queryParams.append('limit', (options.limit || 200).toString());
    if (options.cursor) queryParams.append('cursor', options.cursor);
    
    return this.client.get(`/users.list?${queryParams.toString()}`);
  }
  
  async getUserInfo(user: string): Promise<{ user: SlackUser }> {
    return this.client.get(`/users.info?user=${encodeURIComponent(user)}`);
  }
  
  async getUserByEmail(email: string): Promise<{ user: SlackUser }> {
    return this.client.get(`/users.lookupByEmail?email=${encodeURIComponent(email)}`);
  }
  
  // File methods
  async uploadFile(options: {
    channels?: string;
    content?: string;
    file?: Buffer;
    filename?: string;
    title?: string;
    initial_comment?: string;
  }): Promise<any> {
    const formData = new FormData();
    
    if (options.channels) formData.append('channels', options.channels);
    if (options.content) formData.append('content', options.content);
    if (options.file) {
      // Convert Buffer to Blob properly
      const blob = new Blob([new Uint8Array(options.file)], { 
        type: 'application/octet-stream' 
      });
      formData.append('file', blob, options.filename || 'file');
    }
    if (options.filename) formData.append('filename', options.filename);
    if (options.title) formData.append('title', options.title);
    if (options.initial_comment) formData.append('initial_comment', options.initial_comment);
    
    return this.client.post('/files.upload', formData, {
      headers: {
        'Content-Type': undefined // Let got set the boundary
      }
    });
  }
  
  // Workspace methods
  async getTeamInfo(): Promise<any> {
    return this.client.get('/team.info');
  }
  
  async testAuth(): Promise<any> {
    return this.client.get('/auth.test');
  }
  
  // Utility methods
  async findChannelByName(name: string): Promise<SlackChannel | null> {
    const response = await this.listChannels();
    return response.channels.find(channel => channel.name === name) || null;
  }
  
  async findUserByEmail(email: string): Promise<SlackUser | null> {
    try {
      const response = await this.getUserByEmail(email);
      return response.user;
    } catch (error) {
      return null;
    }
  }
}