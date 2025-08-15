import { redirect } from 'next/navigation';

interface PageProps {
  params: { locale: string };
}

export default function Page({ params }: PageProps) {
  const { locale } = params;

  redirect(`/${locale}/about`);
}
