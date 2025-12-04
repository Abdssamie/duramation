import { integrationClient } from './client.js';
import { google } from 'googleapis';
import { Provider } from '@duramation/db';

// Add other provider SDKs as needed

/**
 * @function createGoogleClient
 * @description Creates and configures Google API clients (Sheets, Drive, Gmail, Calendar)
 * using an access token obtained from Nango for a given connection. This factory
 * centralizes the setup of Google services, making them ready for use in workflows.
 * @param {string} connectionId - The Nango connection ID for the Google integration.
 * @returns {Promise<object>} An object containing initialized Google API clients.
 * @property {google.sheets_v4.Sheets} sheets - Google Sheets API client.
 * @property {google.drive_v3.Drive} drive - Google Drive API client.
 * @property {google.gmail_v1.Gmail} gmail - Google Gmail API client.
 * @property {google.calendar_v3.Calendar} calendar - Google Calendar API client.
 * @throws {Error} If the access token cannot be retrieved or the Google API client initialization fails.
 */
export const createGoogleClient = async (connectionId: string) => {
  // Retrieve the access token for the Google Mail provider from Nango
  const accessToken = await integrationClient.getAccessToken(Provider.google_mail, connectionId);
  
  // Initialize Google OAuth2 client with the retrieved access token
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  // Return an object containing various Google API clients, authenticated
  return {
    sheets: google.sheets({ version: 'v4', auth }),
    drive: google.drive({ version: 'v3', auth }),
    gmail: google.gmail({ version: 'v1', auth }),
    calendar: google.calendar({ version: 'v3', auth }),
    // Add other Google APIs here as needed, ensuring they are authenticated with the same 'auth' object
  };
};

