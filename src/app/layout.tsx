import { Metadata } from 'next';

import { ClientApp } from './client-app';

import '../styles/style.scss';
import '../shared/ui/header/header.scss';

import Root from '@/shared/components/root/root';

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
          <Root> {children} </Root>
        </ClientApp>
      </body>
    </html>
  );
}
