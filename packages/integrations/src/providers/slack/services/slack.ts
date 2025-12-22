import { SlackOAuthSecret } from '@duramation/shared';

export class SlackService {
  private accessToken: string;
  private baseUrl = 'https://slack.com/api';

  constructor(credentialPayload: SlackOAuthSecret) {
    this.accessToken = credentialPayload.accessToken;
  }

  private async makeRequest(endpoint: string, method: string = 'GET', body?: any) {
    const url = `${this.baseUrl}/${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!data.ok) {
      throw new Error(`Slack API error: ${data.error}`);
    }

    return data;
  }

  async postMessage(channel: string, text: string, blocks?: any[]) {
    return this.makeRequest('chat.postMessage', 'POST', {
      channel,
      text,
      blocks,
    });
  }

  async updateMessage(channel: string, ts: string, text: string, blocks?: any[]) {
    return this.makeRequest('chat.update', 'POST', {
      channel,
      ts,
      text,
      blocks,
    });
  }

  async deleteMessage(channel: string, ts: string) {
    return this.makeRequest('chat.delete', 'POST', {
      channel,
      ts,
    });
  }

  async listChannels() {
    return this.makeRequest('conversations.list');
  }

  async getChannelInfo(channel: string) {
    return this.makeRequest(`conversations.info?channel=${channel}`);
  }

  async createChannel(name: string, isPrivate: boolean = false) {
    return this.makeRequest('conversations.create', 'POST', {
      name,
      is_private: isPrivate,
    });
  }

  async inviteToChannel(channel: string, users: string[]) {
    return this.makeRequest('conversations.invite', 'POST', {
      channel,
      users: users.join(','),
    });
  }

  async getUserInfo(userId: string) {
    return this.makeRequest(`users.info?user=${userId}`);
  }

  async listUsers() {
    return this.makeRequest('users.list');
  }
}
