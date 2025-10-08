import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Users,
  Building2,
  Mail,
  Phone,
  Globe,
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  X,
  Target,
  Briefcase,
  MessageSquare,
  Calendar,
  DollarSign,
  BarChart3
} from 'lucide-react';

interface OnboardingFormData {
  companyName: string;
  businessType: string;
  teamSize: string;
  primaryServices: string[];
  contactEmail: string;
  contactPhone: string;
  website: string;
  automationGoals: string;
  currentChallenges: string;
  monthlyClients: string;
  currentTools: string[];
  otherTools: string;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: OnboardingFormData) => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<OnboardingFormData>({
    companyName: '',
    businessType: '',
    teamSize: '',
    primaryServices: [],
    contactEmail: '',
    contactPhone: '',
    website: '',
    automationGoals: '',
    currentChallenges: '',
    monthlyClients: '',
    currentTools: [],
    otherTools: ''
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      primaryServices: prev.primaryServices.includes(service)
        ? prev.primaryServices.filter((s) => s !== service)
        : [...prev.primaryServices, service]
    }));
  };

  const handleToolToggle = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      currentTools: prev.currentTools.includes(tool)
        ? prev.currentTools.filter((t) => t !== tool)
        : [...prev.currentTools, tool]
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    switch (step) {
      case 1:
        if (!formData.companyName) {
          newErrors.companyName = 'Company name is required';
          isValid = false;
        }
        if (!formData.businessType) {
          newErrors.businessType = 'Business type is required';
          isValid = false;
        }
        if (!formData.teamSize) {
          newErrors.teamSize = 'Team size is required';
          isValid = false;
        }
        if (!formData.monthlyClients) {
          newErrors.monthlyClients = 'Monthly clients are required';
          isValid = false;
        }
        break;
      case 2:
        if (formData.primaryServices.length === 0) {
          newErrors.primaryServices = 'Select at least one service';
          isValid = false;
        }
        break;
      case 3:
        if (!formData.contactEmail) {
          newErrors.contactEmail = 'Email is required';
          isValid = false;
        }
        if (!formData.contactPhone) {
          newErrors.contactPhone = 'Phone number is required';
          isValid = false;
        }
        break;
      case 5:
        if (!formData.automationGoals) {
          newErrors.automationGoals = 'Automation goals are required';
          isValid = false;
        }
        if (!formData.currentChallenges) {
          newErrors.currentChallenges = 'This field is required';
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1);
        setErrors({});
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    if (validateStep(currentStep)) {
      onComplete(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>
      <Card className='max-h-[90vh] w-full max-w-2xl overflow-y-auto'>
        <CardHeader className='relative'>
          <Button
            variant='ghost'
            size='sm'
            className='absolute top-0 right-0'
            onClick={onClose}
          >
            <X className='h-4 w-4' />
          </Button>
          <div className='mb-4 flex items-center gap-3'>
            <div className='bg-primary/10 rounded-lg p-2'>
              <Zap className='text-primary h-6 w-6' />
            </div>
            <div>
              <CardTitle className='text-2xl'>
                Welcome to Duramation
              </CardTitle>
              <CardDescription>
                Let&#39;s set up your automation platform in just a few
                steps
              </CardDescription>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='text-muted-foreground flex justify-between text-sm'>
              <span>
                Step {currentStep} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className='h-2' />
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          {currentStep === 1 && (
            <div className='space-y-6'>
              <div className='space-y-2 text-center'>
                <h3 className='text-xl font-semibold'>
                  Tell us about your business
                </h3>
                <p className='text-muted-foreground'>
                  Help us understand your agency better
                </p>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='companyName'>Company Name</Label>
                  <Input
                    id='companyName'
                    placeholder='Your Agency Name'
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        companyName: e.target.value
                      }))
                    }
                  />
                  {errors.companyName && (
                    <p className='text-sm text-red-500'>{errors.companyName}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='businessType'>Business Type</Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, businessType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select business type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='marketing'>Marketing Agency</SelectItem>
                      <SelectItem value='digital'>Digital Agency</SelectItem>
                      <SelectItem value='creative'>Creative Agency</SelectItem>
                      <SelectItem value='consulting'>Consulting</SelectItem>
                      <SelectItem value='real-estate'>Real Estate</SelectItem>
                      <SelectItem value='insurance'>Insurance</SelectItem>
                      <SelectItem value='financial'>Financial Services</SelectItem>
                      <SelectItem value='legal'>Legal Services</SelectItem>
                      <SelectItem value='healthcare'>Healthcare</SelectItem>
                      <SelectItem value='other'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.businessType && (
                    <p className='text-sm text-red-500'>
                      {errors.businessType}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='teamSize'>Team Size</Label>
                  <Select
                    value={formData.teamSize}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, teamSize: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select team size' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1'>Just me</SelectItem>
                      <SelectItem value='2-5'>2-5 people</SelectItem>
                      <SelectItem value='6-20'>6-20 people</SelectItem>
                      <SelectItem value='21-50'>21-50 people</SelectItem>
                      <SelectItem value='50+'>50+ people</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.teamSize && (
                    <p className='text-sm text-red-500'>{errors.teamSize}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='monthlyClients'>Monthly Clients</Label>
                  <Select
                    value={formData.monthlyClients}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        monthlyClients: value
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select volume' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1-10'>1-10 clients</SelectItem>
                      <SelectItem value='11-50'>11-50 clients</SelectItem>
                      <SelectItem value='51-200'>51-200 clients</SelectItem>
                      <SelectItem value='200+'>200+ clients</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.monthlyClients && (
                    <p className='text-sm text-red-500'>
                      {errors.monthlyClients}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className='space-y-6'>
              <div className='space-y-2 text-center'>
                <h3 className='text-xl font-semibold'>
                  What services do you offer?
                </h3>
                <p className='text-muted-foreground'>
                  Select all that apply to customize your automation workflows
                </p>
              </div>

              {errors.primaryServices && (
                <p className='text-center text-sm text-red-500'>
                  {errors.primaryServices}
                </p>
              )}
              <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
                {[
                  { id: 'lead-generation', label: 'Lead Generation', icon: Target },
                  { id: 'client-management', label: 'Client Management', icon: Users },
                  { id: 'project-management', label: 'Project Management', icon: Briefcase },
                  { id: 'marketing', label: 'Marketing & Campaigns', icon: BarChart3 },
                  { id: 'customer-support', label: 'Customer Support', icon: MessageSquare },
                  { id: 'scheduling', label: 'Scheduling & Appointments', icon: Calendar },
                  { id: 'sales', label: 'Sales & Proposals', icon: DollarSign },
                  { id: 'consulting', label: 'Consulting Services', icon: Building2 }
                ].map((service) => {
                  const Icon = service.icon;
                  const isSelected = formData.primaryServices.includes(
                    service.id
                  );

                  return (
                    <div
                      key={service.id}
                      className={`hover:border-primary/50 cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <div className='flex flex-col items-center space-y-2 text-center'>
                        <Icon
                          className={`h-8 w-8 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}
                        />
                        <span className='text-sm font-medium'>
                          {service.label}
                        </span>
                        {isSelected && (
                          <CheckCircle className='text-primary h-4 w-4' />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className='space-y-6'>
              <div className='space-y-2 text-center'>
                <h3 className='text-xl font-semibold'>Contact Information</h3>
                <p className='text-muted-foreground'>
                  We&#39;ll use this to set up your account and provide support
                </p>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='contactEmail'>Email Address</Label>
                  <div className='relative'>
                    <Mail className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
                    <Input
                      id='contactEmail'
                      type='email'
                      placeholder='contact@youragency.com'
                      className='pl-10'
                      value={formData.contactEmail}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactEmail: e.target.value
                        }))
                      }
                    />
                  </div>
                  {errors.contactEmail && (
                    <p className='text-sm text-red-500'>
                      {errors.contactEmail}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='contactPhone'>Phone Number</Label>
                  <div className='relative'>
                    <Phone className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
                    <Input
                      id='contactPhone'
                      type='tel'
                      placeholder='+1 (555) 123-4567'
                      className='pl-10'
                      value={formData.contactPhone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contactPhone: e.target.value
                        }))
                      }
                    />
                  </div>
                  {errors.contactPhone && (
                    <p className='text-sm text-red-500'>
                      {errors.contactPhone}
                    </p>
                  )}
                </div>

                <div className='space-y-2 md:col-span-2'>
                  <Label htmlFor='website'>Website (Optional)</Label>
                  <div className='relative'>
                    <Globe className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
                    <Input
                      id='website'
                      type='url'
                      placeholder='https://youragency.com'
                      className='pl-10'
                      value={formData.website}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          website: e.target.value
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className='space-y-6'>
              <div className='space-y-2 text-center'>
                <h3 className='text-xl font-semibold'>
                  Current Tools & Integrations
                </h3>
                <p className='text-muted-foreground'>
                  Tell us what tools you&#39;re currently using so we can
                  integrate them into your workflows
                </p>
              </div>

              <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
                {[
                  { id: 'salesforce', label: 'Salesforce', category: 'CRM' },
                  { id: 'hubspot', label: 'HubSpot', category: 'CRM' },
                  { id: 'pipedrive', label: 'Pipedrive', category: 'CRM' },
                  { id: 'monday', label: 'Monday.com', category: 'Project Mgmt' },
                  { id: 'asana', label: 'Asana', category: 'Project Mgmt' },
                  { id: 'trello', label: 'Trello', category: 'Project Mgmt' },
                  { id: 'mailchimp', label: 'Mailchimp', category: 'Email' },
                  { id: 'gmail', label: 'Gmail', category: 'Email' },
                  { id: 'outlook', label: 'Outlook', category: 'Email' },
                  { id: 'slack', label: 'Slack', category: 'Communication' },
                  { id: 'teams', label: 'Microsoft Teams', category: 'Communication' },
                  { id: 'discord', label: 'Discord', category: 'Communication' },
                  { id: 'quickbooks', label: 'QuickBooks', category: 'Accounting' },
                  { id: 'xero', label: 'Xero', category: 'Accounting' },
                  { id: 'stripe', label: 'Stripe', category: 'Payments' },
                  { id: 'paypal', label: 'PayPal', category: 'Payments' },
                  { id: 'zapier', label: 'Zapier', category: 'Automation' },
                  { id: 'calendly', label: 'Calendly', category: 'Scheduling' },
                  { id: 'google-workspace', label: 'Google Workspace', category: 'Productivity' },
                  { id: 'microsoft-365', label: 'Microsoft 365', category: 'Productivity' }
                ].map((tool) => {
                  const isSelected = formData.currentTools.includes(tool.id);

                  return (
                    <div
                      key={tool.id}
                      className={`hover:border-primary/50 cursor-pointer rounded-lg border-2 p-3 transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border'
                      }`}
                      onClick={() => handleToolToggle(tool.id)}
                    >
                      <div className='flex flex-col items-center space-y-1 text-center'>
                        <span className='text-sm font-medium'>
                          {tool.label}
                        </span>
                        <span className='text-muted-foreground text-xs'>
                          {tool.category}
                        </span>
                        {isSelected && (
                          <CheckCircle className='text-primary h-4 w-4' />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='otherTools'>Other tools not listed above</Label>
                <Textarea
                  id='otherTools'
                  placeholder='e.g., Custom CRM, specific booking platforms, internal tools...'
                  value={formData.otherTools}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      otherTools: e.target.value
                    }))
                  }
                  rows={2}
                />
              </div>

              <div className='bg-muted/50 rounded-lg p-4'>
                <div className='flex items-start gap-3'>
                  <Zap className='text-primary mt-0.5 h-5 w-5' />
                  <div className='space-y-1'>
                    <p className='font-medium'>Integration Benefits</p>
                    <p className='text-muted-foreground text-sm'>
                      We&#39;ll create seamless workflows between your existing
                      tools and Duramation to eliminate manual data transfer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className='space-y-6'>
              <div className='space-y-2 text-center'>
                <h3 className='text-xl font-semibold'>Automation Goals</h3>
                <p className='text-muted-foreground'>
                  Help us understand what you want to automate
                </p>
              </div>

              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='automationGoals'>
                    What would you like to automate?
                  </Label>
                  <Textarea
                    id='automationGoals'
                    placeholder='e.g., Lead nurturing, client onboarding, proposal generation, follow-up emails...'
                    value={formData.automationGoals}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        automationGoals: e.target.value
                      }))
                    }
                    rows={3}
                  />
                  {errors.automationGoals && (
                    <p className='text-sm text-red-500'>
                      {errors.automationGoals}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='currentChallenges'>
                    What are your biggest time-consuming tasks?
                  </Label>
                  <Textarea
                    id='currentChallenges'
                    placeholder='e.g., Manual data entry, repetitive client communications, updating multiple systems, scheduling conflicts...'
                    value={formData.currentChallenges}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        currentChallenges: e.target.value
                      }))
                    }
                    rows={3}
                  />
                  {errors.currentChallenges && (
                    <p className='text-sm text-red-500'>
                      {errors.currentChallenges}
                    </p>
                  )}
                </div>
              </div>

              <div className='bg-muted/50 rounded-lg p-4'>
                <div className='flex items-start gap-3'>
                  <Clock className='text-primary mt-0.5 h-5 w-5' />
                  <div className='space-y-1'>
                    <p className='font-medium'>Time-Saving Potential</p>
                    <p className='text-muted-foreground text-sm'>
                      Based on similar agencies, you could save 15-25 hours per
                      week with smart automation workflows
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Separator />

          <div className='flex justify-between'>
            <Button
              variant='outline'
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext} className='gap-2'>
                Next Step
                <ArrowRight className='h-4 w-4' />
              </Button>
            ) : (
              <Button onClick={handleComplete} className='gap-2'>
                Complete Setup
                <CheckCircle className='h-4 w-4' />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingModal;
export type { OnboardingFormData };
