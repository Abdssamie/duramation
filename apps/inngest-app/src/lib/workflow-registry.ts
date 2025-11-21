import { readdirSync, statSync } from 'fs';
import { join } from 'path';

interface WorkflowModule {
  [key: string]: any;
}

export class WorkflowRegistry {
  private workflowsPath: string;
  private systemPath: string;

  constructor() {
    this.workflowsPath = join(process.cwd(), 'src/inngest/functions');
    this.systemPath = join(this.workflowsPath, 'system');
  }

  async discoverWorkflows(): Promise<any[]> {
    const workflows: any[] = [];
    const entries = readdirSync(this.workflowsPath);

    for (const entry of entries) {
      const fullPath = join(this.workflowsPath, entry);
      
      // Skip files and system folder
      if (!statSync(fullPath).isDirectory() || entry === 'system') {
        continue;
      }

      // Try to load function.ts from workflow folder
      const functionPath = join(fullPath, 'function');
      try {
        const module: WorkflowModule = await import(functionPath);
        const workflowFunction = Object.values(module).find(
          (exp) => typeof exp === 'object' && exp !== null
        );
        
        if (workflowFunction) {
          workflows.push(workflowFunction);
        }
      } catch (error) {
        console.warn(`Failed to load workflow from ${entry}:`, error);
      }
    }

    return workflows;
  }

  async discoverSystemFunctions(): Promise<any[]> {
    const functions: any[] = [];
    
    try {
      const entries = readdirSync(this.systemPath);

      for (const entry of entries) {
        if (!entry.endsWith('.ts') && !entry.endsWith('.js')) {
          continue;
        }

        const functionPath = join(this.systemPath, entry.replace(/\.(ts|js)$/, ''));
        try {
          const module: WorkflowModule = await import(functionPath);
          Object.values(module).forEach((exp) => {
            if (typeof exp === 'object' && exp !== null) {
              functions.push(exp);
            }
          });
        } catch (error) {
          console.warn(`Failed to load system function from ${entry}:`, error);
        }
      }
    } catch (error) {
      console.warn('System functions directory not found');
    }

    return functions;
  }

  async discoverStandaloneFunctions(): Promise<any[]> {
    const functions: any[] = [];
    const standaloneFiles = [
      'automation-metrics-aggregation',
      'service-request-handler',
    ];

    for (const file of standaloneFiles) {
      const functionPath = join(this.workflowsPath, file);
      try {
        const module: WorkflowModule = await import(functionPath);
        Object.values(module).forEach((exp) => {
          if (typeof exp === 'object' && exp !== null) {
            functions.push(exp);
          }
        });
      } catch (error) {
        console.warn(`Failed to load standalone function ${file}:`, error);
      }
    }

    return functions;
  }

  async getAllFunctions(): Promise<any[]> {
    const [workflows, systemFns, standaloneFns] = await Promise.all([
      this.discoverWorkflows(),
      this.discoverSystemFunctions(),
      this.discoverStandaloneFunctions(),
    ]);

    return [...workflows, ...systemFns, ...standaloneFns];
  }
}

export const workflowRegistry = new WorkflowRegistry();
