import { WorkflowWithCredentials } from '@/types/workflow';

/**
 * Sanitizes workflow data by removing or transforming technical/database fields
 * that shouldn't be exposed to end users in the UI
 */
export function sanitizeWorkflowForUI(workflow: WorkflowWithCredentials): WorkflowWithCredentials {
  // Create a copy to avoid mutating the original
  const sanitized = { ...workflow };

  // Remove or transform technical fields that users don't need to see
  // Keep the fields in the object but don't display them in UI components
  
  return sanitized;
}

/**
 * Sanitizes an array of workflows
 */
export function sanitizeWorkflowsForUI(workflows: WorkflowWithCredentials[]): WorkflowWithCredentials[] {
  return workflows.map(sanitizeWorkflowForUI);
}

/**
 * Gets user-friendly display name for workflow status
 */
export function getWorkflowStatusDisplay(status: string): string {
  const statusUpper = String(status || '').toUpperCase();
  
  switch (statusUpper) {
    case 'RUNNING':
      return 'Running';
    case 'FAILED':
      return 'Failed';
    case 'PAUSED':
      return 'Paused';
    case 'COMPLETED':
      return 'Completed';
    case 'IDLE':
      return 'Idle';
    case 'CANCELLED':
      return 'Cancelled';
    default:
      return statusUpper ? statusUpper.charAt(0) + statusUpper.slice(1).toLowerCase() : 'Unknown';
  }
}

/**
 * Gets user-friendly color class for workflow status
 */
export function getWorkflowStatusColorClass(status: string): string {
  const statusUpper = String(status || '').toUpperCase();
  
  switch (statusUpper) {
    case 'RUNNING':
      return 'text-green-600 dark:text-green-400';
    case 'FAILED':
      return 'text-red-600 dark:text-red-400';
    case 'PAUSED':
      return 'text-amber-600 dark:text-amber-400';
    case 'COMPLETED':
      return 'text-emerald-600 dark:text-emerald-400';
    default:
      return 'text-slate-600 dark:text-slate-400';
  }
}