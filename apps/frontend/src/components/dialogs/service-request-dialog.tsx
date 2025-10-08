'use client';

import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { dashboardApi } from '@/services/api/api-client';
import { ServiceRequestCreateRequest } from '@duramation/shared';

interface ServiceRequestDialogProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export function ServiceRequestDialog({ onSuccess, trigger }: ServiceRequestDialogProps) {
  const { getToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<ServiceRequestCreateRequest>({
    title: '',
    description: '',
    businessProcess: '',
    desiredOutcome: '',
    priority: 'MEDIUM',
    preferredMeetingDate: '',
    availabilityNotes: '',
  });

  const handleInputChange = (field: keyof ServiceRequestCreateRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      businessProcess: '',
      desiredOutcome: '',
      priority: 'MEDIUM',
      preferredMeetingDate: '',
      availabilityNotes: '',
    });
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset form when dialog closes
      setTimeout(resetForm, 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const token = await getToken();

      if (token) {
        await dashboardApi.createServiceRequest(token, formData);

        setSubmitStatus('success');

        // Close dialog and call success callback after a brief delay
        setTimeout(() => {
          setOpen(false);
          onSuccess?.();
        }, 2000);
      } else {
        setSubmitStatus('error');
        setErrorMessage('Authentication required');
      }

    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit service request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.title && formData.description && formData.businessProcess && formData.desiredOutcome;

  const defaultTrigger = (
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Request Service
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request Automation Service</DialogTitle>
          <DialogDescription>
            Tell us about your business process and how we can help automate it for you. We&#39;ll reach out and book a sales call with you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-700 mb-2">Request Submitted Successfully!</h3>
            <p className="text-muted-foreground">
              We&#39;ve received your service request and will reach out to book a sales call with you as soon as possible. You&#39;ll be contacted within 1-2 business days.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitStatus === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Request Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Automate customer onboarding process"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessProcess">Current Business Process *</Label>
              <Textarea
                id="businessProcess"
                placeholder="Describe your current manual process in detail..."
                value={formData.businessProcess}
                onChange={(e) => handleInputChange('businessProcess', e.target.value)}
                disabled={isSubmitting}
                rows={3}
                required
              />
              <p className="text-sm text-muted-foreground">
                Include steps, tools used, time spent, and any pain points.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="desiredOutcome">Desired Outcome *</Label>
              <Textarea
                id="desiredOutcome"
                placeholder="What would you like to achieve with automation?"
                value={formData.desiredOutcome}
                onChange={(e) => handleInputChange('desiredOutcome', e.target.value)}
                disabled={isSubmitting}
                rows={3}
                required
              />
              <p className="text-sm text-muted-foreground">
                Describe the ideal automated solution and expected benefits.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Additional Details *</Label>
              <Textarea
                id="description"
                placeholder="Any additional context, requirements, or constraints..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                disabled={isSubmitting}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleInputChange('priority', value)}
                disabled={isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low - Can wait a few weeks</SelectItem>
                  <SelectItem value="MEDIUM">Medium - Would like within 1-2 weeks</SelectItem>
                  <SelectItem value="HIGH">High - Need within a few days</SelectItem>
                  <SelectItem value="URGENT">Urgent - Need ASAP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-4">Sales Call Availability</h4>
              
              <div className="space-y-2">
                <Label htmlFor="preferredMeetingDate">Preferred Meeting Date</Label>
                <Input
                  id="preferredMeetingDate"
                  type="datetime-local"
                  value={formData.preferredMeetingDate}
                  onChange={(e) => handleInputChange('preferredMeetingDate', e.target.value)}
                  disabled={isSubmitting}
                  min={new Date().toISOString().slice(0, 16)}
                />
                <p className="text-sm text-muted-foreground">
                  Select your preferred date and time for the sales call (optional).
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availabilityNotes">Availability Notes</Label>
                <Textarea
                  id="availabilityNotes"
                  placeholder="e.g., Available weekdays 9 AM - 5 PM EST, prefer mornings, avoid Fridays..."
                  value={formData.availabilityNotes}
                  onChange={(e) => handleInputChange('availabilityNotes', e.target.value)}
                  disabled={isSubmitting}
                  rows={2}
                />
                <p className="text-sm text-muted-foreground">
                  Let us know your general availability or any scheduling preferences.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}