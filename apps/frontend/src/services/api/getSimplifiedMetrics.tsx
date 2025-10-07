import {SimplifiedMetrics} from "@duramation/shared";
import {auth} from "@clerk/nextjs/server";
import {dashboardApi} from "@/services/api/api-client";

export async function getSimplifiedMetrics(): Promise<SimplifiedMetrics> {
  const { getToken } = await auth();
  const token = await getToken();
  if (!token) {
    throw new Error('Unauthorized');
  }
  return dashboardApi.getSimplifiedMetrics(token);
}