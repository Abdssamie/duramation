import { Logger } from "winston";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 second
async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendWebhookWithRetry(
  webhookUrl: string,
  webhookSecret: string,
  body: any,
  logger: Logger,
  maxRetries = MAX_RETRIES,
): Promise<boolean> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${webhookSecret}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        logger.info(`Webhook sent successfully to: ${webhookUrl}`);
        return true;
      }

      const errorBody = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorBody}`);
    } catch (error) {
      lastError = error as Error;
      const delayMs = RETRY_DELAY_MS * attempt; // Exponential backoff
      logger.warn(
        `Attempt ${attempt} failed (${lastError.message}). Retrying in ${delayMs}ms...`,
      );

      if (attempt < maxRetries) {
        await delay(delayMs);
      }
    }
  }

  logger.error(
    `Failed to send webhook after ${maxRetries} attempts: ${lastError?.message}`,
  );
  return false;
}

