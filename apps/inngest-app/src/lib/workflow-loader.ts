/**
 * File-based workflow loader
 * 
 * Convention: Any folder in src/inngest/functions/ with a function.ts
 * will be automatically discovered and loaded.
 * 
 * For AI agents:
 * 1. Create folder: src/inngest/functions/my-new-workflow/
 * 2. Add function.ts with exported workflow
 * 3. Add metadata.ts with workflow config
 * 4. Restart server (automated via deployment)
 * 
 * No manual registry editing required!
 */

import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

interface WorkflowInfo {
  name: string;
  path: string;
  hasFunction: boolean;
  hasMetadata: boolean;
}

export function discoverWorkflowFolders(): WorkflowInfo[] {
  const functionsPath = join(process.cwd(), 'src/inngest/functions');
  const workflows: WorkflowInfo[] = [];

  try {
    const entries = readdirSync(functionsPath, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name === 'system') continue;
      if (entry.name.endsWith('.ts')) continue;

      const folderPath = join(functionsPath, entry.name);
      const functionPath = join(folderPath, 'function.ts');
      const metadataPath = join(folderPath, 'metadata.ts');

      workflows.push({
        name: entry.name,
        path: folderPath,
        hasFunction: existsSync(functionPath),
        hasMetadata: existsSync(metadataPath),
      });
    }
  } catch (error) {
    console.error('Failed to discover workflows:', error);
  }

  return workflows;
}

export function validateWorkflowStructure(): { valid: WorkflowInfo[]; invalid: WorkflowInfo[] } {
  const workflows = discoverWorkflowFolders();
  
  const valid = workflows.filter(w => w.hasFunction && w.hasMetadata);
  const invalid = workflows.filter(w => !w.hasFunction || !w.hasMetadata);

  if (invalid.length > 0) {
    console.warn('⚠️  Invalid workflow folders found:');
    invalid.forEach(w => {
      const missing = [];
      if (!w.hasFunction) missing.push('function.ts');
      if (!w.hasMetadata) missing.push('metadata.ts');
      console.warn(`  - ${w.name}: missing ${missing.join(', ')}`);
    });
  }

  console.log(`✓ Discovered ${valid.length} valid workflows`);
  
  return { valid, invalid };
}
