# API Testing Guide

Quick reference for testing the Duramation Public API.

## Prerequisites

1. Create an API key in the dashboard at `/dashboard/api-keys`
2. Get a workflow ID from `/dashboard/automation`
3. Set environment variables:
   ```bash
   export API_KEY="dura_live_your_key_here"
   export WORKFLOW_ID="your_workflow_id"
   export BASE_URL="http://localhost:3001/api/v1"
   ```

## Test Cases

### 1. Basic Workflow Trigger (Empty Body)

Uses the workflow's default input configuration.

```bash
curl -X POST \
  ${BASE_URL}/workflows/${WORKFLOW_ID}/trigger \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "runId": "run_...",
    "workflowId": "...",
    "workflowName": "...",
    "status": "pending",
    "startedAt": "2024-10-19T..."
  },
  "message": "Workflow triggered successfully"
}
```

### 2. Workflow Trigger with Custom Input

```bash
curl -X POST \
  ${BASE_URL}/workflows/${WORKFLOW_ID}/trigger \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "email": "test@example.com",
      "name": "Test User"
    }
  }'
```

### 3. Workflow Trigger with Metadata

```bash
curl -X POST \
  ${BASE_URL}/workflows/${WORKFLOW_ID}/trigger \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "email": "test@example.com"
    },
    "metadata": {
      "source": "test_script",
      "environment": "development",
      "requestId": "test_123"
    }
  }'
```

### 4. Workflow Trigger with Timezone

```bash
curl -X POST \
  ${BASE_URL}/workflows/${WORKFLOW_ID}/trigger \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "email": "test@example.com"
    },
    "timezone": "America/New_York"
  }'
```

### 5. Get Workflow Status

```bash
curl -X GET \
  ${BASE_URL}/workflows/${WORKFLOW_ID}/trigger \
  -H "Authorization: Bearer ${API_KEY}"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "My Workflow",
    "description": "...",
    "status": "IDLE",
    "available": true,
    "lastRunAt": "2024-10-19T...",
    "nextRunAt": null
  }
}
```

## Error Test Cases

### 1. Missing Authorization Header

```bash
curl -X POST \
  ${BASE_URL}/workflows/${WORKFLOW_ID}/trigger \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response (401):**
```json
{
  "success": false,
  "error": "Missing or invalid Authorization header. Use: Bearer <api_key>"
}
```

### 2. Invalid API Key

```bash
curl -X POST \
  ${BASE_URL}/workflows/${WORKFLOW_ID}/trigger \
  -H "Authorization: Bearer invalid_key" \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response (401):**
```json
{
  "success": false,
  "error": "Invalid or expired API key"
}
```

### 3. Invalid Workflow ID

```bash
curl -X POST \
  ${BASE_URL}/workflows/invalid_id/trigger \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response (404):**
```json
{
  "success": false,
  "error": "Workflow not found or not accessible"
}
```

### 4. Invalid JSON Body

```bash
curl -X POST \
  ${BASE_URL}/workflows/${WORKFLOW_ID}/trigger \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d 'invalid json'
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": "Invalid JSON in request body: ..."
}
```

### 5. Invalid Input (Validation Error)

Assuming the workflow requires an "email" field:

```bash
curl -X POST \
  ${BASE_URL}/workflows/${WORKFLOW_ID}/trigger \
  -H "Authorization: Bearer ${API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "invalid_field": "value"
    }
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "error": "Invalid workflow input",
  "details": [
    "Field 'email' is required"
  ]
}
```

## Node.js Test Script

Save as `test-api.js`:

```javascript
const axios = require('axios');

const API_KEY = process.env.API_KEY || 'dura_live_your_key';
const WORKFLOW_ID = process.env.WORKFLOW_ID || 'your_workflow_id';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3001/api/v1';

async function testTriggerWorkflow() {
  console.log('Testing workflow trigger...');
  
  try {
    const response = await axios.post(
      `${BASE_URL}/workflows/${WORKFLOW_ID}/trigger`,
      {
        input: {
          email: 'test@example.com',
          name: 'Test User'
        },
        metadata: {
          source: 'test_script',
          timestamp: new Date().toISOString()
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    throw error;
  }
}

async function testGetWorkflowStatus() {
  console.log('Testing get workflow status...');
  
  try {
    const response = await axios.get(
      `${BASE_URL}/workflows/${WORKFLOW_ID}/trigger`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );
    
    console.log('✅ Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    throw error;
  }
}

async function runTests() {
  console.log('Starting API tests...\n');
  
  await testGetWorkflowStatus();
  console.log('\n---\n');
  
  await testTriggerWorkflow();
  console.log('\n---\n');
  
  console.log('All tests completed!');
}

runTests().catch(console.error);
```

Run with:
```bash
npm install axios
node test-api.js
```

## Python Test Script

Save as `test_api.py`:

```python
import os
import requests
from datetime import datetime

API_KEY = os.getenv('API_KEY', 'dura_live_your_key')
WORKFLOW_ID = os.getenv('WORKFLOW_ID', 'your_workflow_id')
BASE_URL = os.getenv('BASE_URL', 'http://localhost:3001/api/v1')

def test_trigger_workflow():
    print('Testing workflow trigger...')
    
    url = f'{BASE_URL}/workflows/{WORKFLOW_ID}/trigger'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    payload = {
        'input': {
            'email': 'test@example.com',
            'name': 'Test User'
        },
        'metadata': {
            'source': 'test_script',
            'timestamp': datetime.now().isoformat()
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        print('✅ Success:', response.json())
        return response.json()
    except requests.exceptions.HTTPError as e:
        print('❌ Error:', e.response.json() if e.response else str(e))
        raise

def test_get_workflow_status():
    print('Testing get workflow status...')
    
    url = f'{BASE_URL}/workflows/{WORKFLOW_ID}/trigger'
    headers = {'Authorization': f'Bearer {API_KEY}'}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        print('✅ Success:', response.json())
        return response.json()
    except requests.exceptions.HTTPError as e:
        print('❌ Error:', e.response.json() if e.response else str(e))
        raise

def run_tests():
    print('Starting API tests...\n')
    
    test_get_workflow_status()
    print('\n---\n')
    
    test_trigger_workflow()
    print('\n---\n')
    
    print('All tests completed!')

if __name__ == '__main__':
    run_tests()
```

Run with:
```bash
pip install requests
python test_api.py
```

## Monitoring

After triggering workflows, you can monitor them in the dashboard:

1. Go to `/dashboard/automation`
2. Click on the workflow
3. View the "History" tab to see recent runs
4. Check the "Logs" tab for detailed execution logs

## Troubleshooting

### API Key Not Working
- Verify the key is active in `/dashboard/api-keys`
- Check that the key hasn't expired
- Ensure you're using the correct format: `Bearer dura_live_...`

### Workflow Not Found
- Verify the workflow ID is correct
- Check that the workflow belongs to the user who owns the API key
- Ensure the workflow is marked as "available"

### Input Validation Errors
- Check the workflow template's required fields
- Verify input types match the template definition
- Review the error details in the response

### Server Errors
- Check the backend logs for detailed error messages
- Verify the Inngest service is running
- Check database connectivity
