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
import { apiKeysApi, type ApiKey, type ApiKeyWithSecret } from '@/services/api/api-client';
import { toast } from 'sonner';
import { Copy, Key, Plus, Trash2, Eye, EyeOff, Check } from 'lucide-react';
import { formatDate } from '@/lib/format';

const CodeBlock = ({ code, language = 'bash' }: { code: string; language?: string }) => {
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
  <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Developer-only dialog shown on every page load */}
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-border/30">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-1">Duramation API</h1>
          <p className="text-base text-muted-foreground max-w-xl">
            Securely manage your API keys for triggering workflows from external systems. <br className="hidden md:block" />
                      </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} size="lg" disabled={creating || apiKeys.length >= 3} className="mt-4 md:mt-0 shadow-sm">
          <Plus className="mr-2 h-5 w-5" />
          {apiKeys.length >= 3 ? 'Limit reached' : creating ? 'Creating...' : 'Create API Key'}
        </Button>
      </div>

  {/* Main Content Layout */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1: API Documentation */}
        
  <Card className="lg:col-span-1 border border-border/50 shadow-sm hover:shadow-md transition-all duration-200">
    <CardHeader className="pb-4 border-b border-border/40">
      <CardTitle className="text-lg font-semibold flex items-center gap-2">
        🚀 Quick Start
      </CardTitle>
      <CardDescription className="text-sm text-muted-foreground">
        Copy & run these <code>curl</code> examples to interact with the API.
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-5">

      {/* Trigger Workflow */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold tracking-wide text-primary">
          Trigger a Workflow
        </h4>
        <CodeBlock
          language="bash"
          code={`curl -X POST ${baseUrl}/api/v1/workflows/<workflow_id>/trigger \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <api_key>" \\
  -d '{
    "input": {
      "key": "value"
    },
    "metadata": {
      "source": "api"
    }
  }'`}
        />
      </div>

      {/* Get Status */}
      <div className="space-y-5">
        <h4 className="text-sm font-semibold tracking-wide text-primary">
          Get Workflow Status
        </h4>
        <CodeBlock
          language="bash"
          code={`curl -X GET ${baseUrl}/api/v1/workflows/<workflow_id>/status \\
  -H "Authorization: Bearer <api_key>"`}
        />
      </div>

      {/* Example Response */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold tracking-wide text-primary">
          Workflow Status Example Response
        </h4>
        <CodeBlock
          language="json"
          code={`{
  "id": "workflow_run_123",
  "status": "running",
  "created_at": "2025-10-19T12:45:00Z"
}`}
        />
      </div>

    </CardContent>
  </Card>
        {/* Column 2 & 3: API Keys Management */}
        <div className="lg:col-span-2 space-y-4">
          {apiKeys.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Key className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No API keys yet</h3>
                <p className="text-muted-foreground text-sm mb-6 text-center max-w-sm">
                  Create your first API key to start triggering workflows from external applications
                </p>
                <Button onClick={() => setShowCreateDialog(true)} size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first API key
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {apiKeys.map((key) => (
                  <Card key={key.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3">{/* reduced padding */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">{/* tighter spacing */}
                            <h3 className="font-semibold text-sm truncate">{key.name}</h3>{/* smaller font */}
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">{/* smaller text */}
                            <div>
                              <span className="text-muted-foreground">Created:</span>
                              <span className="ml-2 font-medium">{formatDate(key.createdAt)}</span>
                            </div>
                            {key.lastUsedAt && (
                              <div>
                                <span className="text-muted-foreground">Last used:</span>
                                <span className="ml-2 font-medium">{formatDate(key.lastUsedAt)}</span>
                              </div>
                            )}
                            {key.expiresAt && (
                              <div>
                                <span className="text-muted-foreground">Expires:</span>
                                <span className="ml-2 font-medium">{formatDate(key.expiresAt)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteKey(key.id)}
                            className="text-destructive hover:text-destructive"
                            disabled={!!deletingKeyId}
                          >
                            {/* show spinner icon when deleting this key */}
                            {deletingKeyId === key.id ? (
                              <svg className="animate-spin h-4 w-4 text-destructive" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                              </svg>
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </div>
      </div>

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
