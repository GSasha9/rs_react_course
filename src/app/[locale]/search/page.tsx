import SearchPageClient from './search-page-client';

import { ComicsRequestResults } from '@/shared/models/interfaces';
import { baseURL } from '@/store/api/comics.api';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { pageNumber?: string };
}) => {
  let data: ComicsRequestResults | null = null;

  try {
    const pageNumber = searchParams.pageNumber;
    const url = `/search?pageNumber=${pageNumber ?? 1}`;
    const response = await fetch(`${baseURL}${url}`, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    data = await response.json();
  } catch (error) {
    console.error(error);
  }

  return <SearchPageClient result={data} />;
};

export default SearchPage;
