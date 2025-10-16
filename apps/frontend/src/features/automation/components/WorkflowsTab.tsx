'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import api from '@/services/api/api-client';
import { toast } from 'sonner';
import { WorkflowInputFieldDefinition } from '@duramation/shared';
import { WorkflowWithCredentials } from '@/types/workflow';
import WorkflowDetailWidget from './WorkflowDetailWidget';
import { MarketplaceResponse } from '@duramation/shared';

import {
  useWorkflowStatus,
  WorkflowStatusUpdate
} from '@/hooks/useWorkflowStatus';

import { WorkflowCard } from '@/components/automation/WorkflowCard';
import { BrowseMarketplaceCard } from '@/components/automation/BrowseMarketplaceCard';
import { WorkflowCardSkeleton } from '@/components/automation/WorkflowCardSkeleton';
import { NoWorkflowsFound } from '@/components/automation/NoWorkflowsFound';
import { sanitizeWorkflowsForUI } from '@/utils/workflow-sanitizer';

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

  // Track if current workflow has realtime data
  const [hasRealtimeData, setHasRealtimeData] = useState(false);



  const handleRealtimeUpdate = useCallback((data: WorkflowStatusUpdate) => {
    // Handle case where status might be undefined
    if (!data.status) {
      console.warn('Received status update with undefined status:', data);
      return;
    }

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
          marketplaceTemplates.data?.map((tpl) => [
            tpl.id,
            tpl.version
          ])
        );

        const workflowsWithVersionCheck = workflowData.map((workflow) => ({
          ...workflow,
          hasNewVersion:
            templateMap.has(workflow.templateId) &&
            templateMap.get(workflow.templateId) !== workflow.version
        }));

        // Sanitize workflows to remove technical data from UI
        setWorkflows(sanitizeWorkflowsForUI(workflowsWithVersionCheck));
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
      // Check if switching to a different workflow with realtime data
      if (selectedWorkflow && selectedWorkflow.id !== workflow.id && hasRealtimeData) {
        const confirmed = window.confirm(
          'Switching workflows will clear the current realtime logs. Are you sure you want to continue?'
        );
        if (!confirmed) {
          return; // User cancelled, don't switch
        }
      }

      setSelectedWorkflow(workflow);
      setIsWidgetOpen(true);
      setHasRealtimeData(false); // Reset for new workflow
      
      if (workflow.templateId) {
        setSelectedWorkflowTemplateFields(
          workflow.fields as unknown as WorkflowInputFieldDefinition[]
        );
      } else {
        setSelectedWorkflowTemplateFields(null);
      }
    },
    [selectedWorkflow, hasRealtimeData]
  );

  const handleCloseWidget = () => {
    // Check if closing with realtime data
    if (hasRealtimeData) {
      const confirmed = window.confirm(
        'Closing the panel will clear the current realtime logs. Are you sure you want to continue?'
      );
      if (!confirmed) {
        return; // User cancelled, don't close
      }
    }

    setIsWidgetOpen(false);
    setSelectedWorkflow(null);
    setHasRealtimeData(false);
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

      {/* Workflow Detail Widget - only render when a workflow is selected */}
      {/* Key by workflow.id to force remount when switching workflows, clearing realtime data */}
      {selectedWorkflow && (
        <WorkflowDetailWidget
          key={selectedWorkflow.id}
          workflow={selectedWorkflow}
          isOpen={isWidgetOpen}
          onCloseAction={handleCloseWidget}
          onUpdateAction={handleWorkflowUpdate}
          templateFields={selectedWorkflowTemplateFields}
          onRealtimeDataChange={setHasRealtimeData}
        />
      )}
    </div>
  );
}
