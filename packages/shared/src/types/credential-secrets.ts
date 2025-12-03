import {CredentialType, Provider} from "@duramation/db/types";
import z from "zod";


// Base schemas
export const BaseOAuthSecretSchema = z.object({
    accessToken: z.string().optional(), // Made optional for Nango migration
    refreshToken: z.string().optional(),
    expiresIn: z.number().optional(),
    scopes: z.array(z.string()).optional(),
    nangoConnectionId: z.string().optional(), // Added for Nango
});

export const BaseApiKeySecretSchema = z.object({
    apiKey: z.string(),
});

// Specific schemas
export const GoogleOAuthSecretSchema = BaseOAuthSecretSchema.extend({
    scopes: z.array(z.string()),
    expiresIn: z.number(),
    refreshToken: z.string(),
});

export const SlackOAuthSecretSchema = BaseOAuthSecretSchema.extend({
    teamId: z.string(),
    teamName: z.string().optional(),
    tokenType: z.string().optional(),
    botUserId: z.string().optional(),
});

export const MicrosoftOAuthSecretSchema = BaseOAuthSecretSchema.extend({
    scopes: z.array(z.string()),
    expiresIn: z.number(),
    refreshToken: z.string().optional(), // Optional because Microsoft may not return it on re-authorization
});

export const HubspotOAuthSecretSchema = BaseOAuthSecretSchema.extend({
    refreshToken: z.string(),
    hubId: z.string(),
});

export const FirecrawlApiKeySecretSchema = BaseApiKeySecretSchema.extend({});

export const CustomApiKeySecretSchema = BaseApiKeySecretSchema.extend({
    apiUrl: z.string().optional(),
});

// Union of all secret schemas
export const CredentialSecretSchema = z.union([
    GoogleOAuthSecretSchema,
    SlackOAuthSecretSchema,
    MicrosoftOAuthSecretSchema,
    HubspotOAuthSecretSchema,
    FirecrawlApiKeySecretSchema,
    CustomApiKeySecretSchema,
]);

// Infer types from schemas
export type BaseOAuthSecret = z.infer<typeof BaseOAuthSecretSchema>;
export type BaseApiKeySecret = z.infer<typeof BaseApiKeySecretSchema>;
export type GoogleOAuthSecret = z.infer<typeof GoogleOAuthSecretSchema>;
export type SlackOAuthSecret = z.infer<typeof SlackOAuthSecretSchema>;
export type MicrosoftOAuthSecret = z.infer<typeof MicrosoftOAuthSecretSchema>;
export type HubspotOAuthSecret = z.infer<typeof HubspotOAuthSecretSchema>;
export type FirecrawlApiKeySecret = z.infer<typeof FirecrawlApiKeySecretSchema>;
export type CustomApiKeySecret = z.infer<typeof CustomApiKeySecretSchema>;
export type CredentialSecret = z.infer<typeof CredentialSecretSchema>;


// Validator function
export const validateCredentialSecret = (
    type: CredentialType,
    provider: Provider,
    secret: any
) => {
    switch (type) {
        case "OAUTH":
            switch (provider) {
                case "google_mail":
                case "google_calendar":
                case "google_sheets":
                    return GoogleOAuthSecretSchema.safeParse(secret);
                case "slack":
                    return SlackOAuthSecretSchema.safeParse(secret);
                case "microsoft_mail":
                case "microsoft_calendar":
                    return MicrosoftOAuthSecretSchema.safeParse(secret);
                case "hubspot":
                    return HubspotOAuthSecretSchema.safeParse(secret);
                case "instagram":
                    return BaseOAuthSecretSchema.safeParse(secret);
                default:
                    return {success: false, error: "Unsupported OAuth provider"};
            }
        case "API_KEY":
            switch (provider) {
                case "firecrawl":
                    return FirecrawlApiKeySecretSchema.safeParse(secret);
                case "custom_api":
                    return CustomApiKeySecretSchema.safeParse(secret);
                default:
                    return {success: false, error: "Unsupported API Key provider"};
            }
        default:
            return {success: false, error: "Invalid credential type"};
    }
};
