import {
  CredentialCreateRequest
} from '@duramation/shared';
import { WorkflowWithCredentials } from '@/types/workflow';

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  process.env.NEXT_BACKEND_API_URL ||
  'http://localhost:3001';

// Only log in development
if (process.env.NODE_ENV === 'development') {
  console.log('API Client BASE_URL:', BASE_URL);
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

function authHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  } as Record<string, string>;
}

async function request<T>(
  path: string,
  options: { token: string; method?: HttpMethod; body?: unknown }
): Promise<T> {
  const { token, method = 'GET', body } = options;
  const url = `${BASE_URL}${path}`;
  
  if (process.env.NODE_ENV === 'development') {
    console.log('API Request:', { url, method });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const res = await fetch(url, {
      method,
      headers: authHeaders(token),
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: 'no-store',
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', { url, status: res.status, ok: res.ok });
    }

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      let errorMessage = `Request failed ${method} ${path}: ${res.status} ${text}`;

      try {
        const errorBody = JSON.parse(text);
        if (errorBody.error && Array.isArray(errorBody.details)) {
          errorMessage = `${errorBody.error}: ${errorBody.details.join(', ')}`;
        } else if (errorBody.error) {
          errorMessage = errorBody.error;
        }
      } catch (e) {
        // If parsing fails, use the original text
      }
      throw new Error(errorMessage);
    }
    
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return (await res.json()) as Promise<T>;
    }
    return undefined as unknown as T;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('API Request Error:', {
        url,
        method,
        errorMessage: error instanceof Error ? error.message : String(error)
      });
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check your internet connection and try again.');
    }
    
    if (error instanceof Error && error.message.includes('NetworkError')) {
      throw new Error('Network error occurred. Please try again later.');
    }
    
    throw error;
  }
}

// Workflows
export interface WorkflowListResponse {
  success?: boolean;
  data?: WorkflowWithCredentials[];
  message?: string;
}

export interface WorkflowUpdateInput {
  name?: string;
  description?: string;
  available?: boolean;
  input?: Record<string, unknown>;
  credentials?: { credentialId: string }[];
}

export const workflowsApi = {
  list: (token: string) =>
    request<WorkflowListResponse>(`/api/workflows`, { token }),
  listTemplates: (token: string, query: MarketplaceQuery = {}) =>
    request<MarketplaceResponse>(
      `/api/marketplace/workflows${toQuery(query as Record<string, unknown>)}`,
      { token }
    ),
  get: (token: string, id: string) =>
    request<any>(`/api/workflows/${id}`, { token }),
  update: (token: string, id: string, data: WorkflowUpdateInput) =>
    request<any>(`/api/workflows/${id}`, { token, method: 'PUT', body: data }),
  remove: (token: string, id: string) =>
    request<any>(`/api/workflows/${id}`, { token, method: 'DELETE' }),

  run: (
    token: string,
    id: string,
    data?: {
      input?: Record<string, unknown>;
      metadata?: Record<string, unknown>;
    }
  ) =>
    request<any>(`/api/workflows/run/${id}`, {
      token,
      method: 'POST',
      body: data || {}
    }),
  stop: (token: string, id: string) =>
    request<any>(`/api/workflows/run/${id}`, { token, method: 'DELETE' }),

  install: (
    token: string,
    templateId: string,
    name?: string,
    update?: boolean
  ) =>
    request<any>(`/api/workflows/install/${templateId}`, {
      token,
      method: 'POST',
      body: { name, update }
    })
};

// Marketplace
export interface MarketplaceQuery {
  page?: number;
  limit?: number;
  search?: string;
  provider?: string;
  pricing?: 'free' | 'paid';
  category?: string;
  featured?: boolean;
}

export interface MarketplaceResponse {
  success?: boolean;
  data?: {
    items: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  message?: string;
}

function toQuery(params: Record<string, unknown>) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    sp.set(k, String(v));
  });
  const s = sp.toString();
  return s ? `?${s}` : '';
}

export const marketplaceApi = {
  list: (token: string, query: MarketplaceQuery = {}) =>
    request<MarketplaceResponse>(
      `/api/marketplace/workflows${toQuery(query as Record<string, unknown>)}`,
      { token }
    )
};

// Using shared CredentialCreateRequest type

export interface CredentialUpdateRequest {
  name?: string;
  secret?: unknown;
  config?: unknown;
}

export const credentialsApi = {
  list: (token: string) => request<any[]>(`/api/credentials`, { token }),
  get: (token: string, id: string) =>
    request<any>(`/api/credentials/${id}`, { token }),
  create: (token: string, data: CredentialCreateRequest) =>
    request<any>(`/api/credentials`, { token, method: 'POST', body: data }),
  update: (token: string, id: string, data: CredentialUpdateRequest) =>
    request<any>(`/api/credentials/${id}`, {
      token,
      method: 'PUT',
      body: data
    }),
  remove: (token: string, id: string) =>
    request<any>(`/api/credentials/${id}`, { token, method: 'DELETE' }),
  // Generic OAuth URL getter for any provider
  getOAuthUrl: (token: string, provider: string, scopes: string[], workflowId?: string) =>
    request<{ url: string }>(
      `/api/credentials/oauth/auth-url${toQuery({
        provider: provider.toUpperCase(),
        scopes: scopes.join(','),
        ...(workflowId && { workflowId })
      })}`,
      { token }
    ),
  // Backwards compatibility
  getGoogleAuthUrl: (token: string, scopes: string[], workflowId: string) =>
    request<{ url: string }>(
      `/api/credentials/google/auth-url${toQuery({
        scopes: scopes.join(','),
        ...(workflowId && { workflowId })
      })}`,
      { token }
    )
};

// Realtime
export interface SubscriptionTokenRequest {
  workflowId: string;
}

export interface SubscriptionTokenResponse {
  token: string;
}

export const realtimeApi = {
  getSubscriptionToken: (authToken: string, data: SubscriptionTokenRequest) =>
    request<SubscriptionTokenResponse>(`/api/realtime/subscription-token`, {
      token: authToken,
      method: 'POST',
      body: data
    })
};

export interface ServiceRequestCreateInput {
  title: string;
  description: string;
  businessProcess: string;
  desiredOutcome: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  preferredMeetingDate?: string;
  availabilityNotes?: string;
}

export const dashboardApi = {
  getSimplifiedMetrics: (token: string) =>
    request<any>(`/api/dashboard/metrics`, { token }),
  getServiceRequests: (token: string) =>
    request<any>(`/api/dashboard/service-requests`, { token }),
  createServiceRequest: (token: string, data: ServiceRequestCreateInput) =>
    request<any>(`/api/dashboard/service-requests`, { token, method: 'POST', body: data }),
  updateServiceRequest: (token: string, data: { id: string; status?: string; priority?: string; estimatedHours?: number }) =>
    request<any>(`/api/dashboard/service-requests`, { token, method: 'PATCH', body: data }),
  getChartData: (token: string, params: URLSearchParams) =>
    request<any>(`/api/dashboard/chart-data?${params.toString()}`, { token }),
};

export default {
  workflows: workflowsApi,
  marketplace: marketplaceApi,
  credentials: credentialsApi,
  realtime: realtimeApi,
  dashboard: dashboardApi,
};
