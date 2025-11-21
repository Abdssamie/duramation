import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export interface WorkflowSpec {
  id: string;
  name: string;
  description: string;
  eventName: string;
  requiredProviders?: string[];
  inputFields?: Array<{
    name: string;
    type: string;
    required: boolean;
  }>;
}

export function generateWorkflow(spec: WorkflowSpec): { functionPath: string; metadataPath: string } {
  const folderName = spec.id;
  const folderPath = join(process.cwd(), 'src/inngest/functions', folderName);

  // Create folder
  mkdirSync(folderPath, { recursive: true });

  // Generate function.ts
  const functionContent = `import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate } from "@/lib/realtime-channels";

export const ${toCamelCase(spec.id)}Workflow = inngest.createFunction(
    {
        id: "${spec.id}",
        idempotency: 'event.data.user_id + "-" + event.data.workflowId + "-" + event.data.idempotency_key',
        cancelOn: [{
            event: "workflow/stop",
            if: "async.data.workflowId == event.data.workflowId && async.data.user_id == event.data.user_id",
        }],
    },
    { event: "${spec.eventName}" },
    async ({ step, event, logger, publish, credentials }) => {
        const { workflowId, user_id, input } = event.data;

        logger.info(\`${spec.name} started for user \${user_id}\`);

        if (!input) {
            throw new NonRetriableError("Input is required");
        }

        // TODO: Implement workflow logic here

        await publish(
            workflowChannel(user_id, workflowId).updates(
                createWorkflowUpdate("result", "Workflow completed successfully")
            )
        );

        logger.info(\`${spec.name} completed for user \${user_id}\`);
        return { success: true };
    }
);
`;

  // Generate metadata.ts
  const metadataContent = `import { WorkflowTemplate } from "@duramation/shared/types";

export const ${toCamelCase(spec.id)}Metadata: WorkflowTemplate = {
    id: "${spec.id}",
    name: "${spec.name}",
    description: "${spec.description}",
    version: "1.0.0",
    category: "automation",
    requiredProviders: ${JSON.stringify(spec.requiredProviders || [])},
    requiredScopes: {},
    fields: ${JSON.stringify(spec.inputFields || [], null, 4)},
    eventName: "${spec.eventName}",
};
`;

  const functionPath = join(folderPath, 'function.ts');
  const metadataPath = join(folderPath, 'metadata.ts');

  writeFileSync(functionPath, functionContent);
  writeFileSync(metadataPath, metadataContent);

  return { functionPath, metadataPath };
}

function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
}
