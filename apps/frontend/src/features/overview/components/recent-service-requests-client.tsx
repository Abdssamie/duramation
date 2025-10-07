'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ServiceRequest, ServiceRequestsResponse } from '@duramation/shared';
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageSquare,
  MoreHorizontal,
  PlayCircle,
  Plus,
  User,
  XCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ServiceRequestDialog } from '@/components/dialogs/service-request-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@clerk/nextjs';
import { dashboardApi } from '@/services/api/api-client';
import {
        getCategoryIcon,
        getPriorityColor,
        getStatusColor,
        getStatusIcon
} from '@/utils/recent-service-requests';

interface RecentServiceRequestsClientProps {
  data: ServiceRequestsResponse;
}

export function RecentServiceRequestsClient({ data }: RecentServiceRequestsClientProps) {
  const { getToken } = useAuth();
  
  // Sort by most recent first
  const recentRequests = data.requests
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const nextRequest = () => {
    setCurrentIndex((prev) => (prev + 1) % recentRequests.length);
  };

  const prevRequest = () => {
    setCurrentIndex((prev) => (prev - 1 + recentRequests.length) % recentRequests.length);
  };

  const currentRequest = recentRequests.length > 0 ? recentRequests[currentIndex] : null;

  const updateRequestStatus = async (requestId: string, newStatus: ServiceRequest['status']) => {
    try {
      setIsUpdating(true);
      const token = await getToken();

      if (token) {
        await dashboardApi.updateServiceRequest(token, {
          id: requestId,
          status: newStatus
        });

        // Refresh the page to show updated data
        window.location.reload();
      } else {
        console.error('Authentication required');
        // You could add a toast notification here
      }

    } catch (error) {
      console.error('Error updating service request:', error);
      // You could add a toast notification here
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Service Requests
          </span>
          <ServiceRequestDialog
            onSuccess={() => window.location.reload()}
            trigger={
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                New Request
              </Button>
            }
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentRequests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No service requests found</p>
          </div>
        ) : currentRequest ? (
          <div className="space-y-4">
            {/* Current Request Display */}
            <div className="flex items-start space-x-4 p-4 rounded-lg border bg-card">
              <div className="flex-shrink-0">
                <div className={`p-3 rounded-full ${getCategoryIcon(currentRequest.category) ? 'bg-primary/10' : 'bg-gray-100'}`}>
                  {getCategoryIcon(currentRequest.category)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-medium text-foreground">
                        {currentRequest.title}
                      </h4>
                      {/* Navigation inside the request */}
                      {recentRequests.length > 1 && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={prevRequest}
                            className="h-7 w-7 p-0"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <span className="text-xs text-muted-foreground">
                            {currentIndex + 1} of {recentRequests.length}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={nextRequest}
                            className="h-7 w-7 p-0"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                      {currentRequest.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 ml-4">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-sm ${getStatusColor(currentRequest.status)}`}
                      >
                        {getStatusIcon(currentRequest.status)}
                        <span className="ml-1 capitalize">{currentRequest.status.replace('_', ' ')}</span>
                      </Badge>
                      
                      {/* Status Update Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            disabled={isUpdating}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => updateRequestStatus(currentRequest.id, 'pending')}
                            disabled={currentRequest.status === 'pending'}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            Mark as Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateRequestStatus(currentRequest.id, 'in_progress')}
                            disabled={currentRequest.status === 'in_progress'}
                          >
                            <PlayCircle className="h-4 w-4 mr-2" />
                            Mark as In Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateRequestStatus(currentRequest.id, 'completed')}
                            disabled={currentRequest.status === 'completed'}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateRequestStatus(currentRequest.id, 'cancelled')}
                            disabled={currentRequest.status === 'cancelled'}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Mark as Cancelled
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <Badge
                      variant="outline"
                      className={`text-sm ${getPriorityColor(currentRequest.priority)}`}
                    >
                      {currentRequest.priority}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{currentRequest.requestedBy}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    {currentRequest.estimatedHours && (
                      <span>{currentRequest.estimatedHours}h</span>
                    )}
                    <span>
                      {formatDistanceToNow(new Date(currentRequest.updatedAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}