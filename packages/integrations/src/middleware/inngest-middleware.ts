import { InngestMiddleware } from "inngest";
import { prisma } from '@duramation/db';


/**
 * Safely parse JSON string, returning null if parsing fails
 * @param jsonString - The JSON string to parse
 * @returns Parsed object or null if parsing fails
 */
function safeJsonParse(jsonString: string): any | null {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn("[Integration Middleware] Failed to parse credential secret JSON:", error);
    return null;
  }
}

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
              
              const workflow = await prisma.workflow.findUnique({
                where: { id: workflowId, userId: userId },
                include: {
                  workflowCredentials: {
                    include: {
                      credential: true
                    }
                  }
                }
              });

              const credentials = workflow?.workflowCredentials?.map((wc) => wc.credential) || [];
              
              console.log(`[Integration Middleware] Found ${credentials.length} credentials:`, credentials.map((c: any) => ({ id: c.id, name: c.name, provider: c.provider })));

              // Return the credentials in the context (serialize to plain objects)
              return {
                ctx: {
                  credentials: credentials.map((cred: any) => ({
                    id: cred.id,
                    name: cred.name,
                    type: cred.type,
                    provider: cred.provider,
                    userId: cred.userId,
                    secret: cred.secret ? safeJsonParse(cred.secret as string) : null,
                    nangoConnectionId: cred.nangoConnectionId,
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
