'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ServiceRequestForm } from './service-request-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function ServiceRequestBooking() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(true);

  const handleSuccess = () => {
    setShowForm(false);
    // Redirect to dashboard after a brief delay
    setTimeout(() => {
      router.push('/dashboard/overview');
    }, 2000);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Book Automation Service
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let our experts help you automate your business processes. 
            Fill out the form below and we'll get back to you with a custom solution.
          </p>
        </div>
        
        <ServiceRequestForm 
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}