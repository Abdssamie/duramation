"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { OnboardingFormData } from "@/components/modal/onboarding-modal";

export const completeOnboarding = async (formData: OnboardingFormData) => {
    const client = await clerkClient()
    const { userId } = await auth();

    if (!userId) {
        return { message: "No Logged In User", success: false }
    }

    try {
        await client.users.updateUser(userId, {
            publicMetadata: {
                onboardingComplete: true,
                ...formData,
            }
        });
        return { success: true, message: "User metadata Updated" }
    } catch (e) {
        console.log("error", e)
        return { success: false, message: "Error Updating User Metadata" }
    }
}