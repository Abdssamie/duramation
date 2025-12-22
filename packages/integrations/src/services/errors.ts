export class ProviderError extends Error {
  constructor(
    public provider: string,
    public code: string,
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'ProviderError';
  }
}

export class AuthenticationError extends ProviderError {
  constructor(provider: string, message: string = 'Authentication failed') {
    super(provider, 'AUTH_ERROR', message, 401);
    this.name = 'AuthenticationError';
  }
}

export class RateLimitError extends ProviderError {
  public retryAfter?: number;
  
  constructor(provider: string, retryAfter?: number) {
    super(provider, 'RATE_LIMIT', 'Rate limit exceeded', 429);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

export class NotFoundError extends ProviderError {
  constructor(provider: string, resource: string) {
    super(provider, 'NOT_FOUND', `Resource not found: ${resource}`, 404);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends ProviderError {
  constructor(provider: string, message: string) {
    super(provider, 'VALIDATION_ERROR', message, 400);
    this.name = 'ValidationError';
  }
}
