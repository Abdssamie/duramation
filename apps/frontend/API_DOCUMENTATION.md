# Duramation Public API Documentation

## Overview

The Duramation Public API allows you to trigger workflows programmatically using API keys. This enables external systems, scripts, and applications to integrate with your automation workflows.

## Authentication

All API requests must include an API key in the Authorization header:

```
Authorization: Bearer dura_live_<your_api_key>
```

### Creating an API Key

1. Navigate to **Dashboard > API Keys**
2. Click **Create API Key**
3. Enter a descriptive name (e.g., "Production Server", "CI/CD Pipeline")
4. Save the generated key immediately - it will only be shown once

### API Key Format

API keys follow the format: `dura_live_<random_string>`

## Endpoints

### Base URL

```
Production: https://your-domain.com/api/v1
Development: http://localhost:3001/api/v1
```

### 1. Trigger Workflow

Manually trigger a workflow execution.

**Endpoint:** `POST /workflows/:workflowId/trigger`

**Headers:**
```
Authorization: Bearer dura_live_<your_api_key>
Content-Type: application/json
```

**Request Body:**
```json
{
  "input": {
    "key1": "value1",
    "key2": "value2"
  },
  "scheduledRun": false,
  "timezone": "America/New_York",
  "metadata": {
    "source": "external_api",
    "requestId": "req_123"
  }
}
```

All fields are optional:
- `input`: Object containing workflow input parameters
- `scheduledRun`: Boolean indicating if this is a scheduled run (default: false)
- `timezone`: Timezone for the workflow execution (default: workflow's configured timezone)
- `metadata`: Additional metadata to attach to the run

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "runId": "run_1697712345678_abc123def",
    "workflowId": "clw9876543210",
    "workflowName": "workflow/email-report",
    "status": "pending",
    "startedAt": "2024-10-19T10:30:00.000Z",
    "input": {
      "key1": "value1",
      "key2": "value2"
    },
    "metadata": {
      "source": "external_api",
      "requestId": "req_123"
    }
  },
  "message": "Workflow triggered successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Workflow not found or not accessible"
}
```

**Response (Validation Error):**
```json
{
  "success": false,
  "error": "Invalid workflow input",
  "details": [
    "Field 'email' is required",
    "Field 'count' must be a number"
  ]
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad request (invalid input or JSON)
- `401` - Unauthorized (invalid or expired API key)
- `404` - Workflow not found or user not found
- `500` - Internal server error

### 2. Get Workflow Status

Retrieve the current status of a workflow.

**Endpoint:** `GET /workflows/:workflowId/trigger`

**Headers:**
```
Authorization: Bearer dura_live_<your_api_key>
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "clw9876543210",
    "name": "My Workflow",
    "description": "Workflow description",
    "status": "IDLE",
    "available": true,
    "lastRunAt": "2024-10-19T10:30:00.000Z",
    "nextRunAt": null
  }
}
```

### 3. List All Workflows

Get a list of all available workflows for your account.

**Endpoint:** `GET /workflows`

**Headers:**
```
Authorization: Bearer dura_live_<your_api_key>
```

**Response (Success):**
```json
{
  "success": true,
  "data": [
    {
      "id": "clw9876543210",
      "name": "Email Report Workflow",
      "description": "Sends daily email reports",
      "status": "IDLE",
      "templateId": "email-report-v1",
      "eventName": "workflow/email-report",
      "canBeScheduled": true,
      "lastRunAt": "2024-10-19T10:30:00.000Z",
      "nextRunAt": "2024-10-20T10:30:00.000Z",
      "createdAt": "2024-10-01T08:00:00.000Z",
      "updatedAt": "2024-10-19T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "limit": 5,
    "totalPages": 1
  }
}
```

### 4. Get Workflow Run History

Retrieve the execution history for a specific workflow.

**Endpoint:** `GET /workflows/:workflowId/runs`

**Headers:**
```
Authorization: Bearer dura_live_<your_api_key>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10)
- `status` (optional): Filter by status (STARTED, RUNNING, COMPLETED, FAILED, CANCELLED)

**Example:**
```
GET /workflows/clw9876543210/runs?page=1&limit=10&status=COMPLETED
```

**Response (Success):**
```json
{
  "success": true,
  "data": [
    {
      "id": "run_abc123",
      "inngestRunId": "01HXXX...",
      "status": "COMPLETED",
      "startedAt": "2024-10-19T10:30:00.000Z",
      "completedAt": "2024-10-19T10:31:00.000Z",
      "input": {
        "email": "user@example.com"
      },
      "output": {
        "success": true,
        "emailsSent": 1
      },
      "error": null,
      "version": "1.0.0"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### 5. Get Specific Run Details

Get detailed information about a specific workflow run.

**Endpoint:** `GET /workflows/:workflowId/runs/:runId`

**Headers:**
```
Authorization: Bearer dura_live_<your_api_key>
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "run_abc123",
    "inngestRunId": "01HXXX...",
    "status": "COMPLETED",
    "startedAt": "2024-10-19T10:30:00.000Z",
    "completedAt": "2024-10-19T10:31:00.000Z",
    "duration": 60000,
    "input": {
      "email": "user@example.com"
    },
    "output": {
      "success": true,
      "emailsSent": 1
    },
    "error": null,
    "version": "1.0.0",
    "realtimeData": [],
    "workflow": {
      "id": "clw9876543210",
      "name": "Email Report Workflow",
      "eventName": "workflow/email-report"
    }
  }
}
```

## Usage Examples

### cURL

```bash
# Trigger a workflow with input
curl -X POST \
  https://your-domain.com/api/v1/workflows/clw9876543210/trigger \
  -H "Authorization: Bearer dura_live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "email": "user@example.com",
      "action": "send_report"
    },
    "metadata": {
      "source": "cron_job",
      "environment": "production"
    }
  }'

# Trigger a workflow with minimal payload (uses workflow's default input)
curl -X POST \
  https://your-domain.com/api/v1/workflows/clw9876543210/trigger \
  -H "Authorization: Bearer dura_live_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{}'

# Get workflow status
curl -X GET \
  https://your-domain.com/api/v1/workflows/clw9876543210/trigger \
  -H "Authorization: Bearer dura_live_your_api_key_here"
```

### JavaScript/Node.js

```javascript
const axios = require('axios');

const API_KEY = 'dura_live_your_api_key_here';
const BASE_URL = 'https://your-domain.com/api/v1';
const WORKFLOW_ID = 'clw9876543210';

// Trigger workflow with full options
async function triggerWorkflow(input, options = {}) {
  try {
    const response = await axios.post(
      `${BASE_URL}/workflows/${WORKFLOW_ID}/trigger`,
      { 
        input,
        scheduledRun: options.scheduledRun || false,
        timezone: options.timezone || 'UTC',
        metadata: options.metadata || {}
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Workflow triggered:', response.data);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      console.error('Error details:', error.response.data);
    } else {
      console.error('Error triggering workflow:', error.message);
    }
    throw error;
  }
}

// Get workflow status
async function getWorkflowStatus() {
  try {
    const response = await axios.get(
      `${BASE_URL}/workflows/${WORKFLOW_ID}/trigger`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );
    
    console.log('Workflow status:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting workflow status:', error.response?.data || error.message);
    throw error;
  }
}

// Usage examples
// Basic trigger
triggerWorkflow({
  email: 'user@example.com',
  action: 'send_report'
});

// With metadata
triggerWorkflow(
  {
    email: 'user@example.com',
    action: 'send_report'
  },
  {
    metadata: {
      source: 'api',
      requestId: 'req_123'
    }
  }
);

// With timezone
triggerWorkflow(
  {
    email: 'user@example.com',
    action: 'send_report'
  },
  {
    timezone: 'America/New_York'
  }
);
```

### Python

```python
import requests
import json

API_KEY = 'dura_live_your_api_key_here'
BASE_URL = 'https://your-domain.com/api/v1'
WORKFLOW_ID = 'clw9876543210'

def trigger_workflow(input_data, metadata=None, timezone='UTC'):
    """Trigger a workflow with input data and optional metadata"""
    url = f'{BASE_URL}/workflows/{WORKFLOW_ID}/trigger'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    payload = {
        'input': input_data,
        'scheduledRun': False,
        'timezone': timezone
    }
    
    if metadata:
        payload['metadata'] = metadata
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        print('Workflow triggered:', result)
        return result
    except requests.exceptions.HTTPError as e:
        error_data = e.response.json() if e.response else {}
        print(f'Error triggering workflow: {error_data.get("error", str(e))}')
        if 'details' in error_data:
            print(f'Details: {error_data["details"]}')
        raise
    except requests.exceptions.RequestException as e:
        print(f'Error triggering workflow: {e}')
        raise

def get_workflow_status():
    """Get the current status of a workflow"""
    url = f'{BASE_URL}/workflows/{WORKFLOW_ID}/trigger'
    headers = {'Authorization': f'Bearer {API_KEY}'}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        print('Workflow status:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f'Error getting workflow status: {e}')
        raise

# Usage examples
# Basic trigger
trigger_workflow({
    'email': 'user@example.com',
    'action': 'send_report'
})

# With metadata
trigger_workflow(
    input_data={
        'email': 'user@example.com',
        'action': 'send_report'
    },
    metadata={
        'source': 'python_script',
        'environment': 'production'
    }
)

# With timezone
trigger_workflow(
    input_data={
        'email': 'user@example.com',
        'action': 'send_report'
    },
    timezone='America/New_York'
)
```

## Security Best Practices

1. **Keep API Keys Secret**: Never commit API keys to version control or expose them in client-side code
2. **Use Environment Variables**: Store API keys in environment variables or secure secret management systems
3. **Rotate Keys Regularly**: Create new API keys periodically and delete old ones
4. **Use Specific Keys**: Create separate API keys for different environments (dev, staging, production)
5. **Monitor Usage**: Check the "Last Used" timestamp in the dashboard to detect unauthorized access
6. **Deactivate Unused Keys**: Disable or delete API keys that are no longer needed

## Rate Limiting

Currently, there are no rate limits enforced. However, we recommend:
- Implementing exponential backoff for retries
- Avoiding excessive concurrent requests
- Caching workflow status when possible

## Error Handling

Always implement proper error handling in your integration:

```javascript
try {
  const result = await triggerWorkflow(input);
  // Handle success
  console.log('Run ID:', result.data.runId);
  console.log('Status:', result.data.status);
} catch (error) {
  if (error.response?.status === 400) {
    // Invalid input or JSON
    console.error('Validation errors:', error.response.data.details);
  } else if (error.response?.status === 401) {
    // Invalid or expired API key
    console.error('Authentication failed');
  } else if (error.response?.status === 404) {
    // Workflow not found or user not found
    console.error('Resource not found');
  } else if (error.response?.status === 500) {
    // Server error - retry with exponential backoff
    console.error('Server error - retrying...');
  }
}
```

## Support

For questions or issues with the API:
- Check workflow logs in the dashboard
- Review API key activity
- Contact support with your workflow ID and run ID

## Changelog

### Version 1.0.0 (2024-10-19)
- Initial release
- POST /workflows/:workflowId/trigger endpoint
- GET /workflows/:workflowId/trigger endpoint
- API key authentication
