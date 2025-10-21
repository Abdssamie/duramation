'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; 
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiKeysApi, workflowsApi, type ApiKey, type ApiKeyWithSecret } from '@/services/api/api-client';
import { toast } from 'sonner';
import { Copy, Key, Plus, Trash2, Eye, EyeOff, Check, Code2, Workflow as WorkflowIcon } from 'lucide-react';
import { formatDate } from '@/lib/format';
import type { Workflow } from '@duramation/shared';

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-muted/50 border rounded-lg p-4 text-sm overflow-x-auto">
        <code className="text-foreground">{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default function ApiKeysClient() {
  const { getToken } = useAuth();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDevDialog, setShowDevDialog] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [createdKey, setCreatedKey] = useState<ApiKeyWithSecret | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deletingKeyId, setDeletingKeyId] = useState<string | null>(null);

  useEffect(() => {
    loadApiKeys();
    loadWorkflows();
  }, []);

  const loadApiKeys = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const response = await apiKeysApi.list(token);
      if (response.success) {
        setApiKeys(response.data);
      }
    } catch (error) {
      toast.error('Failed to load API keys');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadWorkflows = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const response = await workflowsApi.list(token);
      if (response.success && response.data) {
        setWorkflows(response.data);
      }
    } catch (error) {
      console.error('Failed to load workflows:', error);
    }
  };

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast.error('Please enter a name for the API key');
      return;
    }

    try {
      setCreating(true);
      const token = await getToken();
      if (!token) {
        setCreating(false);
        return;
      }

      const response = await apiKeysApi.create(token, { name: newKeyName });
      if (response.success) {
        setCreatedKey(response.data);
        setNewKeyName('');
        setShowCreateDialog(false);
        loadApiKeys();
        toast.success('API key created successfully');
      }
    } catch (error) {
      toast.error('Failed to create API key');
      console.error(error);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteKey = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingKeyId(id);
      const token = await getToken();
      if (!token) {
        setDeletingKeyId(null);
        return;
      }

      const response = await apiKeysApi.remove(token, id);
      if (response.success) {
        loadApiKeys();
        toast.success('API key deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete API key');
      console.error(error);
    } finally {
      setDeletingKeyId(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3001';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Developer-only dialog */}
      <Dialog open={showDevDialog} onOpenChange={setShowDevDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Developer Only Page</DialogTitle>
            <DialogDescription>
              This page is intended for developers to manage API keys. Do not share keys with unauthorized users.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowDevDialog(false)}>I Understand</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
            <p className="text-muted-foreground mt-1">
              Manage API keys to trigger workflows from external systems
            </p>
          </div>
          <Button 
            onClick={() => setShowCreateDialog(true)} 
            disabled={creating || apiKeys.length >= 3}
          >
            <Plus className="mr-2 h-4 w-4" />
            {apiKeys.length >= 3 ? 'Limit reached' : 'Add new key'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="keys" className="w-full space-y-6">
        <TabsList>
          <TabsTrigger value="keys">
            <Key className="mr-2 h-4 w-4" />
            Secret Keys
          </TabsTrigger>
          <TabsTrigger value="workflows">
            <WorkflowIcon className="mr-2 h-4 w-4" />
            Your Workflows
          </TabsTrigger>
          <TabsTrigger value="docs">
            <Code2 className="mr-2 h-4 w-4" />
            API Reference
          </TabsTrigger>
        </TabsList>

        {/* Secret Keys Tab */}
        <TabsContent value="keys" className="w-full space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Secret keys</CardTitle>
              <CardDescription>
                Securely manage these sensitive keys. Do not share them with anyone. If you suspect a key has been compromised, delete it and create a new one.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {apiKeys.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Key className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-1">No API keys yet</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-sm">
                    Create your first API key to start triggering workflows from external applications
                  </p>
                  <Button onClick={() => setShowCreateDialog(true)} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Create your first API key
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {apiKeys.map((key) => (
                    <div 
                      key={key.id} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium truncate">{key.name}</h3>
                          {!key.isActive && (
                            <Badge variant="secondary" className="text-xs">Inactive</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span>Created {formatDate(key.createdAt)}</span>
                          {key.lastUsedAt && (
                            <span>Last used {formatDate(key.lastUsedAt)}</span>
                          )}
                          {key.expiresAt && (
                            <span>Expires {formatDate(key.expiresAt)}</span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteKey(key.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        disabled={!!deletingKeyId}
                      >
                        {deletingKeyId === key.id ? (
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                          </svg>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Your Workflows Tab */}
        <TabsContent value="workflows" className="w-full space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your workflows</CardTitle>
              <CardDescription>
                Copy workflow IDs and view field definitions for API integration. Use these field definitions to construct your API request input.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {workflows.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <WorkflowIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-1">No workflows installed</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Install workflows from the marketplace to start automating your tasks
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {workflows.map((workflow) => (
                    <div key={workflow.id} className="border-2 rounded-lg p-4 space-y-3 bg-card">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold mb-1">{workflow.name}</h3>
                          {workflow.description && (
                            <p className="text-sm text-muted-foreground mb-2">{workflow.description}</p>
                          )}
                          <div>
                           
                            <div className="flex items-center gap-2 inline-item">
                           <span className="text-s text-muted-foreground block mb-1"><b>Workflow ID:</b></span>
                             <Badge variant="outline" className="font-mono text-xs">
                                {workflow.id}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(workflow.id)}
                                className="h-6 px-2"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {workflow.fields && (
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="text-sm font-medium">Field Definitions</h4>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Use these field definitions to construct your API request input object
                              </p>
                            </div>
                          </div>
                          <CodeBlock
                            code={JSON.stringify(workflow.fields, null, 2)}
                          />
                          <Alert>
                            <AlertDescription className="text-xs">
                              <p><strong>Note:</strong> This shows the field schema structure. Your actual API request should use the <code className="bg-muted px-1 py-0.5 rounded inline-block">input</code> object with key-value pairs based on these field definitions.</p>
                            </AlertDescription>
                          </Alert>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Reference Tab */}
        <TabsContent value="docs" className="w-full space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>
                Base URL and example requests for the Duramation API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Base URL */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Workflow API URL</Label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-muted border rounded px-3 py-2 text-sm font-mono">
                    {baseUrl}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(baseUrl)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Trigger Workflow */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Trigger a Workflow</h4>
                <p className="text-xs text-muted-foreground">
                  Replace <code className="bg-muted px-1 py-0.5 rounded">&lt;workflow_id&gt;</code> with your workflow ID from the "Your Workflows" tab
                </p>
                <CodeBlock
                  code={`curl -X POST ${baseUrl}/api/v1/workflows/<workflow_id>/trigger \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <api_key>" \\
  -d '{
    "input": {
      "channel": "#general",
      "message": "Hello from API"
    },
    "metadata": {
      "source": "api"
    }
  }'`}
                />
                <Alert>
                  <AlertDescription className="text-xs">
                    <p><strong>Example:</strong> The <code className="bg-muted px-1 py-0.5 rounded inline">input</code> object contains key-value pairs based on your workflow's field definitions. For a Slack workflow with "channel" and "message" fields, you would provide those values as shown above.</p>
                  </AlertDescription>
                </Alert>
              </div>

              {/* Get Status */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Get Workflow Status</h4>
                <CodeBlock
                  code={`curl -X GET ${baseUrl}/api/v1/workflows/<workflow_id>/status \\
  -H "Authorization: Bearer <api_key>"`}
                />
              </div>

              {/* Example Response */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Example Response</h4>
                <CodeBlock
                  code={`{
  "id": "workflow_run_123",
  "status": "running",
  "created_at": "2025-10-19T12:45:00Z"
}`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
            <DialogDescription>
              Create a new API key to trigger workflows externally
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g., Production Server, CI/CD Pipeline"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreateKey()}
              />
              <p className="text-xs text-muted-foreground">
                Choose a descriptive name to identify where this key will be used
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)} disabled={creating}>
              Cancel
            </Button>
            <Button onClick={handleCreateKey} disabled={creating || apiKeys.length >= 3}>
              {creating ? (
                <>
                  <svg className="animate-spin mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Creating...
                </>
              ) : apiKeys.length >= 3 ? (
                'Limit reached'
              ) : (
                'Create API Key'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Show Created Key Dialog */}
      <Dialog open={!!createdKey} onOpenChange={() => setCreatedKey(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>API Key Created Successfully</DialogTitle>
            <DialogDescription>
              Save this key now - you won't be able to see it again!
            </DialogDescription>
          </DialogHeader>
          <Alert className="">
            <AlertDescription>
              <div className="space-y-3">
                <p className="text-sm font-medium">Your API Key:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-background border rounded p-3 text-sm break-all font-mono">
                    {showKey ? createdKey?.key : '••••••••••••••••••••••••••••••••••••••••••••••••'}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => createdKey && copyToClipboard(createdKey.key)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• Store this key in a secure location (e.g., environment variables)</p>
  
          </div>
          <DialogFooter>
            <Button onClick={() => setCreatedKey(null)} className="w-full">
              I've saved the key securely
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
