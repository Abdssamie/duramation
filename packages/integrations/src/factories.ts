import { integrationClient } from './client.js';
import { google } from 'googleapis';
// Add other provider SDKs as needed

export const createGoogleClient = async (connectionId: string) => {
  const accessToken = await integrationClient.getAccessToken('GOOGLE', connectionId);
  
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  return {
    sheets: google.sheets({ version: 'v4', auth }),
    drive: google.drive({ version: 'v3', auth }),
    gmail: google.gmail({ version: 'v1', auth }),
    calendar: google.calendar({ version: 'v3', auth }),
    // Add other Google APIs here
  };
};
