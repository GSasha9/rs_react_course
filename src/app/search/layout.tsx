import SearchPage from './search-page';

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SearchPage>{children}</SearchPage>;
}
