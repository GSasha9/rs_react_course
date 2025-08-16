interface IProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function RootLayout({ children, params }: IProps) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <head />
      <body>{children}</body>
    </html>
  );
}
