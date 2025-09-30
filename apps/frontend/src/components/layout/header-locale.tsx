'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { getLocales, type Locale } from '@/locales/config';

const localeCountryMap: Record<string, string> = {
  en: 'US',
  es: 'ES',
  fr: 'FR',
  de: 'DE',
  ja: 'JP',
  ko: 'KR',
  'pt-BR': 'BR',
  'zh-CN': 'CN',
  'zh-TW': 'TW',
  it: 'IT',
  nl: 'NL',
  ru: 'RU',
  ar: 'SA',
  hi: 'IN',
  tr: 'TR',
  pl: 'PL',
  sv: 'SE',
  da: 'DK',
  fi: 'FI',
  nb: 'NO',
  cs: 'CZ',
  hu: 'HU',
  th: 'TH',
  id: 'ID',
  he: 'IL',
  vi: 'VN',
  uk: 'UA',
  ro: 'RO',
  bg: 'BG',
  hr: 'HR',
  sk: 'SK',
  sl: 'SI',
  et: 'EE',
  lv: 'LV',
  lt: 'LT',
  el: 'GR',
  sr: 'RS',
  az: 'AZ',
  ka: 'GE',
  fa: 'IR',
  ur: 'PK',
  bn: 'BD',
  gu: 'IN',
  kn: 'IN',
  ml: 'IN',
  mr: 'IN',
  pa: 'IN',
  ta: 'IN',
  te: 'IN',
  ne: 'NP',
  si: 'LK',
  km: 'KH',
  lo: 'LA',
  my: 'MM',
  am: 'ET',
  sw: 'TZ',
  xh: 'ZA',
  zu: 'ZA',
  af: 'ZA',
  sq: 'AL',
  mk: 'MK',
  bs: 'BA',
  mn: 'MN',
  tg: 'TJ',
  uz: 'UZ',
  kk: 'KZ',
  ky: 'KG',
  tk: 'TM',
  ug: 'UG',
  ps: 'AF',
  sd: 'PK',
  ku: 'IQ',
  so: 'SO',
  ti: 'ER',
  or: 'IN',
  as: 'IN',
  gd: 'GB',
  ga: 'IE',
  cy: 'GB',
  mt: 'MT',
  mi: 'NZ',
  sm: 'WS',
  to: 'TO',
  fj: 'FJ',
  gil: 'KI',
  mh: 'MH',
  na: 'NR',
  nr: 'ZA',
  ss: 'SZ',
  st: 'LS',
  tn: 'BW',
  ts: 'ZA',
  ve: 'ZA',
  wo: 'SN',
  yo: 'NG',
  ha: 'NG',
  ig: 'NG',
  ff: 'SN',
  ln: 'CD',
  lu: 'CD',
  kg: 'CD',
  mg: 'MG',
  ny: 'MW',
  sn: 'ZW',
  rw: 'RW',
  rn: 'BI',
  sg: 'CF',
  dz: 'BT',
  iu: 'CA',
  ik: 'US',
  ch: 'MP',
  bi: 'VU',
  ho: 'PG',
  ng: 'NA',
  kj: 'AO'
};

export default function HeaderLocale({
  currentLocale
}: {
  currentLocale: string;
}) {
  const [locale, setLocale] = useState(currentLocale);
  const router = useRouter();
  const locales = getLocales();

  const changeLocale = (loc: Locale) => {
    Cookies.set('locale', loc);
    setLocale(loc);
    router.refresh();
  };

  const getCountryCode = (loc: string) => {
    return localeCountryMap[loc] || loc.slice(-2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='flex items-center gap-1'>
          <Image
            alt='United States'
            width={24}
            height={16}
            className='h-4 w-6'
            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${getCountryCode(locale)}.svg`}
          />
          {locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-32'>
        {locales.map((loc) => (
          <DropdownMenuItem key={loc} onClick={() => changeLocale(loc)}>
            <Image
              alt='United States'
              width={24}
              height={16}
              className='mr-2 h-4 w-6'
              src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${getCountryCode(loc)}.svg`}
            />
            {loc.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
