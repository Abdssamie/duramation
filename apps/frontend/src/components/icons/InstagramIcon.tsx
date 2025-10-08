import * as React from 'react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="24" height="24" rx="6" fill="#E1306C" />
    <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" />
    <circle cx="17" cy="7" r="1.5" fill="white" />
  </svg>
);

export default InstagramIcon;
