"""
Duramation API SDK Example

A simple Python SDK wrapper for the Duramation Public API

Usage:
    client = DuramationClient('dura_live_your_api_key')
    workflows = client.list_workflows()
    run = client.trigger_workflow('workflow_id', input={'email': 'test@example.com'})
"""

import os
import time
import requests
from typing import Dict, List, Optional, Any
from datetime import datetime


class DuramationError(Exception):
    """Base exception for Duramation API errors"""
    def __init__(self, message: str, status: int = None, details: List[str] = None):
        super().__init__(message)
        self.status = status
        self.details = details or []


class DuramationClient:
    """Client for interacting with the Duramation Public API"""
    
    def __init__(self, api_key: str, base_url: str = 'http://localhost:3001/api/v1'):
        """
        Initialize the Duramation client
        
        Args:
            api_key: Your Duramation API key (starts with dura_live_)
            base_url: Base URL for the API (default: http://localhost:3001/api/v1)
        """
        self.api_key = api_key
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        })
        self.session.timeout = 30
    
    def _request(self, method: str, endpoint: str, **kwargs) -> Dict[str, Any]:
        """
        Make an API request
        
        Args:
            method: HTTP method (GET, POST, etc.)
            endpoint: API endpoint (without base URL)
            **kwargs: Additional arguments to pass to requests
            
        Returns:
            Response data as dictionary
            
        Raises:
            DuramationError: If the request fails
        """
        url = f'{self.base_url}{endpoint}'
        
        try:
            response = self.session.request(method, url, **kwargs)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as e:
            error_data = e.response.json() if e.response else {}
            message = error_data.get('error', 'API request failed')
            details = error_data.get('details', [])
            raise DuramationError(message, e.response.status_code, details)
        except requests.exceptions.RequestException as e:
            raise DuramationError(f'Request failed: {str(e)}')
    
    def list_workflows(self) -> Dict[str, Any]:
        """
        List all available workflows
        
        Returns:
            Dictionary with 'data' (list of workflows) and 'pagination' info
        """
        return self._request('GET', '/workflows')
    
    def get_workflow(self, workflow_id: str) -> Dict[str, Any]:
        """
        Get a specific workflow's details
        
        Args:
            workflow_id: The workflow ID
            
        Returns:
            Dictionary with workflow details
        """
        return self._request('GET', f'/workflows/{workflow_id}/trigger')
    
    def trigger_workflow(
        self,
        workflow_id: str,
        input: Optional[Dict[str, Any]] = None,
        metadata: Optional[Dict[str, Any]] = None,
        timezone: Optional[str] = None,
        scheduled_run: bool = False
    ) -> Dict[str, Any]:
        """
        Trigger a workflow
        
        Args:
            workflow_id: The workflow ID
            input: Input data for the workflow
            metadata: Additional metadata
            timezone: Timezone for execution
            scheduled_run: Whether this is a scheduled run
            
        Returns:
            Dictionary with trigger response and run details
        """
        payload = {}
        if input is not None:
            payload['input'] = input
        if metadata is not None:
            payload['metadata'] = metadata
        if timezone is not None:
            payload['timezone'] = timezone
        if scheduled_run:
            payload['scheduledRun'] = scheduled_run
        
        return self._request(
            'POST',
            f'/workflows/{workflow_id}/trigger',
            json=payload
        )
    
    def get_workflow_runs(
        self,
        workflow_id: str,
        page: int = 1,
        limit: int = 10,
        status: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Get workflow run history
        
        Args:
            workflow_id: The workflow ID
            page: Page number
            limit: Results per page
            status: Filter by status (STARTED, RUNNING, COMPLETED, FAILED, CANCELLED)
            
        Returns:
            Dictionary with 'data' (list of runs) and 'pagination' info
        """
        params = {
            'page': page,
            'limit': limit,
        }
        if status:
            params['status'] = status
        
        return self._request(
            'GET',
            f'/workflows/{workflow_id}/runs',
            params=params
        )
    
    def get_workflow_run(self, workflow_id: str, run_id: str) -> Dict[str, Any]:
        """
        Get a specific run's details
        
        Args:
            workflow_id: The workflow ID
            run_id: The run ID
            
        Returns:
            Dictionary with run details
        """
        return self._request(
            'GET',
            f'/workflows/{workflow_id}/runs/{run_id}'
        )
    
    def wait_for_completion(
        self,
        workflow_id: str,
        run_id: str,
        interval: float = 2.0,
        timeout: float = 300.0
    ) -> Dict[str, Any]:
        """
        Wait for a workflow run to complete
        
        Args:
            workflow_id: The workflow ID
            run_id: The run ID
            interval: Polling interval in seconds (default: 2.0)
            timeout: Timeout in seconds (default: 300.0 = 5 minutes)
            
        Returns:
            Dictionary with completed run details
            
        Raises:
            DuramationError: If the run times out
        """
        start_time = time.time()
        terminal_states = {'COMPLETED', 'FAILED', 'CANCELLED'}
        
        while True:
            result = self.get_workflow_run(workflow_id, run_id)
            run = result['data']
            
            # Check if run is in terminal state
            if run['status'] in terminal_states:
                return result
            
            # Check timeout
            if time.time() - start_time > timeout:
                raise DuramationError(f'Workflow run timed out after {timeout}s')
            
            # Wait before next poll
            time.sleep(interval)


def main():
    """Example usage of the Duramation client"""
    
    # Initialize client
    api_key = os.getenv('DURAMATION_API_KEY', 'dura_live_your_key_here')
    client = DuramationClient(api_key)
    
    try:
        print('=== Listing Workflows ===')
        workflows = client.list_workflows()
        print(f"Found {len(workflows['data'])} workflows")
        for w in workflows['data']:
            print(f"- {w['name']} ({w['id']})")
        
        if not workflows['data']:
            print('No workflows found. Create one in the dashboard first.')
            return
        
        # Use the first workflow for demo
        workflow_id = workflows['data'][0]['id']
        print(f"\n=== Using workflow: {workflow_id} ===")
        
        # Get workflow details
        print('\n=== Getting Workflow Details ===')
        workflow = client.get_workflow(workflow_id)
        print(f"Workflow: {workflow['data']}")
        
        # Trigger the workflow
        print('\n=== Triggering Workflow ===')
        trigger_result = client.trigger_workflow(
            workflow_id,
            input={
                'email': 'test@example.com',
                'message': 'Test from Python SDK',
            },
            metadata={
                'source': 'python_sdk_example',
                'timestamp': datetime.now().isoformat(),
            }
        )
        print(f"Triggered: {trigger_result['data']}")
        
        run_id = trigger_result['data']['runId']
        
        # Wait for completion (optional)
        print('\n=== Waiting for Completion ===')
        try:
            completed_run = client.wait_for_completion(
                workflow_id,
                run_id,
                interval=2.0,
                timeout=60.0  # 1 minute
            )
            print(f"Completed: {completed_run['data']}")
        except DuramationError as e:
            print(f'Note: Waiting timed out or failed: {e}')
        
        # Get run history
        print('\n=== Getting Run History ===')
        runs = client.get_workflow_runs(
            workflow_id,
            page=1,
            limit=5,
            status='COMPLETED'
        )
        print(f"Found {runs['pagination']['total']} completed runs")
        for run in runs['data']:
            print(f"- {run['id']}: {run['status']} ({run['startedAt']})")
    
    except DuramationError as e:
        print(f'Error: {e}')
        if e.details:
            print(f'Details: {e.details}')
        if e.status:
            print(f'Status: {e.status}')


if __name__ == '__main__':
    main()
