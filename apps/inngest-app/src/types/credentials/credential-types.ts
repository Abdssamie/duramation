import { Prisma } from "@duramation/db";
import { CredentialType, Provider } from "@duramation/db";
import { CredentialSecret } from "@duramation/shared";

// Used for API requests
export interface CredentialCreateRequest {
  name: string;
  type: CredentialType;
  provider: Provider;
  secret: CredentialSecret;
  config?: Prisma.JsonValue;
  // Context for tracking credential creation source
  context?: {
    source: 'workflow' | 'manual';
    workflowId?: string;
    requiredScopes?: string[];
    autoAssociate?: boolean;
  };
}


export interface CredentialUpdateRequest {
  name?: string;
  secret?: CredentialSecret;
  config?: Prisma.JsonValue;
}

// Used for API responses - safe fields only
export interface SafeCredentialResponse {
  id: string;
  name: string;
  type: CredentialType;
  provider: Provider;
  createdAt: Date;
  updatedAt: Date;
  config: Prisma.JsonValue | null;
}
