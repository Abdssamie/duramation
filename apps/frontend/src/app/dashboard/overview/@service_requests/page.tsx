import { auth } from '@clerk/nextjs/server';
import { RecentServiceRequestsWrapper } from '@/features/overview/components/recent-service-requests-wrapper';
import { dashboardApi } from '@/services/api/api-client';
import { ServiceRequestsResponse} from "@duramation/shared";

export default async function ServiceRequests() {
  let fallbackData = null;

  try {
    const { getToken } = await auth();
    const token = await getToken();

    if (token) {
      const response = await dashboardApi.getServiceRequests(token);
      fallbackData = response.data || undefined;
    }
  } catch (error) {
    // Silently fail and let client handle the error
    console.debug('Failed to fetch service requests on server:', error);
  }

  return <RecentServiceRequestsWrapper fallbackData={fallbackData as ServiceRequestsResponse | undefined  } />;
}