import { InngestMiddleware } from "inngest";
import { Provider } from '../types/providers';
import { integrationServiceRegistry } from '../services/registry';
import { credentialStore } from '../services/credential-store';
import { GoogleService } from '../services/google-service';

// Type for the integration context that will be injected into workflows
export interface IntegrationContext {
  integrations: {
    [key: string]: any; // This would be properly typed in a real implementation
    getIntegration: (provider: Provider) => any | undefined;
    hasIntegration: (provider: Provider) => boolean;
  };
  credentials: Array<{
    id: string;
    name: string;
    type: string;
    provider: Provider;
    data: any;
  }>;
}

// Enhanced Inngest middleware for injecting integration services into workflow runs
export const integrationMiddleware = new InngestMiddleware({
  name: "Integration Middleware",
  init() {
    return {
      async onFunctionRun() {
        return {
          async transformInput({ ctx }: any) {
            const { event } = ctx;
            
            // Extract user and workflow information from the event
            const userId = event.user?.id;
            const workflowId = event.data?.workflowId;
            
            if (!userId) {
              // If no user ID, we can't fetch credentials, so return empty context
              return {
                ctx: {
                  integrations: {
                    getIntegration: () => undefined,
                    hasIntegration: () => false
                  },
                  credentials: []
                }
              };
            }
            
            try {
              // Fetch user credentials from the credential store
              let credentials: any[] = [];
              
              if (workflowId) {
                // Get workflow-specific credentials
                credentials = await credentialStore.getWorkflowCredentials(workflowId);
              } else {
                // Get all user credentials (simplified - in reality you'd want to filter by provider)
                credentials = [];
              }
              
              // Initialize appropriate integration services based on those credentials
              // For this example, we'll just handle Google
              for (const credential of credentials) {
                if (credential.provider === 'GOOGLE' && credential.type === 'OAUTH') {
                  const googleService = new GoogleService(
                    userId,
                    credential.id,
                    credential.secret
                  );
                  integrationServiceRegistry.registerService('GOOGLE', googleService);
                }
              }
              
              // Return the context with both credentials and integration services
              return {
                ctx: {
                  integrations: {
                    getIntegration: (provider: Provider) => {
                      // Return the integration service for the specified provider
                      return integrationServiceRegistry.getService(provider);
                    },
                    hasIntegration: (provider: Provider) => {
                      // Check if we have an integration service for the specified provider
                      return integrationServiceRegistry.hasService(provider);
                    }
                  },
                  credentials: credentials.map(cred => ({
                    id: cred.id,
                    name: cred.name,
                    type: cred.type,
                    provider: cred.provider,
                    data: cred.secret
                  }))
                }
              };
            } catch (error) {
              console.error("Error initializing integration middleware:", error);
              
              // Return a minimal context if there's an error
              return {
                ctx: {
                  integrations: {
                    getIntegration: () => undefined,
                    hasIntegration: () => false
                  },
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

// Example of how to use the middleware in a workflow
/*
export const exampleWorkflow = inngest.createFunction(
  { id: "example-workflow" },
  { event: "example/event" },
  [integrationMiddleware], // Add the middleware to the workflow
  async ({ event, step, integrations, credentials }) => {
    // Now you can use integrations in your workflow
    if (integrations.hasIntegration('GOOGLE')) {
      const gmail = integrations.getIntegration('GOOGLE');
      const email = await gmail.sendMail('user@example.com', 'Hello', 'This is a test email');
      // Process the email...
    }
    
    // You can also access raw credentials
    const googleCreds = credentials.find(cred => cred.provider === 'GOOGLE');
    if (googleCreds) {
      console.log('Google credential ID:', googleCreds.id);
    }
    
    return { success: true };
  }
);
*/