import {ServiceRequest} from "@duramation/shared";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  HelpCircle,
  Link,
  MessageSquare,
  PlayCircle,
  Wrench,
  XCircle
} from "lucide-react";
import React from "react";

export const getStatusIcon = (status: ServiceRequest['status']) => {
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
export const getStatusColor = (status: ServiceRequest['status']) => {
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
export const getPriorityColor = (priority: ServiceRequest['priority']) => {
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
export const getCategoryIcon = (category: ServiceRequest['category']) => {
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
