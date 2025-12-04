# packages/integrations

This package centralizes the logic and configurations for integrating with various third-party services within the Duramation platform. It leverages Nango to simplify the process of connecting to external APIs, managing authentication (OAuth, API keys), and handling data exchange.

## Purpose

*   **Standardized Integrations:** Provides a consistent way to interact with different external services.
*   **Authentication Management:** Handles OAuth flows and API key management securely, often facilitated by Nango.
*   **Data Transformation:** Contains logic for transforming data between Duramation's internal format and external API requirements.
*   **Modularity:** Keeps integration-specific code separate, making it easier to add new services or update existing ones without affecting core application logic.

## Technologies

*   **Integration Platform:** Nango
*   **HTTP Client:** (Likely Axios or native Fetch API)

## Usage

Modules within this package expose functions or clients that can be used by `apps/inngest-app` (and potentially `apps/frontend` for client-side interactions) to communicate with external services.

Example (conceptual):

```typescript
import { getSlackClient } from '@repo/integrations/slack';

async function postMessageToSlack(integrationId: string, channel: string, message: string) {
  const slack = await getSlackClient(integrationId);
  await slack.chat.postMessage({ channel, text: message });
}
```

## Adding a New Integration

1.  **Configure Nango:** Set up the new service within your Nango dashboard, including OAuth credentials or API key management.
2.  **Add Module:** Create a new module (e.g., `src/providers/new-service.ts`) within this package.
3.  **Implement Client:** Implement the necessary functions to interact with the new service's API, utilizing Nango's capabilities for authentication.
4.  **Expose Interface:** Export a clear interface for other parts of the monorepo to consume.
5.  **Update Environment Variables:** Ensure any new API keys or secrets are added to the root `.env.example` and configured in your `.env` file.

For more information on Nango, refer to the [Nango Documentation](https://www.nango.dev/docs/).
