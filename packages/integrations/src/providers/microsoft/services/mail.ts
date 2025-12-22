import { MicrosoftService } from './base.js';

export interface SendEmailOptions {
  to: string[];
  subject: string;
  body: string;
  cc?: string[];
  bcc?: string[];
  isHtml?: boolean;
}

export interface Email {
  id: string;
  subject: string;
  from: {
    emailAddress: {
      name: string;
      address: string;
    };
  };
  receivedDateTime: string;
  bodyPreview: string;
  isRead: boolean;
}

export class MicrosoftMailService extends MicrosoftService {
  /**
   * Send an email via Microsoft Graph API
   */
  async sendEmail(options: SendEmailOptions): Promise<void> {
    const message = {
      message: {
        subject: options.subject,
        body: {
          contentType: options.isHtml ? 'HTML' : 'Text',
          content: options.body,
        },
        toRecipients: options.to.map(email => ({
          emailAddress: { address: email },
        })),
        ccRecipients: options.cc?.map(email => ({
          emailAddress: { address: email },
        })) || [],
        bccRecipients: options.bcc?.map(email => ({
          emailAddress: { address: email },
        })) || [],
      },
    };

    await this.makeRequest('/me/sendMail', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }

  /**
   * Get user's emails
   */
  async getEmails(options: { top?: number; skip?: number } = {}): Promise<Email[]> {
    const params = new URLSearchParams();
    if (options.top) params.append('$top', options.top.toString());
    if (options.skip) params.append('$skip', options.skip.toString());

    const response = await this.makeRequest<{ value: Email[] }>(
      `/me/messages?${params.toString()}`
    );

    return response.value;
  }

  /**
   * Get a specific email by ID
   */
  async getEmail(emailId: string): Promise<Email> {
    return this.makeRequest<Email>(`/me/messages/${emailId}`);
  }
}
