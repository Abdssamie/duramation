import { ApiClient, providerClients } from '../http-client.js';
import type { CredentialSecret } from '@duramation/shared/types';

export interface MicrosoftEmail {
  subject: string;
  body: {
    contentType: 'Text' | 'HTML';
    content: string;
  };
  toRecipients: Array<{
    emailAddress: {
      address: string;
      name?: string;
    };
  }>;
  ccRecipients?: Array<{
    emailAddress: {
      address: string;
      name?: string;
    };
  }>;
  bccRecipients?: Array<{
    emailAddress: {
      address: string;
      name?: string;
    };
  }>;
  importance?: 'Low' | 'Normal' | 'High';
}

export interface MicrosoftCalendarEvent {
  subject: string;
  body?: {
    contentType: 'Text' | 'HTML';
    content: string;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: Array<{
    emailAddress: {
      address: string;
      name?: string;
    };
    type: 'required' | 'optional' | 'resource';
  }>;
  location?: {
    displayName: string;
  };
  isOnlineMeeting?: boolean;
}

export interface MicrosoftContact {
  givenName: string;
  surname: string;
  emailAddresses: Array<{
    address: string;
    name?: string;
  }>;
  businessPhones?: string[];
  mobilePhone?: string;
  jobTitle?: string;
  companyName?: string;
}

export class MicrosoftService {
  private client: ApiClient;
  
  constructor(credentials: CredentialSecret) {
    this.client = new ApiClient(providerClients.microsoft(credentials));
  }
  
  // Email methods (Outlook)
  async sendEmail(email: MicrosoftEmail): Promise<any> {
    return this.client.post('me/sendMail', {
      message: email
    });
  }
  
  async listEmails(options: {
    filter?: string;
    orderby?: string;
    top?: number;
    skip?: number;
  } = {}): Promise<any> {
    const queryParams = new URLSearchParams();
    queryParams.append('$top', (options.top || 50).toString());
    if (options.filter) queryParams.append('$filter', options.filter);
    if (options.orderby) queryParams.append('$orderby', options.orderby);
    if (options.skip) queryParams.append('$skip', options.skip.toString());
    
    return this.client.get(`me/messages?${queryParams.toString()}`);
  }
  
  async getEmail(messageId: string): Promise<any> {
    return this.client.get(`me/messages/${messageId}`);
  }
  
  async deleteEmail(messageId: string): Promise<void> {
    await this.client.delete(`me/messages/${messageId}`);
  }
  
  async markEmailAsRead(messageId: string): Promise<any> {
    return this.client.patch(`me/messages/${messageId}`, {
      isRead: true
    });
  }
  
  // Calendar methods
  async createCalendarEvent(event: MicrosoftCalendarEvent): Promise<any> {
    return this.client.post('me/events', event);
  }
  
  async listCalendarEvents(options: {
    startDateTime?: string;
    endDateTime?: string;
    filter?: string;
    orderby?: string;
    top?: number;
  } = {}): Promise<any> {
    const queryParams = new URLSearchParams();
    queryParams.append('$top', (options.top || 50).toString());
    
    // Use calendarView for date-ranged queries (more efficient)
    if (options.startDateTime && options.endDateTime) {
      const start = encodeURIComponent(options.startDateTime);
      const end = encodeURIComponent(options.endDateTime);
      return this.client.get(`me/calendarView?startDateTime=${start}&endDateTime=${end}&$top=${options.top || 50}`);
    }
    
    // Fallback to events endpoint with filter
    if (options.filter) {
      queryParams.append('$filter', options.filter);
    }
    
    if (options.orderby) queryParams.append('$orderby', options.orderby);
    
    return this.client.get(`me/events?${queryParams.toString()}`);
  }
  
  async getCalendarEvent(eventId: string): Promise<any> {
    return this.client.get(`me/events/${eventId}`);
  }
  
  async updateCalendarEvent(eventId: string, event: Partial<MicrosoftCalendarEvent>): Promise<any> {
    return this.client.patch(`me/events/${eventId}`, event);
  }
  
  async deleteCalendarEvent(eventId: string): Promise<void> {
    await this.client.delete(`me/events/${eventId}`);
  }
  
  // OneDrive methods
  async listFiles(options: {
    filter?: string;
    orderby?: string;
    top?: number;
    skip?: number;
  } = {}): Promise<any> {
    const queryParams = new URLSearchParams();
    queryParams.append('$top', (options.top || 50).toString());
    if (options.filter) queryParams.append('$filter', options.filter);
    if (options.orderby) queryParams.append('$orderby', options.orderby);
    if (options.skip) queryParams.append('$skip', options.skip.toString());
    
    return this.client.get(`me/drive/root/children?${queryParams.toString()}`);
  }
  
  async getFile(fileId: string): Promise<any> {
    return this.client.get(`me/drive/items/${fileId}`);
  }
  
  async downloadFile(fileId: string): Promise<Buffer> {
    const response = await providerClients.microsoft({} as CredentialSecret).get(`me/drive/items/${fileId}/content`, {
      responseType: 'buffer'
    });
    return response.body as Buffer;
  }
  
  async uploadFile(filename: string, content: Buffer, parentId?: string): Promise<any> {
    const path = parentId ? `me/drive/items/${parentId}:/${filename}:/content` : `me/drive/root:/${filename}:/content`;
    
    return this.client.put(path, new Uint8Array(content), {
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    });
  }
  
  async createFolder(name: string, parentId?: string): Promise<any> {
    const path = parentId ? `me/drive/items/${parentId}/children` : 'me/drive/root/children';
    
    return this.client.post(path, {
      name,
      folder: {},
      '@microsoft.graph.conflictBehavior': 'rename'
    });
  }
  
  // Contacts methods
  async createContact(contact: MicrosoftContact): Promise<any> {
    return this.client.post('me/contacts', contact);
  }
  
  async listContacts(options: {
    filter?: string;
    orderby?: string;
    top?: number;
    skip?: number;
  } = {}): Promise<any> {
    const queryParams = new URLSearchParams();
    queryParams.append('$top', (options.top || 50).toString());
    if (options.filter) queryParams.append('$filter', options.filter);
    if (options.orderby) queryParams.append('$orderby', options.orderby);
    if (options.skip) queryParams.append('$skip', options.skip.toString());
    
    return this.client.get(`me/contacts?${queryParams.toString()}`);
  }
  
  async getContact(contactId: string): Promise<any> {
    return this.client.get(`me/contacts/${contactId}`);
  }
  
  async updateContact(contactId: string, contact: Partial<MicrosoftContact>): Promise<any> {
    return this.client.patch(`me/contacts/${contactId}`, contact);
  }
  
  async deleteContact(contactId: string): Promise<void> {
    await this.client.delete(`me/contacts/${contactId}`);
  }
  
  // User profile methods
  async getProfile(): Promise<any> {
    return this.client.get('me');
  }
  
  async getProfilePhoto(): Promise<Buffer> {
    const response = await providerClients.microsoft({} as CredentialSecret).get('me/photo/$value', {
      responseType: 'buffer'
    });
    return response.body as Buffer;
  }
  
  // Utility methods
  async testConnection(): Promise<boolean> {
    try {
      await this.getProfile();
      return true;
    } catch (error) {
      return false;
    }
  }
}