/**
 * Duramation API SDK Example
 * 
 * A simple JavaScript/Node.js SDK wrapper for the Duramation Public API
 * 
 * Usage:
 *   const client = new DuramationClient('dura_live_your_api_key');
 *   const workflows = await client.listWorkflows();
 *   const run = await client.triggerWorkflow('workflow_id', { email: 'test@example.com' });
 */

const axios = require('axios');

class DuramationClient {
  constructor(apiKey, baseUrl = 'http://localhost:3001/api/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const errorData = error.response.data;
          const message = errorData.error || 'API request failed';
          const details = errorData.details || [];
          
          const err = new Error(message);
          err.status = error.response.status;
          err.details = details;
          err.response = errorData;
          throw err;
        }
        throw error;
      }
    );
  }

  /**
   * List all available workflows
   * @returns {Promise<Array>} List of workflows
   */
  async listWorkflows() {
    const response = await this.client.get('/workflows');
    return response.data;
  }

  /**
   * Get a specific workflow's details
   * @param {string} workflowId - The workflow ID
   * @returns {Promise<Object>} Workflow details
   */
  async getWorkflow(workflowId) {
    const response = await this.client.get(`/workflows/${workflowId}/trigger`);
    return response.data;
  }

  /**
   * Trigger a workflow
   * @param {string} workflowId - The workflow ID
   * @param {Object} options - Trigger options
   * @param {Object} options.input - Input data for the workflow
   * @param {Object} options.metadata - Additional metadata
   * @param {string} options.timezone - Timezone for execution
   * @param {boolean} options.scheduledRun - Whether this is a scheduled run
   * @returns {Promise<Object>} Trigger response with run details
   */
  async triggerWorkflow(workflowId, options = {}) {
    const { input, metadata, timezone, scheduledRun } = options;
    
    const response = await this.client.post(
      `/workflows/${workflowId}/trigger`,
      {
        input,
        metadata,
        timezone,
        scheduledRun,
      }
    );
    
    return response.data;
  }

  /**
   * Get workflow run history
   * @param {string} workflowId - The workflow ID
   * @param {Object} options - Query options
   * @param {number} options.page - Page number
   * @param {number} options.limit - Results per page
   * @param {string} options.status - Filter by status
   * @returns {Promise<Object>} Run history with pagination
   */
  async getWorkflowRuns(workflowId, options = {}) {
    const { page = 1, limit = 10, status } = options;
    
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (status) params.append('status', status);
    
    const response = await this.client.get(
      `/workflows/${workflowId}/runs?${params.toString()}`
    );
    
    return response.data;
  }

  /**
   * Get a specific run's details
   * @param {string} workflowId - The workflow ID
   * @param {string} runId - The run ID
   * @returns {Promise<Object>} Run details
   */
  async getWorkflowRun(workflowId, runId) {
    const response = await this.client.get(
      `/workflows/${workflowId}/runs/${runId}`
    );
    
    return response.data;
  }

  /**
   * Wait for a workflow run to complete
   * @param {string} workflowId - The workflow ID
   * @param {string} runId - The run ID
   * @param {Object} options - Polling options
   * @param {number} options.interval - Polling interval in ms (default: 2000)
   * @param {number} options.timeout - Timeout in ms (default: 300000 = 5 minutes)
   * @returns {Promise<Object>} Completed run details
   */
  async waitForCompletion(workflowId, runId, options = {}) {
    const { interval = 2000, timeout = 300000 } = options;
    const startTime = Date.now();
    
    while (true) {
      const result = await this.getWorkflowRun(workflowId, runId);
      const run = result.data;
      
      // Check if run is in terminal state
      if (['COMPLETED', 'FAILED', 'CANCELLED'].includes(run.status)) {
        return result;
      }
      
      // Check timeout
      if (Date.now() - startTime > timeout) {
        throw new Error(`Workflow run timed out after ${timeout}ms`);
      }
      
      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }
}

// Example usage
async function main() {
  // Initialize client
  const client = new DuramationClient(
    process.env.DURAMATION_API_KEY || 'dura_live_your_key_here'
  );

  try {
    console.log('=== Listing Workflows ===');
    const workflows = await client.listWorkflows();
    console.log(`Found ${workflows.data.length} workflows`);
    workflows.data.forEach(w => {
      console.log(`- ${w.name} (${w.id})`);
    });

    if (workflows.data.length === 0) {
      console.log('No workflows found. Create one in the dashboard first.');
      return;
    }

    // Use the first workflow for demo
    const workflowId = workflows.data[0].id;
    console.log(`\n=== Using workflow: ${workflowId} ===`);

    // Get workflow details
    console.log('\n=== Getting Workflow Details ===');
    const workflow = await client.getWorkflow(workflowId);
    console.log('Workflow:', JSON.stringify(workflow.data, null, 2));

    // Trigger the workflow
    console.log('\n=== Triggering Workflow ===');
    const triggerResult = await client.triggerWorkflow(workflowId, {
      input: {
        email: 'test@example.com',
        message: 'Test from SDK',
      },
      metadata: {
        source: 'sdk_example',
        timestamp: new Date().toISOString(),
      },
    });
    console.log('Triggered:', JSON.stringify(triggerResult.data, null, 2));

    const runId = triggerResult.data.runId;

    // Wait for completion (optional)
    console.log('\n=== Waiting for Completion ===');
    try {
      const completedRun = await client.waitForCompletion(workflowId, runId, {
        interval: 2000,
        timeout: 60000, // 1 minute
      });
      console.log('Completed:', JSON.stringify(completedRun.data, null, 2));
    } catch (error) {
      console.log('Note: Waiting timed out or failed:', error.message);
    }

    // Get run history
    console.log('\n=== Getting Run History ===');
    const runs = await client.getWorkflowRuns(workflowId, {
      page: 1,
      limit: 5,
      status: 'COMPLETED',
    });
    console.log(`Found ${runs.pagination.total} completed runs`);
    runs.data.forEach(run => {
      console.log(`- ${run.id}: ${run.status} (${run.startedAt})`);
    });

  } catch (error) {
    console.error('Error:', error.message);
    if (error.details && error.details.length > 0) {
      console.error('Details:', error.details);
    }
    if (error.response) {
      console.error('Response:', error.response);
    }
  }
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

// Export for use as a module
module.exports = { DuramationClient };
