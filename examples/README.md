# Duramation API Examples

This directory contains example code for integrating with the Duramation Public API.

## Available Examples

### JavaScript/Node.js SDK (`duramation-sdk-example.js`)

A complete SDK wrapper for the Duramation API with examples of all endpoints.

**Features:**
- List workflows
- Get workflow details
- Trigger workflows with input and metadata
- Get workflow run history
- Get specific run details
- Wait for workflow completion with polling

**Installation:**
```bash
npm install axios
```

**Usage:**
```bash
# Set your API key
export DURAMATION_API_KEY="dura_live_your_key_here"

# Run the example
node duramation-sdk-example.js
```

**As a Module:**
```javascript
const { DuramationClient } = require('./duramation-sdk-example');

const client = new DuramationClient('dura_live_your_key');

// List workflows
const workflows = await client.listWorkflows();

// Trigger a workflow
const run = await client.triggerWorkflow('workflow_id', {
  input: { email: 'test@example.com' },
  metadata: { source: 'my_app' }
});

// Wait for completion
const result = await client.waitForCompletion('workflow_id', run.data.runId);
```

### Python SDK (`duramation_sdk_example.py`)

A Python SDK wrapper with the same functionality as the JavaScript version.

**Features:**
- Type hints for better IDE support
- Custom exception handling
- Automatic retry logic
- Polling for workflow completion

**Installation:**
```bash
pip install requests
```

**Usage:**
```bash
# Set your API key
export DURAMATION_API_KEY="dura_live_your_key_here"

# Run the example
python duramation_sdk_example.py
```

**As a Module:**
```python
from duramation_sdk_example import DuramationClient

client = DuramationClient('dura_live_your_key')

# List workflows
workflows = client.list_workflows()

# Trigger a workflow
run = client.trigger_workflow(
    'workflow_id',
    input={'email': 'test@example.com'},
    metadata={'source': 'my_app'}
)

# Wait for completion
result = client.wait_for_completion('workflow_id', run['data']['runId'])
```

## Quick Start

1. **Create an API Key**
   - Go to your Duramation dashboard at `/dashboard/api-keys`
   - Click "Create API Key"
   - Give it a name and save the generated key

2. **Set Environment Variable**
   ```bash
   export DURAMATION_API_KEY="dura_live_your_key_here"
   ```

3. **Run an Example**
   ```bash
   # JavaScript
   node duramation-sdk-example.js
   
   # Python
   python duramation_sdk_example.py
   ```

## Common Use Cases

### 1. Trigger Workflow from CI/CD

```javascript
// In your CI/CD pipeline
const { DuramationClient } = require('./duramation-sdk-example');

const client = new DuramationClient(process.env.DURAMATION_API_KEY);

// Trigger deployment workflow
const run = await client.triggerWorkflow('deployment_workflow_id', {
  input: {
    environment: 'production',
    version: process.env.CI_COMMIT_TAG,
    branch: process.env.CI_COMMIT_BRANCH
  },
  metadata: {
    source: 'github_actions',
    commit: process.env.CI_COMMIT_SHA,
    author: process.env.CI_COMMIT_AUTHOR
  }
});

console.log(`Deployment started: ${run.data.runId}`);
```

### 2. Schedule Reports

```python
# In a cron job or scheduled task
from duramation_sdk_example import DuramationClient
import os

client = DuramationClient(os.getenv('DURAMATION_API_KEY'))

# Trigger daily report workflow
run = client.trigger_workflow(
    'daily_report_workflow_id',
    input={
        'report_type': 'daily',
        'recipients': ['team@company.com'],
        'date': datetime.now().strftime('%Y-%m-%d')
    },
    metadata={
        'source': 'cron_job',
        'scheduled': True
    }
)

print(f"Report generation started: {run['data']['runId']}")
```

### 3. Webhook Integration

```javascript
// In your webhook handler
app.post('/webhook/order-created', async (req, res) => {
  const { DuramationClient } = require('./duramation-sdk-example');
  const client = new DuramationClient(process.env.DURAMATION_API_KEY);
  
  const order = req.body;
  
  // Trigger order processing workflow
  const run = await client.triggerWorkflow('order_processing_workflow_id', {
    input: {
      orderId: order.id,
      customerId: order.customer_id,
      items: order.items,
      total: order.total
    },
    metadata: {
      source: 'webhook',
      webhook_id: req.headers['x-webhook-id']
    }
  });
  
  res.json({ success: true, runId: run.data.runId });
});
```

### 4. Monitor Workflow Status

```python
# Monitor and alert on workflow failures
from duramation_sdk_example import DuramationClient
import time

client = DuramationClient(os.getenv('DURAMATION_API_KEY'))

# Get recent runs
runs = client.get_workflow_runs(
    'critical_workflow_id',
    limit=10,
    status='FAILED'
)

# Alert if there are failures
if runs['data']:
    for run in runs['data']:
        print(f"ALERT: Workflow run {run['id']} failed!")
        print(f"Error: {run.get('error', 'Unknown error')}")
        # Send alert to monitoring system
```

## API Endpoints Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/workflows` | GET | List all workflows |
| `/workflows/:id/trigger` | GET | Get workflow status |
| `/workflows/:id/trigger` | POST | Trigger workflow |
| `/workflows/:id/runs` | GET | Get run history |
| `/workflows/:id/runs/:runId` | GET | Get run details |

## Error Handling

Both SDKs include comprehensive error handling:

**JavaScript:**
```javascript
try {
  const run = await client.triggerWorkflow('workflow_id', { input: {} });
} catch (error) {
  console.error('Error:', error.message);
  console.error('Status:', error.status);
  console.error('Details:', error.details);
}
```

**Python:**
```python
try:
    run = client.trigger_workflow('workflow_id', input={})
except DuramationError as e:
    print(f'Error: {e}')
    print(f'Status: {e.status}')
    print(f'Details: {e.details}')
```

## Best Practices

1. **Store API Keys Securely**
   - Use environment variables
   - Never commit keys to version control
   - Rotate keys regularly

2. **Handle Errors Gracefully**
   - Implement retry logic for transient failures
   - Log errors for debugging
   - Provide meaningful error messages to users

3. **Use Metadata**
   - Track the source of workflow triggers
   - Include correlation IDs for tracing
   - Add timestamps and user information

4. **Monitor Usage**
   - Check the "Last Used" timestamp in the dashboard
   - Review workflow run history regularly
   - Set up alerts for failures

5. **Test in Development**
   - Use separate API keys for dev/staging/production
   - Test error scenarios
   - Validate input data before triggering

## Support

For questions or issues:
- Check the [API Documentation](../apps/frontend/API_DOCUMENTATION.md)
- Review the [Testing Guide](../API_TESTING_GUIDE.md)
- Contact support with your workflow ID and run ID

## Contributing

Feel free to submit improvements to these examples via pull request!
