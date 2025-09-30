import { InngestMiddleware } from "inngest";
import { $Enums, CredentialType, User, Provider } from "@duramation/db";
import { SheetsService } from "@/services/integrations/google/sheets";
import { GoogleOAuthSecret } from '@duramation/shared';

// This middleware depends on the `credentialMiddleware` having already run and
// populated `ctx.credentials`.
export const sheetsMiddleware = new InngestMiddleware({
    name: "Sheets Middleware",
    init() {
        return {
            onFunctionRun() {
                return {
                    transformInput({ ctx }) {// If credentials aren't in the context, do nothing.
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

                        const sheetsService = new SheetsService(
                            user.id,
                            googleCredential.id,
                            googleCredential.data as GoogleOAuthSecret,
                        );


                        return {
                            ctx: {
                                sheets: sheetsService,
                            },
                        };
                    },
                };
            },
        };
    },
});
