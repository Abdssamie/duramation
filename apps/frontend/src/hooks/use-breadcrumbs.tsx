'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import useDictionary from '@/locales/dictionary-hook';

type BreadcrumbItem = {
  title: string;
  link: string;
};

export function useBreadcrumbs() {
  const pathname = usePathname();
  const dict = useDictionary();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbItems: BreadcrumbItem[] = segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      const translationKey = segment as keyof typeof dict.breadcrumbs;
      const title = dict.breadcrumbs[translationKey] || segment.charAt(0).toUpperCase() + segment.slice(1);

      return {
        title: title,
        link: path
      };
    });
    return breadcrumbItems;
  }, [pathname, dict]);

  return breadcrumbs;
}
