'use client';

import { ServiceRequestDialog } from './service-request-dialog';

export function ServiceRequestDialogWrapper() {
  const handleSuccess = () => {
    // Refresh the page to show the new service request
    window.location.reload();
  };

  return <ServiceRequestDialog onSuccess={handleSuccess} />;
}