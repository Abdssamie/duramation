'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { workflowsApi } from '@/services/api/api-client';
import type { WorkflowRunData } from '@duramation/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const statusIcons = {
  pending: Play,
  started: Play,
  running: RefreshCw,
  completed: CheckCircle,
  failed: XCircle,
  cancelled: AlertCircle,
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  started: 'bg-blue-100 text-blue-800',
  running: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

export default function HistoryTab() {
  const { getToken } = useAuth();
  const [runs, setRuns] = useState<WorkflowRunData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedRun, setSelectedRun] = useState<WorkflowRunData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

const fetchHistory = useCallback(async (page = 1, status?: string) => {
  try {
      setLoading(true);
      const token = await getToken();
      if (!token) throw new Error('No authentication token');

      const params: any = { page, limit: 10 };
      if (status && status !== 'all') {
        params.status = status;
      }

      const response = await workflowsApi.history(token, params);

      if (response.success && response.data) {
        setRuns(response.data);
        setTotal(response.pagination?.total || 0);
        setTotalPages(response.pagination?.totalPages || 1);
        setCurrentPage(response.pagination?.page || 1);
      } else {
        throw new Error(response.error || 'Failed to fetch workflow history');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch workflow history');
    } finally {
      setLoading(false);
    }
  }, [getToken]);


  useEffect(() => {
    fetchHistory(1, statusFilter);
  }, [fetchHistory, statusFilter]);

  const handlePageChange = (page: number) => {
    fetchHistory(page, statusFilter);
  };

  const formatDuration = (startedAt: string, completedAt?: string) => {
    const start = new Date(startedAt);
    const end = completedAt ? new Date(completedAt) : new Date();
    const duration = end.getTime() - start.getTime();

    if (duration < 1000) return `${duration}ms`;
    if (duration < 60000) return `${Math.round(duration / 1000)}s`;
    if (duration < 3600000) return `${Math.round(duration / 60000)}m`;
    return `${Math.round(duration / 3600000)}h`;
  };

  if (loading && runs.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-6 w-6 animate-spin mr-3" />
        <span className="text-muted-foreground">Loading workflow history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
        <XCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
        <p className="text-red-700 font-medium mb-2">Error loading workflow history</p>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <Button
          variant="outline"
          onClick={() => fetchHistory(currentPage, statusFilter)}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-semibold">Workflow History</h2>
          {total > 0 && (
            <Badge variant="secondary" className="px-3 py-1">
              {total} total runs
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => fetchHistory(currentPage, statusFilter)}
            disabled={loading}
            className="ml-2"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Runs table */}
      {runs.length === 0 ? (
        <div className="text-center py-16">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">No workflow runs found</h3>
          <p className="text-sm text-muted-foreground">
            Trigger a workflow to see run history here.
          </p>
        </div>
      ) : (
        <div className="w-full rounded-lg border overflow-hidden">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-1/5 font-semibold">Workflow</TableHead>
                <TableHead className="w-1/6 font-semibold">Started</TableHead>
                <TableHead className="w-[100px] font-semibold">Duration</TableHead>
                <TableHead className="w-[110px] font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {runs.map((run) => {
                const StatusIcon = statusIcons[run.status] || Play;
                const hasOutput = run.output && Object.keys(run.output).length > 0;
                const successMessage = hasOutput 
                  ? (run.output?.message || run.output?.success || 'Workflow completed successfully')
                  : null;

                return (
                  <TableRow key={run.runId} className="hover:bg-muted/30">
                    <TableCell>
                      <StatusIcon className={`h-4 w-4 ${run.status === 'running' ? 'animate-spin' : ''}`} />
                    </TableCell>
                    <TableCell className="font-medium truncate" title={run.workflowName}>
                      {run.workflowName}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDistanceToNow(new Date(run.startedAt), { addSuffix: true })}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDuration(run.startedAt, run.completedAt)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${statusColors[run.status]} font-medium`}
                      >
                        {run.status}
                      </Badge>
                    </TableCell>
                    <TableCell 
                      className={run.error || (run.status === 'completed' && successMessage) ? 'cursor-pointer hover:bg-muted/50' : ''}
                      onClick={() => {
                        if (run.error || (run.status === 'completed' && successMessage)) {
                          setSelectedRun(run);
                          setIsDialogOpen(true);
                        }
                      }}
                    >
                      {run.error ? (
                        <div className="flex items-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                          <span className="text-sm text-red-600 truncate block max-w-[300px]">
                            {run.error}
                          </span>
                        </div>
                      ) : run.status === 'completed' ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-green-700 truncate block max-w-[300px]">
                            {successMessage || 'Workflow ran successfully'}
                          </span>
                        </div>
                      ) : run.status === 'running' ? (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 text-blue-500 animate-spin flex-shrink-0" />
                          <span className="text-sm text-blue-600">Running...</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1 || loading}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || loading}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Result Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedRun?.error ? (
                <>
                  <XCircle className="h-5 w-5" />
                  Workflow Error Details
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Workflow Success Details
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedRun?.workflowName} • Run ID: {selectedRun?.runId}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Execution Info */}
            <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Started</p>
                <p className="text-sm font-medium">
                  {selectedRun?.startedAt && new Date(selectedRun.startedAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Duration</p>
                <p className="text-sm font-medium">
                  {selectedRun && formatDuration(selectedRun.startedAt, selectedRun.completedAt)}
                </p>
              </div>
            </div>

            {/* Error or Success Message */}
            {selectedRun?.error ? (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Error Message</h4>
                <div className="rounded-lg border p-4">
                  <pre className="text-sm text-destructive whitespace-pre-wrap break-words font-mono">
                    {selectedRun.error}
                  </pre>
                </div>
              </div>
            ) : selectedRun?.output ? (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Success Message</h4>
                <div className="rounded-lg border p-4">
                  <p className="text-sm">
                    {selectedRun.output?.message || selectedRun.output?.success || 'Workflow completed successfully'}
                  </p>
                </div>

                {/* Output Data */}
                {Object.keys(selectedRun.output).length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Output Data</h4>
                    <div className="rounded-lg border p-4">
                      <pre className="text-xs whitespace-pre-wrap break-words font-mono">
                        {JSON.stringify(selectedRun.output, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Input Data */}
            {selectedRun?.input && Object.keys(selectedRun.input).length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Input Parameters</h4>
                <div className="rounded-lg border p-4">
                  <pre className="text-xs whitespace-pre-wrap break-words font-mono">
                    {JSON.stringify(selectedRun.input, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}