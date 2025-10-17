import { ApiClient, providerClients } from '../http-client.js';
import type { CredentialSecret } from '@duramation/shared/types';

export interface GoogleSheetsRange {
  range: string;
  majorDimension?: 'ROWS' | 'COLUMNS';
  values?: string[][];
}

export interface GoogleSheetsResponse {
  range: string;
  majorDimension: string;
  values: string[][];
}

export interface GmailMessage {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  isHtml?: boolean;
}

export interface GoogleCalendarEvent {
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone?: string;
  };
  end: {
    dateTime: string;
    timeZone?: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
  }>;
}

export class GoogleService {
  private client: ApiClient;
  
  constructor(credentials: CredentialSecret) {
    this.client = new ApiClient(providerClients.google(credentials));
  }
  
  // Google Sheets methods
  async readSheet(spreadsheetId: string, range: string): Promise<GoogleSheetsResponse> {
    return this.client.get(`/v4/spreadsheets/${spreadsheetId}/values/${range}`);
  }
  
  async writeSheet(spreadsheetId: string, range: string, values: string[][]): Promise<void> {
    await this.client.put(`/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=RAW`, {
      range,
      majorDimension: 'ROWS',
      values
    });
  }
  
  async appendToSheet(spreadsheetId: string, range: string, values: string[][]): Promise<void> {
    await this.client.post(`/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, {
      range,
      majorDimension: 'ROWS',
      values
    });
  }
  
  // Gmail methods
  async sendEmail(message: GmailMessage): Promise<void> {
    const emailContent = this.buildEmailContent(message);
    
    await this.client.post('/gmail/v1/users/me/messages/send', {
      raw: Buffer.from(emailContent).toString('base64url')
    });
  }
  
  private buildEmailContent(message: GmailMessage): string {
    const { to, cc, bcc, subject, body, isHtml = false } = message;
    
    let content = '';
    content += `To: ${to.join(', ')}\r\n`;
    if (cc?.length) content += `Cc: ${cc.join(', ')}\r\n`;
    if (bcc?.length) content += `Bcc: ${bcc.join(', ')}\r\n`;
    content += `Subject: ${subject}\r\n`;
    content += `Content-Type: ${isHtml ? 'text/html' : 'text/plain'}; charset=utf-8\r\n`;
    content += '\r\n';
    content += body;
    
    return content;
  }
  
  // Google Calendar methods
  async createCalendarEvent(calendarId: string = 'primary', event: GoogleCalendarEvent): Promise<any> {
    return this.client.post(`/calendar/v3/calendars/${calendarId}/events`, event);
  }
  
  async listCalendarEvents(calendarId: string = 'primary', options: {
    timeMin?: string;
    timeMax?: string;
    maxResults?: number;
  } = {}): Promise<any> {
    const queryParams = new URLSearchParams();
    if (options.timeMin) queryParams.append('timeMin', options.timeMin);
    if (options.timeMax) queryParams.append('timeMax', options.timeMax);
    if (options.maxResults) queryParams.append('maxResults', options.maxResults.toString());
    
    const queryString = queryParams.toString();
    const url = `/calendar/v3/calendars/${calendarId}/events${queryString ? `?${queryString}` : ''}`;
    
    return this.client.get(url);
  }
  
  // Google Drive methods
  async listFiles(options: {
    q?: string;
    pageSize?: number;
    fields?: string;
  } = {}): Promise<any> {
    const queryParams = new URLSearchParams();
    queryParams.append('pageSize', (options.pageSize || 10).toString());
    queryParams.append('fields', options.fields || 'nextPageToken, files(id, name, mimeType, modifiedTime)');
    if (options.q) queryParams.append('q', options.q);
    
    return this.client.get(`/drive/v3/files?${queryParams.toString()}`);
  }
  
  async getFile(fileId: string): Promise<any> {
    return this.client.get(`/drive/v3/files/${fileId}`);
  }
  
  async downloadFile(fileId: string): Promise<Buffer> {
    const response = await providerClients.google({} as CredentialSecret).get(`/drive/v3/files/${fileId}?alt=media`, {
      responseType: 'buffer'
    });
    return response.body as Buffer;
  }
}