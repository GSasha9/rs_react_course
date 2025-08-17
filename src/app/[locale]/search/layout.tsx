import SearchPage from './search-page.tsx';

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SearchPage>{children}</SearchPage>;
}
