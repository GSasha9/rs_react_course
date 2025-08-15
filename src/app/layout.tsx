import { Metadata } from 'next';
import { Suspense } from 'react';

import { ClientApp } from './client-app';

import '../styles/style.scss';
import '../shared/ui/header/header.scss';

import Root from '@/shared/components/root/root';
import Spinner from '@/shared/ui/spinner/spinner';

export const metadata: Metadata = {
  title: 'react-task-1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClientApp>
          <Suspense fallback={<Spinner />}>
            <Root>{children}</Root>
          </Suspense>
        </ClientApp>
      </body>
    </html>
  );
}
