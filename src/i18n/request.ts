import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { locales, LocaleType } from './config';

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as LocaleType)) notFound();

  const currentLocale = locale as LocaleType;

  return {
    locale: currentLocale,
    messages: (await import(`../app/messages/${locale}.json`)).default,
  };
});
