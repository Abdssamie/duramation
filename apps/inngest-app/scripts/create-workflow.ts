#!/usr/bin/env tsx
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

const workflowName = process.argv[2];

if (!workflowName) {
  console.error('Usage: pnpm workflow:create <workflow-name>');
  process.exit(1);
}

const kebabCase = workflowName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const pascalCase = kebabCase.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
const camelCase = pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1);

const workflowDir = join(process.cwd(), 'src/inngest/functions', kebabCase);

const functionTemplate = `import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { workflowChannel, createWorkflowUpdate } from "@/lib/realtime-channels";

export const ${camelCase}Workflow = inngest.createFunction(
  {
    id: "${kebabCase}",
    idempotency: 'event.data.user_id + "-" + event.data.workflowId + "-" + event.data.idempotency_key',
    cancelOn: [{
      event: "workflow/stop",
      if: "async.data.workflowId == event.data.workflowId && async.data.user_id == event.data.user_id",
    }],
  },
  { event: "workflow/${kebabCase}" },
  async ({ step, event, logger, publish }) => {
    const { workflowId, user_id, input } = event.data;

    logger.info(\`Starting ${pascalCase} workflow for user \${user_id}\`);

    if (!input) {
      throw new NonRetriableError("Input is required");
    }

    // TODO: Add your workflow logic here
    const result = await step.run("main-step", async () => {
      await publish(
        workflowChannel(user_id, workflowId).updates(
          createWorkflowUpdate("progress", "Processing...")
        )
      );

      // Your implementation here

      return { success: true };
    });

    await publish(
      workflowChannel(user_id, workflowId).updates(
        createWorkflowUpdate("result", "Workflow completed successfully")
      )
    );

    logger.info(\`${pascalCase} workflow completed for user \${user_id}\`);
    return result;
  }
);
`;

const metadataTemplate = `import { z } from "zod";
import { Prisma, Provider } from '@duramation/db';
import {
  WorkflowInputFieldDefinition,
  WorkflowTemplate,
} from '@duramation/shared';

type JsonValue = Prisma.JsonValue;

export const ${pascalCase}Fields: WorkflowInputFieldDefinition[] = [
  {
    key: 'exampleField',
    label: 'Example Field',
    description: 'Description of the field',
    type: 'text',
    validation: {
      required: true,
      min: 1,
    },
  },
];

export const ${pascalCase}Template: WorkflowTemplate = {
  id: '${kebabCase}',
  name: '${pascalCase.replace(/([A-Z])/g, ' $1').trim()}',
  description: 'TODO: Add workflow description',
  eventName: 'workflow/${kebabCase}',
  canBeScheduled: true,
  requiredProviders: [], // TODO: Add required providers (e.g., [Provider.SLACK])
  requiredScopes: {},
  restrictedToUsers: ['*'],
  fields: ${pascalCase}Fields as unknown as JsonValue,
  tags: ['automation'], // TODO: Add relevant tags
  version: '1.0.0',
};

export const Workflow${pascalCase}InputSchema = z.object({
  exampleField: z.string().min(1),
  // TODO: Add more fields
});
export type Workflow${pascalCase}Input = z.infer<typeof Workflow${pascalCase}InputSchema>;

export const Workflow${pascalCase}EventSchema = z.object({
  input: Workflow${pascalCase}InputSchema,
  scheduledRun: z.boolean().optional(),
  workflowId: z.string(),
  cronExpression: z.string().nullable().optional(),
  tz: z.string().nullable().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  idempotency_key: z.string(),
});
export type Workflow${pascalCase}Event = z.infer<typeof Workflow${pascalCase}EventSchema>;
`;

async function createWorkflow() {
  try {
    await mkdir(workflowDir, { recursive: true });
    
    await writeFile(join(workflowDir, 'function.ts'), functionTemplate);
    await writeFile(join(workflowDir, 'metadata.ts'), metadataTemplate);

    console.log(`✅ Created workflow: ${kebabCase}`);
    console.log(`📁 Location: ${workflowDir}`);
    console.log(`\n📝 Next steps:`);
    console.log(`1. Edit ${kebabCase}/function.ts - Add your workflow logic`);
    console.log(`2. Edit ${kebabCase}/metadata.ts - Configure fields and metadata`);
    console.log(`3. Add to src/inngest/functions/index.ts:`);
    console.log(`   import { ${camelCase}Workflow } from "./${kebabCase}/function";`);
    console.log(`   // Add to workflowFunctions array: ${camelCase}Workflow`);
    console.log(`4. Run: pnpm update-templates`);
  } catch (error) {
    console.error('❌ Error creating workflow:', error);
    process.exit(1);
  }
}

createWorkflow();
