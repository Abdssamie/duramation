'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ServiceRequestDialog } from '@/components/dialogs/service-request-dialog';
import { 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  Calendar,
  Phone,
  Video,
  Plus
} from 'lucide-react';

interface ServiceBookingInterfaceProps {
  onRequestSubmitted?: () => void;
}

export function ServiceBookingInterface({ onRequestSubmitted }: ServiceBookingInterfaceProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: 'automation-consultation',
      title: 'Automation Consultation',
      description: 'Get expert advice on which processes to automate first',
      duration: '30 min',
      price: 'Free',
      icon: <MessageSquare className="h-6 w-6" />,
      popular: true,
    },
    {
      id: 'workflow-review',
      title: 'Workflow Review',
      description: 'Review and optimize your existing automation workflows',
      duration: '45 min',
      price: '$150',
      icon: <CheckCircle className="h-6 w-6" />,
      popular: false,
    },
    {
      id: 'custom-automation',
      title: 'Custom Automation Setup',
      description: 'Full service automation implementation for your business',
      duration: '60 min',
      price: 'Quote',
      icon: <Clock className="h-6 w-6" />,
      popular: false,
    },
  ];

  const bookingMethods = [
    {
      id: 'service-request',
      title: 'Submit Service Request',
      description: 'Fill out a detailed form and we\'ll contact you',
      icon: <MessageSquare className="h-5 w-5" />,
      action: 'request',
    },
    {
      id: 'schedule-call',
      title: 'Schedule a Call',
      description: 'Book a time slot for a phone consultation',
      icon: <Phone className="h-5 w-5" />,
      action: 'call',
      disabled: true, // For MVP
    },
    {
      id: 'video-meeting',
      title: 'Video Meeting',
      description: 'Schedule a video call for screen sharing',
      icon: <Video className="h-5 w-5" />,
      action: 'video',
      disabled: true, // For MVP
    },
  ];

  return (
    <div className="space-y-6">
      {/* Service Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Service</CardTitle>
          <CardDescription>
            Select the type of automation service you need
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className={`relative p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  selectedService === service.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                {service.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-primary">
                    Popular
                  </Badge>
                )}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{service.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">
                        {service.duration}
                      </span>
                      <span className="font-semibold text-sm">
                        {service.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Booking Methods */}
      <Card>
        <CardHeader>
          <CardTitle>How would you like to proceed?</CardTitle>
          <CardDescription>
            Choose your preferred way to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {bookingMethods.map((method) => (
              <div
                key={method.id}
                className={`p-4 border rounded-lg ${
                  method.disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'cursor-pointer hover:shadow-md hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{method.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {method.description}
                    </p>
                    <div className="mt-3">
                      {method.action === 'request' ? (
                        <ServiceRequestDialog 
                          onSuccess={onRequestSubmitted}
                          trigger={
                            <Button size="sm" className="w-full">
                              <Plus className="h-4 w-4 mr-1" />
                              Submit Request
                            </Button>
                          }
                        />
                      ) : (
                        <Button 
                          size="sm" 
                          className="w-full" 
                          disabled={method.disabled}
                          variant={method.disabled ? "outline" : "default"}
                        >
                          {method.disabled ? (
                            'Coming Soon'
                          ) : (
                            <>
                              <Calendar className="h-4 w-4 mr-1" />
                              Book Now
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedService && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Ready to get started?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You've selected {services.find(s => s.id === selectedService)?.title}. 
                Choose how you'd like to proceed above.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}