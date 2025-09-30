'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import api from '@/services/api/api-client';
import { toast } from 'sonner';
import { WorkflowInputFieldDefinition } from '@duramation/shared';
import { WorkflowWithCredentials } from '@/types/workflow';
import WorkflowDetailWidget from './WorkflowDetailWidget';
import {
  MarketplaceResponse,
  MarketplaceQuery
} from '@/services/api/api-client';

import {
  useWorkflowStatus,
  WorkflowStatusUpdate
} from '@/hooks/useWorkflowStatus';
import { WorkflowCard } from '@/components/automation/WorkflowCard';
import { BrowseMarketplaceCard } from '@/components/automation/BrowseMarketplaceCard';
import { WorkflowCardSkeleton } from '@/components/automation/WorkflowCardSkeleton';
import { NoWorkflowsFound } from '@/components/automation/NoWorkflowsFound';

type WorkflowStatus = 'IDLE' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export default function WorkflowsTab() {
  const { getToken: _getToken, isLoaded } = useAuth();
  const getToken = useCallback(() => _getToken(), [_getToken]);

  const [workflows, setWorkflows] = useState<WorkflowWithCredentials[]>([]);

  const [loading, setLoading] = useState(true);
  const [selectedWorkflow, setSelectedWorkflow] =
    useState<WorkflowWithCredentials | null>(null);

  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  const [selectedWorkflowTemplateFields, setSelectedWorkflowTemplateFields] =
    useState<WorkflowInputFieldDefinition[] | null>(null);

  const handleRealtimeUpdate = useCallback((data: WorkflowStatusUpdate) => {
    const newStatus = data.status.toUpperCase() as WorkflowStatus;

    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id === data.workflowId) {
          return {
            ...w,
            status: newStatus
          };
        }
        return w;
      })
    );

    setSelectedWorkflow((prev) => {
      if (prev && prev.id === data.workflowId) {
        return { ...prev, status: newStatus };
      }
      return prev;
    });

    if (data.status === 'COMPLETED') {
      toast.success('Workflow completed successfully!');
    } else if (data.status === 'FAILED') {
      toast.error(`Workflow failed: ${data.error || 'Unknown error'}`);
    }
  }, []);

  useWorkflowStatus(handleRealtimeUpdate);

  useEffect(() => {
    if (!isLoaded) return; // wait for Clerk

    const loadWorkflows = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const list = await api.workflows.list(token);
        const workflowData: WorkflowWithCredentials[] = Array.isArray(
          list?.data
        )
          ? (list.data as WorkflowWithCredentials[])
          : [];

        // Fetch marketplace templates to compare versions
        const marketplaceTemplates: MarketplaceResponse =
          await api.workflows.listTemplates(token);
        const templateMap = new Map(
          marketplaceTemplates.data?.items.map((tpl: any) => [
            tpl.id,
            tpl.version
          ])
        );

        setWorkflows(
          workflowData.map((workflow) => ({
            ...workflow,
            hasNewVersion:
              templateMap.has(workflow.templateId) &&
              templateMap.get(workflow.templateId) !== workflow.version
          }))
        );
      } catch (error) {
        console.debug(error);
        toast.error('Failed to load workflows');
      } finally {
        setLoading(false);
      }
    };

    loadWorkflows();
  }, [isLoaded, getToken]);

  const handleWorkflowUpdate = (
    id: string,
    update: Partial<WorkflowWithCredentials>
  ) => {
    setWorkflows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, ...update } : w))
    );

    // Update selected workflow if it's the one being updated
    if (selectedWorkflow && selectedWorkflow.id === id) {
      setSelectedWorkflow((prev) => (prev ? { ...prev, ...update } : null));
    }

    // Status updates are now handled by the realtime workflow status hook
  };

  const handleOpenDetails = useCallback(
    async (workflow: WorkflowWithCredentials) => {
      setSelectedWorkflow(workflow);
      setIsWidgetOpen(true);
      if (workflow.templateId) {
        setSelectedWorkflowTemplateFields(
          workflow.fields as unknown as WorkflowInputFieldDefinition[]
        );
      } else {
        setSelectedWorkflowTemplateFields(null);
      }
    },
    []
  );

  const handleCloseWidget = () => {
    setIsWidgetOpen(false);
    setSelectedWorkflow(null);
  };

  if (loading) {
    return (
      <div className='w-full'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, index) => (
            <WorkflowCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (workflows.length === 0) {
    return <NoWorkflowsFound />;
  }

  return (
    <div className='relative w-full'>
      {/* Main content area */}
      <div
        className={`transition-all duration-300 ${isWidgetOpen ? 'lg:mr-90' : ''}`}
      >
        <div
          className={`grid gap-4 sm:grid-cols-2 ${isWidgetOpen ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} transition-all duration-300`}
        >
          {workflows.map((workflow) => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              onOpenDetails={handleOpenDetails}
              hasNewVersion={workflow.hasNewVersion}
            />
          ))}
          <BrowseMarketplaceCard />
        </div>
      </div>

      {/* Workflow Detail Widget */}
      <WorkflowDetailWidget
        workflow={selectedWorkflow}
        isOpen={isWidgetOpen}
        onCloseAction={handleCloseWidget}
        onUpdateAction={handleWorkflowUpdate}
        templateFields={selectedWorkflowTemplateFields}
      />
    </div>
  );
}
