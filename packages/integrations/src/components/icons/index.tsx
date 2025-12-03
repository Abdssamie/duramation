import React from 'react';
import { Provider } from '../../types/providers.js';
import GoogleIcon from './GoogleIcon.js';
import InstagramIcon from './InstagramIcon.js';
import MicrosoftIcon from './MicrosoftIcon.js';
import SlackIcon from './SlackIcon.js';

// Export individual icons
export { GoogleIcon, InstagramIcon, MicrosoftIcon, SlackIcon };

// Letter icon component for providers without custom SVG
export const LetterIcon = ({ 
  letter, 
  bgColor = 'bg-gray-600',
  className = 'h-4 w-4'
}: { 
  letter: string; 
  bgColor?: string;
  className?: string;
}) => (
  <div className={`flex ${className} items-center justify-center rounded ${bgColor} text-lg font-bold text-black dark:text-white`}>
    {letter}
  </div>
);

// Provider icon registry
export const PROVIDER_ICONS: Record<Provider, React.ComponentType<React.SVGProps<SVGSVGElement>> | null> = {
  google_mail: GoogleIcon,
  google_calendar: GoogleIcon,
  google_sheets: GoogleIcon,
  slack: SlackIcon,
  microsoft_mail: MicrosoftIcon,
  microsoft_calendar: MicrosoftIcon,
  hubspot: null,
  firecrawl: null,
  instagram: InstagramIcon,
  custom_api: null,
  // Legacy
  GOOGLE: GoogleIcon,
  SLACK_LEGACY: SlackIcon,
  MICROSOFT: MicrosoftIcon,
  INSTAGRAM_LEGACY: InstagramIcon,
  HUBSPOT_LEGACY: null,
  FIRECRAWL_LEGACY: null,
  CUSTOM: null,
};

// Letter icons for providers without custom SVG components
export const PROVIDER_LETTER_ICONS: Record<Provider, { letter: string; bgColor: string }> = {
  google_mail: { letter: 'G', bgColor: 'bg-blue-600' },
  google_calendar: { letter: 'C', bgColor: 'bg-blue-500' },
  google_sheets: { letter: 'S', bgColor: 'bg-green-600' },
  slack: { letter: 'S', bgColor: 'bg-purple-600' },
  microsoft_mail: { letter: 'M', bgColor: 'bg-blue-500' },
  microsoft_calendar: { letter: 'C', bgColor: 'bg-blue-500' },
  hubspot: { letter: 'H', bgColor: 'bg-orange-600' },
  firecrawl: { letter: 'F', bgColor: 'bg-purple-600' },
  instagram: { letter: 'I', bgColor: 'bg-pink-600' },
  custom_api: { letter: 'C', bgColor: 'bg-gray-600' },
  // Legacy
  GOOGLE: { letter: 'G', bgColor: 'bg-blue-600' },
  SLACK_LEGACY: { letter: 'S', bgColor: 'bg-purple-600' },
  MICROSOFT: { letter: 'M', bgColor: 'bg-blue-500' },
  HUBSPOT_LEGACY: { letter: 'H', bgColor: 'bg-orange-600' },
  FIRECRAWL_LEGACY: { letter: 'F', bgColor: 'bg-purple-600' },
  INSTAGRAM_LEGACY: { letter: 'I', bgColor: 'bg-pink-600' },
  CUSTOM: { letter: 'C', bgColor: 'bg-gray-600' },
};

// Helper component to render provider icon
export const ProviderIcon = ({ 
  provider, 
  className = 'h-4 w-4' 
}: { 
  provider: Provider; 
  className?: string;
}) => {
  const IconComponent = PROVIDER_ICONS[provider];
  
  if (IconComponent) {
    return <IconComponent className={className} />;
  }
  
  // Fallback to letter icon
  const letterIcon = PROVIDER_LETTER_ICONS[provider];
  return <LetterIcon letter={letterIcon.letter} bgColor={letterIcon.bgColor} className={className} />;
};
