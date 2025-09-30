import { InngestMiddleware } from "inngest";
import prisma from "@/lib/prisma";
import { CredentialSecret } from "@/lib/credentials/schema";

// Legacy credential middleware for backward compatibility
export const credentialMiddleware = new InngestMiddleware({
  name: "Credential Middleware",
  init() {
    return {
      async onFunctionRun() {
        return {
          async transformInput({ ctx }) {
            const { event } = ctx;

            const userId = event.user?.id;
            const workflowId = event.data.workflowId;

            if (!userId) {
              return;
            }

            const workflow = await prisma.workflow.findFirst({
              where: {
                id: workflowId,
                userId: userId,
              },
              include: {
                workflowCredentials: {
                  include: {
                    credential: true,
                  },
                },
              },
            });

            if (!workflow) {
              return;
            }

            const credentials = workflow.workflowCredentials.map(
              (workflowCred) => {
                // Parse the secret data if it's a string
                const secretData: CredentialSecret =
                  typeof workflowCred.credential.secret;

                return {
                  data: secretData,
                  type: workflowCred.credential.type,
                  id: workflowCred.credential.id,
                  provider: workflowCred.credential.provider,
                };
              },
            );

            return {
              ctx: {
                credentials: credentials,
              },
            };
          },
        };
      },
    };
  },
});
