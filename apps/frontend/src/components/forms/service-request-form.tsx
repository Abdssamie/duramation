'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { dashboardApi } from '@/services/api/api-client';
import { ServiceRequestCreateRequest } from '@duramation/shared';

interface ServiceRequestFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ServiceRequestForm({ onSuccess, onCancel }: ServiceRequestFormProps) {
  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<ServiceRequestCreateRequest>({
    title: '',
    description: '',
    businessProcess: '',
    desiredOutcome: '',
    priority: 'medium',
    category: 'automation',
    preferredMeetingDate: '',
    availabilityNotes: '',
  });

  const handleInputChange = (field: keyof ServiceRequestCreateRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      await dashboardApi.createServiceRequest(token, {
        title: formData.title,
        description: formData.description,
        businessProcess: formData.businessProcess,
        desiredOutcome: formData.desiredOutcome,
        priority: formData.priority,
        category: formData.category,
        preferredMeetingDate: formData.preferredMeetingDate,
        availabilityNotes: formData.availabilityNotes,
      });

      setSubmitStatus('success');

      // Reset form
      setFormData({
        title: '',
        description: '',
        businessProcess: '',
        desiredOutcome: '',
        priority: 'medium',
        category: 'automation',
        preferredMeetingDate: '',
        availabilityNotes: '',
      });

      // Call success callback after a brief delay
      setTimeout(() => {
        onSuccess?.();
      }, 1500);

    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit service request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.title && formData.description && formData.businessProcess && formData.desiredOutcome;

  if (submitStatus === 'success') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-700 mb-2">Request Submitted Successfully!</h3>
            <p className="text-muted-foreground mb-4">
              We've received your service request and will review it shortly. You'll be contacted within 1-2 business days.
            </p>
            <Button onClick={onSuccess} variant="outline">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Request Automation Service</CardTitle>
        <CardDescription>
          Tell us about your business process and how we can help automate it for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
              rows={4}
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
            <Label htmlFor="description">Additional Details</Label>
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
                <SelectItem value="low">Low - Can wait a few weeks</SelectItem>
                <SelectItem value="medium">Medium - Would like within 1-2 weeks</SelectItem>
                <SelectItem value="high">High - Need within a few days</SelectItem>
                <SelectItem value="urgent">Urgent - Need ASAP</SelectItem>
              </SelectContent>
            </Select>
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
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}