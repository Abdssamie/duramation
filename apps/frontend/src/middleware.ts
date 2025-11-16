import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';
import { getLocales, defaultLocale } from '@/locales/config';

function getLocale(request: NextRequest): string {
  try {
    const locales = getLocales();
    if (!locales || !Array.isArray(locales) || locales.length === 0) {
      return defaultLocale;
    }

    // Check for valid locale in cookies first
    const localeCookie = request.cookies.get('locale')?.value;
    if (localeCookie && locales.includes(localeCookie as 'en' | 'fr')) {
      return localeCookie;
    }

    // Parse accept-language header
    const acceptLanguage = request.headers.get('accept-language') || '';
    if (!acceptLanguage) {
      return defaultLocale;
    }

    const headers = { 'accept-language': acceptLanguage };
    const languages = new Negotiator({ headers }).languages();

    if (!languages || languages.length === 0) {
      return defaultLocale;
    }

    // Ensure all languages are strings and valid BCP 47 language tags
    const validLanguages = languages.filter((lang) =>
      /^[a-zA-Z]{2,}(-[a-zA-Z]{2,})?$/.test(lang)
    );

    if (validLanguages.length === 0) {
      return defaultLocale;
    }

    return match(validLanguages, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
}

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  if (isProtectedRoute(request)) await auth.protect();

  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const locale = getLocale(request);
  if (request.cookies.get('locale')?.value !== locale) {
    response.cookies.set('locale', locale);
  }

  return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};
