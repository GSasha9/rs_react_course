'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import './pagination.scss';

export interface PaginationProps {
  pages: number;
  activeNumber: number;
}

const Pagination = ({ pages, activeNumber }: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (page: number) => {
    const query = new URLSearchParams(searchParams.toString());

    query.set('pageNumber', String(page));

    router.push(`/search?${query.toString()}`);
  };

  const pageButtons = Array.from({ length: pages }, (_, index) => {
    const page = index + 1;

    return {
      page,
      isActive: page === activeNumber,
    };
  });

  return (
    <div className="pagination">
      {pageButtons.map(({ page, isActive }) => (
        <button
          key={page}
          className={`button-pagination ${isActive ? 'active' : ''}`}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
