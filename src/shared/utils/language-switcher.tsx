'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { locales, LocaleType } from '@/i18n/config';

const LANGUAGE_MAP = {
  en: 'EN',
  ru: 'РУ',
} as const;

const LanguageSwitcher = () => {
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const currentLocale = params.locale as LocaleType;

  const handleLocaleChange = (newLocale: LocaleType) => {
    if (newLocale === currentLocale) return;

    startTransition(() => {
      const currentPath = window.location.pathname;
      const newPath = currentPath.replace(currentLocale, newLocale);

      router.push(newPath);
    });
  };

  return (
    <div>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          disabled={isPending}
        >
          {LANGUAGE_MAP[locale]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
