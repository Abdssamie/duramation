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
  <div className={`flex ${className} items-center justify-center rounded ${bgColor} text-xs font-bold text-white`}>
    {letter}
  </div>
);

// Provider icon registry
export const PROVIDER_ICONS: Record<Provider, React.ComponentType<React.SVGProps<SVGSVGElement>> | null> = {
  GOOGLE: GoogleIcon,
  SLACK: SlackIcon,
  MICROSOFT: MicrosoftIcon,
  INSTAGRAM: InstagramIcon,
  HUBSPOT: null,
  FIRECRAWL: null,
  CUSTOM: null,
};

// Letter icons for providers without custom SVG components
export const PROVIDER_LETTER_ICONS: Record<Provider, { letter: string; bgColor: string }> = {
  GOOGLE: { letter: 'G', bgColor: 'bg-blue-600' },
  SLACK: { letter: 'S', bgColor: 'bg-purple-600' },
  MICROSOFT: { letter: 'M', bgColor: 'bg-blue-500' },
  HUBSPOT: { letter: 'H', bgColor: 'bg-orange-600' },
  FIRECRAWL: { letter: 'F', bgColor: 'bg-red-600' },
  INSTAGRAM: { letter: 'I', bgColor: 'bg-pink-600' },
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
