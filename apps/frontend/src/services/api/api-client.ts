import {
  // Common API types
  ApiResponse,
  
  // Workflow types
  WorkflowListResponse,
  WorkflowGetResponse,
  WorkflowUpdateResponse,
  WorkflowRunRequest,
  WorkflowRunResponse,
  WorkflowDeleteResponse,
  
  // Credential types
  CredentialCreateApiRequest,
  CredentialCreateApiResponse,
  CredentialUpdateApiRequest,
  CredentialUpdateApiResponse,
  CredentialListResponse,
  CredentialGetResponse,
  CredentialDeleteResponse,
  OAuthAuthorizationResponse,
  
  // Dashboard types
  MetricsResponse,
  ServiceRequestCreateRequest,
  ServiceRequestCreateResponse,
  ServiceRequestListResponse,
  ServiceRequestUpdateRequest,
  ServiceRequestUpdateResponse,
  ChartDataApiResponse,
  
  // Marketplace types
  MarketplaceQuery,
  MarketplaceResponse,
  TemplateInstallationResponse,
  
  // Workflow history types
  WorkflowHistoryResponse
} from '@duramation/shared';
import type { WorkflowUpdateRequest } from '@duramation/shared';

// API Key types
export interface ApiKey {
  id: string;
  name: string;
  lastUsedAt: Date | null;
  expiresAt: Date | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiKeyWithSecret extends ApiKey {
  key: string; // Only available on creation
}

export interface ApiKeyCreateRequest {
  name: string;
  expiresAt?: string;
}

export interface ApiKeyUpdateRequest {
  name?: string;
  isActive?: boolean;
}

export interface ApiKeyListResponse {
  success: boolean;
  data: ApiKey[];
}

export interface ApiKeyCreateResponse {
  success: boolean;
  data: ApiKeyWithSecret;
  message: string;
}

export interface ApiKeyUpdateResponse {
  success: boolean;
  data: ApiKey;
  message: string;
}

export interface ApiKeyDeleteResponse {
  success: boolean;
  message: string;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  process.env.NEXT_BACKEND_API_URL ||
  'http://localhost:3001';

// Only log in development
if (process.env.NODE_ENV === 'development') {
  console.log('API Client BASE_URL:', BASE_URL);
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';


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
      } catch {
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

// Workflows - using shared types

export const workflowsApi = {
  list: (token: string) =>
    request<WorkflowListResponse>(`/api/workflows`, { token }),
  listTemplates: (token: string, query: MarketplaceQuery = {}) =>
    request<MarketplaceResponse>(
      `/api/marketplace/workflows${toQuery(query as Record<string, unknown>)}`,
      { token }
    ),
  get: (token: string, id: string) =>
    request<WorkflowGetResponse>(`/api/workflows/${id}`, { token }),
  update: (token: string, id: string, data: WorkflowUpdateRequest) =>
    request<WorkflowUpdateResponse>(`/api/workflows/${id}`, { token, method: 'PUT', body: data }),
  remove: (token: string, id: string) =>
    request<WorkflowDeleteResponse>(`/api/workflows/${id}`, { token, method: 'DELETE' }),

  run: (
    token: string,
    id: string,
    data?: WorkflowRunRequest
  ) =>
    request<WorkflowRunResponse>(`/api/workflows/run/${id}`, {
      token,
      method: 'POST',
      body: data || {}
    }),
  stop: (token: string, id: string) =>
    request<ApiResponse<any>>(`/api/workflows/run/${id}`, { token, method: 'DELETE' }),

  install: (
    token: string,
    templateId: string,
    name?: string,
    update?: boolean
  ) =>
    request<TemplateInstallationResponse>(`/api/workflows/install/${templateId}`, {
      token,
      method: 'POST',
      body: { name, update }
    }),

  history: (token: string, params: {
    workflowId?: string;
    status?: 'started' | 'running' | 'completed' | 'failed' | 'cancelled';
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}) =>
    request<WorkflowHistoryResponse>(`/api/workflows/history${toQuery(params as Record<string, unknown>)}`, { token }),

  associateCredential: (token: string, workflowId: string, nangoConnectionId?: string, provider?: string, nangoConnectionIds?: string[]) =>
    request<ApiResponse<{ success: boolean; results?: any[] }>>(`/api/workflows/${workflowId}/credentials`, {
      token,
      method: 'POST',
      body: nangoConnectionIds ? { nangoConnectionIds } : { nangoConnectionId, provider }
    })
};

// Marketplace - using shared types

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

// Credentials - using shared types

export const credentialsApi = {
  list: (token: string) => request<CredentialListResponse>(`/api/credentials`, { token }),
  get: (token: string, id: string) =>
    request<CredentialGetResponse>(`/api/credentials/${id}`, { token }),
  create: (token: string, data: CredentialCreateApiRequest) =>
    request<CredentialCreateApiResponse>(`/api/credentials`, { token, method: 'POST', body: data }),
  update: (token: string, id: string, data: CredentialUpdateApiRequest) =>
    request<CredentialUpdateApiResponse>(`/api/credentials/${id}`, {
      token,
      method: 'PUT',
      body: data
    }),
  remove: (token: string, id: string) =>
    request<CredentialDeleteResponse>(`/api/credentials/${id}`, { token, method: 'DELETE' }),
  
  // Nango Session Token
  createConnectSession: (token: string, providerConfigKeys: string | string[], workflowId?: string) =>
    request<{ token: string; connectionId: string }>(`/api/integrations/nango/session`, {
      token,
      method: 'POST',
      body: { 
        provider_config_key: Array.isArray(providerConfigKeys) ? providerConfigKeys : [providerConfigKeys],
        ...(workflowId && { workflowId })
      }
    })
};

// Realtime
// Realtime - using inline types for now (could be moved to shared later)
export interface SubscriptionTokenRequest {
  workflowId: string;
}

export interface SubscriptionTokenResponse {
  token: string;
}

export const realtimeApi = {
  getSubscriptionToken: (authToken: string, data: SubscriptionTokenRequest) =>
    request<ApiResponse<SubscriptionTokenResponse>>(`/api/realtime/subscription-token`, {
      token: authToken,
      method: 'POST',
      body: data
    })
};

// Dashboard - using shared types

export const dashboardApi = {
  getSimplifiedMetrics: (token: string) =>
    request<MetricsResponse>(`/api/dashboard/metrics`, { token }),
  getServiceRequests: (token: string) =>
    request<ServiceRequestListResponse>(`/api/dashboard/service-requests`, { token }),
  createServiceRequest: (token: string, data: ServiceRequestCreateRequest) =>
    request<ServiceRequestCreateResponse>(`/api/dashboard/service-requests`, { token, method: 'POST', body: data }),
  updateServiceRequest: (token: string, data: ServiceRequestUpdateRequest & { id: string }) =>
    request<ServiceRequestUpdateResponse>(`/api/dashboard/service-requests`, { token, method: 'PATCH', body: data }),
  getChartData: (token: string, params: URLSearchParams) =>
    request<ChartDataApiResponse>(`/api/dashboard/chart-data?${params.toString()}`, { token }),
};

// API Keys

export const apiKeysApi = {
  list: (token: string) =>
    request<ApiKeyListResponse>(`/api/api-keys`, { token }),
  create: (token: string, data: ApiKeyCreateRequest) =>
    request<ApiKeyCreateResponse>(`/api/api-keys`, { token, method: 'POST', body: data }),
  remove: (token: string, id: string) =>
    request<ApiKeyDeleteResponse>(`/api/api-keys/${id}`, { token, method: 'DELETE' }),
};

export default {
  workflows: workflowsApi,
  marketplace: marketplaceApi,
  credentials: credentialsApi,
  realtime: realtimeApi,
  dashboard: dashboardApi,
  apiKeys: apiKeysApi,
};
