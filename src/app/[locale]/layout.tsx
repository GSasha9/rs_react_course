import { Metadata } from 'next';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';

import { ClientApp } from './client-app';

import Root from '@/shared/components/root/root';
import Spinner from '@/shared/ui/spinner/spinner';

interface IProps {
  children: React.ReactNode;
  params: { locale: string };
}

export const metadata: Metadata = {
  title: 'react-task-1',
};

export default async function LocaleLayout({ children, params }: IProps) {
  const { locale } = await params;

  const messages = await getMessages({ locale });

  return (
    <ClientApp messages={messages} locale={locale}>
      <Suspense fallback={<Spinner />}>
        <Root>{children}</Root>
      </Suspense>
    </ClientApp>
  );
}
