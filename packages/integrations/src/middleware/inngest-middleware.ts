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
      async onFunctionRun() {
        return {
          async transformInput({ ctx }) {
            const { event } = ctx;

            // Extract workflow information from the event
            const workflowId = event.data?.workflowId;
            const userId = event.data?.user_id;

            if (!workflowId  || !userId) {
              // If no workflow or user ID, return empty credentials
              return {
                ctx: {
                  credentials: []
                }
              };
            }

            try {
              // Fetch workflow credentials from the database
              const credentials = await credentialStore.getWorkflowCredentials(workflowId, userId);

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
              console.error("Error fetching workflow credentials:", error);

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
