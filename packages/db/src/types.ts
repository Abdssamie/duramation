// Optimized re-exports from Prisma client
// Export only the types and models we actually use

// Model types
export type {
  User,
  Credential,
  Workflow,
  WorkflowCredential,
  WorkflowRun,
  WorkflowTemplate,
  ClientBranding,
  ServiceRequest,
  AutomationMetrics,
  BusinessOutcome,
  EfficiencyMetric,
  AutomationOpportunity,
  WorkflowHealth,
  HealthRecommendation,
  HealthAlert,
  ExecutiveReport,
  PrismaClient,
  Prisma
} from "./generated/client/index.js";

// Enum types (for use in interfaces and type annotations)
export type {
  CredentialType,
  Provider,
  WorkflowStatus,
  RunStatus,
  RequestPriority,
  RequestStatus,
  BusinessOutcomeType,
  OpportunityCategory,
  OpportunityStatus,
  HealthRecommendationType,
  HealthRecommendationPriority,
  ImplementationEffort
} from "./generated/client/index.js";
