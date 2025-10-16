import {Activity, AlertCircle, BarChart3, CheckCircle, Info} from "lucide-react";

export const getLogIcon = (type: string) => {
  switch (type) {
    case 'error':
      return <AlertCircle className='h-3 w-3' />;
    case 'status':
      return <Info className='h-3 w-3' />;
    case 'progress':
      return <BarChart3 className='h-3 w-3' />;
    case 'log':
      return <Activity className='h-3 w-3' />;
    case 'result':
      return <CheckCircle className='h-3 w-3' />;
    default:
      return <Activity className='h-3 w-3' />;
  }
};
export const getLogColor = (type: string) => {
  switch (type) {
    case 'error':
      return 'text-red-600 dark:text-red-400';
    case 'status':
      return 'text-green-600 dark:text-green-400';
    case 'progress':
      return 'text-purple-600 dark:text-purple-400';
    case 'log':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'result':
      return 'text-blue-600 dark:text-blue-400';
    default:
      return 'text-yellow-600 dark:text-yellow-400';
  }
};