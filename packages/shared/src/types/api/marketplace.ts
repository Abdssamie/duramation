/**
 * Marketplace endpoint types and interfaces
 */

import type { WorkflowTemplate } from "../workflow.js";
import type { Provider } from "@duramation/db/types";
import type { ApiResponse, PaginatedResponse, QueryParams } from "./common.js";

/**
 * Marketplace Query Request/Response Types
 */
export interface MarketplaceQuery extends QueryParams {
  category?: string;
  tags?: string[];
  provider?: Provider;
  requiredProviders?: Provider[];
  canBeScheduled?: boolean;
  featured?: boolean;
}

export interface MarketplaceTemplate extends WorkflowTemplate {
  // Additional marketplace-specific fields
  featured?: boolean;
  downloadCount?: number;
  rating?: number;
  reviewCount?: number;
  author?: string;
  lastUpdated?: string;
  compatibilityTags?: string[];
  isInstalled: boolean;
  canInstall: boolean;
  hasNewVersion: boolean;
  installedVersion: string | null | undefined;
}

export type MarketplaceResponse = PaginatedResponse<MarketplaceTemplate>;

/**
 * Template Installation Request/Response Types
 */
export interface TemplateInstallationRequest {
  templateId: string;
  workflowName?: string; // Custom name for the installed workflow
  configuration?: Record<string, any>;
  inputFields?: Array<{
    key: string;
    value: any;
  }>;
  isActive?: boolean;
}

export interface TemplateInstallationData {
  workflowId: string;
  templateId: string;
  installationStatus: "pending" | "completed" | "failed";
  requiredCredentials?: Array<{
    provider: Provider;
    scopes?: string[];
    isConfigured: boolean;
  }>;
  configurationSteps?: Array<{
    step: number;
    title: string;
    description: string;
    completed: boolean;
  }>;
}

export type TemplateInstallationResponse =
  ApiResponse<TemplateInstallationData>;

/**
 * Template Details Request/Response Types
 */
export interface TemplateDetailsRequest {
  templateId: string;
  includeCompatibility?: boolean;
  includeReviews?: boolean;
}

export interface TemplateDetails extends MarketplaceTemplate {
  longDescription?: string;
  screenshots?: string[];
  documentation?: string;
  changelog?: Array<{
    version: string;
    date: string;
    changes: string[];
  }>;
  compatibilityInfo?: {
    minVersion?: string;
    supportedProviders: Provider[];
    requiredFeatures?: string[];
  };
  reviews?: Array<{
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
}

export type TemplateDetailsResponse = ApiResponse<TemplateDetails>;

/**
 * Template Categories Request/Response Types
 */
export interface TemplateCategoriesRequest {
  includeCount?: boolean;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  templateCount?: number;
  featured?: boolean;
}

export type TemplateCategoriesResponse = ApiResponse<TemplateCategory[]>;

/**
 * Template Search Request/Response Types
 */
export interface TemplateSearchRequest extends QueryParams {
  query: string;
  category?: string;
  tags?: string[];
  provider?: Provider;
  minRating?: number;
  sortBy?: "relevance" | "rating" | "downloads" | "updated" | "name";
  sortOrder?: "asc" | "desc";
}

export type TemplateSearchResponse = PaginatedResponse<MarketplaceTemplate>;

/**
 * Template Review Request/Response Types
 */
export interface TemplateReviewRequest {
  templateId: string;
  rating: number; // 1-5
  comment?: string;
}

export interface TemplateReview {
  id: string;
  templateId: string;
  userId: string;
  userName: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export type TemplateReviewResponse = ApiResponse<TemplateReview>;
