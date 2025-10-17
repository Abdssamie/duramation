# Duramation Integrations Package

This package provides HTTP client services and provider integrations for the Duramation workflow automation platform.

## Features

- **Shared HTTP Client**: Built on `got` for reliable HTTP requests with retry logic, timeout handling, and error logging
- **Provider Services**: Type-safe service classes for Google, Slack, Microsoft, and Firecrawl integrations
- **Authentication Handling**: Automatic OAuth and API key authentication for all providers
- **Error Handling**: Comprehensive error handling with logging and retry mechanisms

## Usage

### Basic HTTP Client

```typescript
import { createHttpClient, httpClient } from '@duramation/integrations/server';

// Use the default client
const response = await httpClient.get('https://api.example.com/data');

// Create a custom client
const customClient = createHttpClient({
  baseUrl: 'https://api.example.com',
  timeout: 10000,
  retries: 5
});
```

### Provider Services

```typescript
import { GoogleService, SlackService, ProviderServiceFactory } from '@duramation/integrations/server';

// Create services directly
const googleService = new GoogleService(credentials);
const slackService = new SlackService(credentials);

// Or use the factory
const service = ProviderServiceFactory.createService('GOOGLE', credentials);

// Test connections
const isConnected = await ProviderServiceFactory.testConnection('SLACK', credentials);
```

### In Workflows

```typescript
import { GoogleService, SlackService } from '@duramation/integrations/server';

export const myWorkflow = inngest.createFunction(
  { id: 'my-workflow' },
  { event: 'workflow/my-workflow' },
  async ({ event, step, logger }) => {
    const credentials = await getCredentialsForWorkflow(workflowId, ['GOOGLE', 'SLACK']);
    
    // Read from Google Sheets
    const sheetData = await step.run('read-sheets', async () => {
      const googleService = new GoogleService(credentials.GOOGLE);
      return await googleService.readSheet(spreadsheetId, 'A1:Z100');
    });
    
    // Send to Slack
    await step.run('send-slack', async () => {
      const slackService = new SlackService(credentials.SLACK);
      return await slackService.sendMessage({
        channel: '#general',
        text: `Found ${sheetData.values.length} rows`
      });
    });
  }
);
```

## Available Services

### GoogleService
- `readSheet(spreadsheetId, range)` - Read data from Google Sheets
- `writeSheet(spreadsheetId, range, values)` - Write data to Google Sheets
- `sendEmail(message)` - Send email via Gmail
- `createCalendarEvent(calendarId, event)` - Create calendar events
- `listFiles(options)` - List Google Drive files

### SlackService
- `sendMessage(message)` - Send messages to channels
- `listChannels(options)` - List workspace channels
- `getUserInfo(userId)` - Get user information
- `uploadFile(options)` - Upload files to Slack

### MicrosoftService
- `sendEmail(email)` - Send email via Outlook
- `createCalendarEvent(event)` - Create calendar events
- `listFiles(options)` - List OneDrive files
- `createContact(contact)` - Create contacts

### FirecrawlService
- `scrape(url, options)` - Scrape web pages
- `crawl(url, options)` - Crawl websites
- `search(query, options)` - Search the web

## Configuration

The HTTP client includes:
- **Automatic retries** with exponential backoff
- **Request/response logging** for debugging
- **Timeout handling** (30s default)
- **Error enhancement** with detailed context
- **Authentication headers** automatically added per provider

## Error Handling

All services include comprehensive error handling:
- Connection failures are logged and retried
- Authentication errors are clearly identified
- Rate limiting is handled automatically
- Detailed error context is provided for debugging