import {InngestMiddleware} from "inngest";
import {$Enums, CredentialType, Provider, User} from "@duramation/db";
import {GmailService} from "@/services/integrations/google/gmail";
import { GoogleOAuthSecret, validateWorkflowInput } from '@duramation/shared';

// This middleware depends on the `credentialMiddleware` having already run and
// populated `ctx.credentials`.
export const gmailMiddleware = new InngestMiddleware({
    name: "Gmail Middleware",
    init() {
        return {
            onFunctionRun() {
                return {
                    transformInput({ctx}) {
                        // If credentials aren't in the context, do nothing.
                        const credentials = ctx.credentials as {
                             id: string;
                            type: $Enums.CredentialType;
                            data: object;
                            provider: $Enums.Provider;
                        }[] | undefined;

                        const user = ctx.event.user as User;

                        if (!user || !credentials || credentials.length === 0) {
                            return;
                        }

                        // Find the first decrypted Google credential in the context.
                        const googleCredential = credentials.find(
                            (cred) => cred.type === CredentialType.OAUTH && cred.provider === Provider.GOOGLE
                        );

                        if (!googleCredential) {
                            return;
                        }

                        const gmailService = new GmailService(
                            user.id,
                            googleCredential.id,
                            googleCredential.data as GoogleOAuthSecret,
                        );

                        return {
                            ctx: {
                                gmail: gmailService,
                            },
                        };
                    },
                };
            },
        };
    },
});
