import { InngestMiddleware } from 'inngest';
import { BusinessOutcomeService } from '@/services/business-outcomes';
import type { BusinessOutcomeType } from '@duramation/db/types';

/**
 * Middleware to automatically capture business outcomes from workflow executions
 * This middleware listens to workflow completion events and extracts business metrics
 */
export const businessOutcomeMiddleware = new InngestMiddleware({
  name: 'Business Outcome Tracker',
  init() {
    return {
      onFunctionRun({ fn, ctx }) {
        return {
          transformOutput({ result }) {
            // Only process if the function completed successfully
            if (result.error) {
              return;
            }

            // Extract business outcomes from the function result
            const outcomes = extractBusinessOutcomes(result.data, ctx);
            
            // Asynchronously record business outcomes
            if (outcomes.length > 0) {
              recordBusinessOutcomes(outcomes, ctx).catch(error => {
                console.error('Failed to record business outcomes:', error);
              });
            }
          }
        };
      }
    };
  }
});

/**
 * Extract business outcomes from workflow execution results
 */
function extractBusinessOutcomes(
  result: any, 
  ctx: any
): Array<{
  outcomeType: BusinessOutcomeType;
  value: number;
  metadata?: Record<string, any>;
}> {
  const outcomes: Array<{
    outcomeType: BusinessOutcomeType;
    value: number;
    metadata?: Record<string, any>;
  }> = [];

  if (!result || typeof result !== 'object') {
    return outcomes;
  }

  // Look for business outcome indicators in the result
  
  // Check for explicit business outcomes
  if (result.businessOutcomes && Array.isArray(result.businessOutcomes)) {
    outcomes.push(...result.businessOutcomes);
  }

  // Check for common business outcome patterns
  
  // Leads generated
  if (result.leadsGenerated || result.leads_generated) {
    outcomes.push({
      outcomeType: 'LEADS_GENERATED' as BusinessOutcomeType,
      value: Number(result.leadsGenerated || result.leads_generated),
      metadata: {
        source: 'workflow_result',
        extractedFrom: 'leadsGenerated'
      }
    });
  }

  // Orders processed
  if (result.ordersProcessed || result.orders_processed) {
    outcomes.push({
      outcomeType: 'ORDERS_PROCESSED' as BusinessOutcomeType,
      value: Number(result.ordersProcessed || result.orders_processed),
      metadata: {
        source: 'workflow_result',
        extractedFrom: 'ordersProcessed'
      }
    });
  }

  // Tickets resolved
  if (result.ticketsResolved || result.tickets_resolved) {
    outcomes.push({
      outcomeType: 'TICKETS_RESOLVED' as BusinessOutcomeType,
      value: Number(result.ticketsResolved || result.tickets_resolved),
      metadata: {
        source: 'workflow_result',
        extractedFrom: 'ticketsResolved'
      }
    });
  }

  // Custom metrics
  if (result.customMetrics && typeof result.customMetrics === 'object') {
    Object.entries(result.customMetrics).forEach(([key, value]) => {
      if (typeof value === 'number') {
        outcomes.push({
          outcomeType: 'CUSTOM' as BusinessOutcomeType,
          value: value,
          metadata: {
            source: 'workflow_result',
            extractedFrom: 'customMetrics',
            customMetricName: key
          }
        });
      }
    });
  }

  // Look for array results that might indicate processed items
  if (Array.isArray(result.processedItems)) {
    outcomes.push({
      outcomeType: 'CUSTOM' as BusinessOutcomeType,
      value: result.processedItems.length,
      metadata: {
        source: 'workflow_result',
        extractedFrom: 'processedItems',
        customMetricName: 'items_processed'
      }
    });
  }

  // Look for success counts
  if (result.successCount && typeof result.successCount === 'number') {
    outcomes.push({
      outcomeType: 'CUSTOM' as BusinessOutcomeType,
      value: result.successCount,
      metadata: {
        source: 'workflow_result',
        extractedFrom: 'successCount',
        customMetricName: 'successful_operations'
      }
    });
  }

  return outcomes;
}

/**
 * Record business outcomes in the database
 */
async function recordBusinessOutcomes(
  outcomes: Array<{
    outcomeType: BusinessOutcomeType;
    value: number;
    metadata?: Record<string, any>;
  }>,
  ctx: any
) {
  try {
    // Get workflow ID from context
    const workflowId = getWorkflowIdFromContext(ctx);
    
    if (!workflowId) {
      console.warn('Could not determine workflow ID from context, skipping business outcome recording');
      return;
    }

    // Record each business outcome
    for (const outcome of outcomes) {
      await BusinessOutcomeService.createBusinessOutcome({
        workflowId,
        outcomeType: outcome.outcomeType,
        value: outcome.value,
        metadata: {
          ...outcome.metadata,
          recordedAt: new Date().toISOString(),
          functionName: ctx.fn?.name,
          runId: ctx.runId
        }
      });
    }

    console.log(`Recorded ${outcomes.length} business outcomes for workflow ${workflowId}`);
  } catch (error) {
    console.error('Error recording business outcomes:', error);
    throw error;
  }
}

/**
 * Extract workflow ID from Inngest context
 */
function getWorkflowIdFromContext(ctx: any): string | null {
  // Try to get workflow ID from event data
  if (ctx.event?.data?.workflowId) {
    return ctx.event.data.workflowId;
  }

  // Try to get from function name (if it follows a pattern)
  if (ctx.fn?.name) {
    // Look for workflow ID in function name or metadata
    const functionName = ctx.fn.name;
    
    // If function name contains workflow ID pattern
    const workflowIdMatch = functionName.match(/workflow-([a-zA-Z0-9]+)/);
    if (workflowIdMatch) {
      return workflowIdMatch[1];
    }
  }

  // Try to get from step context or other sources
  if (ctx.step?.workflowId) {
    return ctx.step.workflowId;
  }

  return null;
}

/**
 * Helper function to manually record business outcomes from within workflow functions
 */
export async function recordBusinessOutcome(
  workflowId: string,
  outcomeType: BusinessOutcomeType,
  value: number,
  metadata?: Record<string, any>
) {
  return await BusinessOutcomeService.createBusinessOutcome({
    workflowId,
    outcomeType,
    value,
    metadata: {
      ...metadata,
      recordedAt: new Date().toISOString(),
      source: 'manual_recording'
    }
  });
}

/**
 * Helper function to record multiple business outcomes at once
 */
export async function recordMultipleBusinessOutcomes(
  workflowId: string,
  outcomes: Array<{
    outcomeType: BusinessOutcomeType;
    value: number;
    metadata?: Record<string, any>;
  }>
) {
  const results = [];
  
  for (const outcome of outcomes) {
    const result = await recordBusinessOutcome(
      workflowId,
      outcome.outcomeType,
      outcome.value,
      outcome.metadata
    );
    results.push(result);
  }
  
  return results;
}