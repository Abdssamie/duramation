import { google } from "googleapis";
import { GoogleService } from './base.js';

export class GoogleSheetsService extends GoogleService {
  private sheets = google.sheets({ version: 'v4', auth: this.oauth2Client });

  async getSpreadsheet(spreadsheetId: string) {
    await this.refreshAccessTokenIfNeeded();
    
    const response = await this.sheets.spreadsheets.get({
      spreadsheetId,
    });
    
    return response.data;
  }

  async getSheetData(spreadsheetId: string, range: string) {
    await this.refreshAccessTokenIfNeeded();
    
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    
    return response.data.values || [];
  }

  async updateSheetData(spreadsheetId: string, range: string, values: any[][]) {
    await this.refreshAccessTokenIfNeeded();
    
    const response = await this.sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    
    return response.data;
  }

  async appendSheetData(spreadsheetId: string, range: string, values: any[][]) {
    await this.refreshAccessTokenIfNeeded();
    
    const response = await this.sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    
    return response.data;
  }

  async clearSheetData(spreadsheetId: string, range: string) {
    await this.refreshAccessTokenIfNeeded();
    
    const response = await this.sheets.spreadsheets.values.clear({
      spreadsheetId,
      range,
    });
    
    return response.data;
  }

  async batchGetSheetData(spreadsheetId: string, ranges: string[]) {
    await this.refreshAccessTokenIfNeeded();
    
    const response = await this.sheets.spreadsheets.values.batchGet({
      spreadsheetId,
      ranges,
    });
    
    return response.data.valueRanges || [];
  }

  async batchUpdateSheetData(spreadsheetId: string, data: Array<{ range: string; values: any[][] }>) {
    await this.refreshAccessTokenIfNeeded();
    
    const response = await this.sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: 'USER_ENTERED',
        data: data.map(item => ({
          range: item.range,
          values: item.values,
        })),
      },
    });
    
    return response.data;
  }

  async createSpreadsheet(title: string, sheetTitles?: string[]) {
    await this.refreshAccessTokenIfNeeded();
    
    const response = await this.sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title,
        },
        sheets: sheetTitles?.map(sheetTitle => ({
          properties: {
            title: sheetTitle,
          },
        })),
      },
    });
    
    return response.data;
  }

  async addSheet(spreadsheetId: string, title: string) {
    await this.refreshAccessTokenIfNeeded();
    
    const response = await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title,
              },
            },
          },
        ],
      },
    });
    
    return response.data;
  }

  async deleteSheet(spreadsheetId: string, sheetId: number) {
    await this.refreshAccessTokenIfNeeded();
    
    const response = await this.sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            deleteSheet: {
              sheetId,
            },
          },
        ],
      },
    });
    
    return response.data;
  }

  async findSheetByName(spreadsheetId: string, sheetName: string) {
    await this.refreshAccessTokenIfNeeded();
    
    const spreadsheet = await this.getSpreadsheet(spreadsheetId);
    const sheet = spreadsheet.sheets?.find(s => s.properties?.title === sheetName);
    
    return sheet || null;
  }
}
