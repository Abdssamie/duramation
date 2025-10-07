'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ServiceRequestsResponse, ServiceRequest } from '@duramation/shared';
import { 
  Clock, 
  User, 
  AlertCircle, 
  CheckCircle, 
  PlayCircle, 
  XCircle,
  Wrench,
  Link,
  HelpCircle,
  MessageSquare,
  Plus
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ServiceRequestDialog } from '@/components/dialogs/service-request-dialog';

const getStatusIcon = (status: ServiceRequest['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4" />;
    case 'in_progress':
      return <PlayCircle className="h-4 w-4" />;
    case 'completed':
      return <CheckCircle className="h-4 w-4" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getStatusColor = (status: ServiceRequest['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPriorityColor = (priority: ServiceRequest['priority']) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getCategoryIcon = (category: ServiceRequest['category']) => {
  switch (category) {
    case 'automation':
      return <Wrench className="h-4 w-4" />;
    case 'integration':
      return <Link className="h-4 w-4" />;
    case 'support':
      return <HelpCircle className="h-4 w-4" />;
    case 'consultation':
      return <MessageSquare className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

interface RecentServiceRequestsClientProps {
  data: ServiceRequestsResponse;
}

export function RecentServiceRequestsClient({ data }: RecentServiceRequestsClientProps) {
  // Sort by most recent first and take top 5
  const recentRequests = data.requests
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Service Requests
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{data.pendingCount} pending</span>
              <span>{data.inProgressCount} in progress</span>
            </div>
            <ServiceRequestDialog 
              onSuccess={() => window.location.reload()}
              trigger={
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  New Request
                </Button>
              }
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-start space-x-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className={`p-2 rounded-full ${getCategoryIcon(request.category) ? 'bg-primary/10' : 'bg-gray-100'}`}>
                  {getCategoryIcon(request.category)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {request.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {request.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1 ml-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(request.status)}`}
                    >
                      {getStatusIcon(request.status)}
                      <span className="ml-1 capitalize">{request.status.replace('_', ' ')}</span>
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(request.priority)}`}
                    >
                      {request.priority}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{request.requestedBy}</span>
                    </div>
                    {request.assignedTo && (
                      <div className="flex items-center gap-1">
                        <Avatar className="h-4 w-4">
                          <AvatarFallback className="text-xs">
                            {getInitials(request.assignedTo)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{request.assignedTo}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {request.estimatedHours && (
                      <span>{request.estimatedHours}h</span>
                    )}
                    <span>
                      {formatDistanceToNow(new Date(request.updatedAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {recentRequests.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No service requests found</p>
            </div>
          )}
        </div>
        
        {/* Summary Stats */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">
                {data.totalCount}
              </div>
              <div className="text-xs text-muted-foreground">Total Requests</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {data.completedThisMonth}
              </div>
              <div className="text-xs text-muted-foreground">Completed This Month</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                {data.inProgressCount}
              </div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}