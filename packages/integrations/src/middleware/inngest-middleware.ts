import { InngestMiddleware } from "inngest";
import { credentialStore } from '../services/credential-store.js';

// Type for the integration context that will be injected into workflows
export interface IntegrationContext {
  credentials: any[];
}

// Enhanced Inngest middleware for injecting credentials into workflow runs
export const integrationMiddleware = new InngestMiddleware({
  name: "Integration Middleware",
  init() {
    return {
      async onFunctionRun({ ctx }) {
        const { event } = ctx;

        // Extract workflow information from the event
        const workflowId = event.data?.workflowId;
        const userId = event.data?.user_id;

        if (!workflowId  || !userId) {
          console.log(`[Integration Middleware] No workflowId or userId found in event`);
          return {};
        }

        return {
          async transformInput() {
            try {
              // Fetch workflow credentials from the database
              console.log(`[Integration Middleware] Fetching credentials for workflow: ${workflowId}, user: ${userId}`);
              const credentials = await credentialStore.getWorkflowCredentials(workflowId, userId);
              console.log(`[Integration Middleware] Found ${credentials.length} credentials:`, credentials.map(c => ({ id: c.id, name: c.name, provider: c.provider })));

              // Return the credentials in the context (serialize to plain objects)
              return {
                ctx: {
                  credentials: credentials.map(cred => ({
                    id: cred.id,
                    name: cred.name,
                    type: cred.type,
                    provider: cred.provider,
                    userId: cred.userId,
                    secret: cred.secret,
                    config: cred.config,
                    createdAt: cred.createdAt,
                    updatedAt: cred.updatedAt
                  }))
                }
              };
            } catch (error) {
              console.error("[Integration Middleware] Error fetching workflow credentials:", error);

              // Return empty credentials if there's an error
              return {
                ctx: {
                  credentials: []
                }
              };
            }
          }
        };
      }
    };
  }
});
