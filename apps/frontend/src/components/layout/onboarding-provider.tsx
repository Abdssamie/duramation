"use client";

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import OnboardingModal, { OnboardingFormData } from '@/components/modal/onboarding-modal';
import { completeOnboarding } from '@/app/actions/onboarding';
import { toast } from 'sonner';

export default function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && !user.publicMetadata.onboardingComplete) {
      setIsOnboardingOpen(true);
    }
  }, [isLoaded, isSignedIn, user]);

  const handleOnboardingComplete = async (data: OnboardingFormData) => {
    const result = await completeOnboarding(data);
    if (result.success === true) {
      toast.success("Onboarding complete! Welcome to your admin panel.");
      setIsOnboardingOpen(false);
      // The user object will be updated automatically by Clerk's hooks
    } else {
      toast.error(result.message);
    }
  };

  const handleOnboardingClose = () => {
    setIsOnboardingOpen(true);
  };

  return (
    <>
      {children}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleOnboardingClose}
        onComplete={handleOnboardingComplete}
      />
    </>
  );
}