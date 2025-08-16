'use client';

import './pagination.scss';

import { useRouter } from '@/i18n/navigation';

export interface PaginationProps {
  pages: number;
  activeNumber: number;
}

const Pagination = ({ pages, activeNumber }: PaginationProps) => {
  const router = useRouter();

  const handleClick = (page: number) => {
    router.push({
      pathname: '/search',
      query: {
        pageNumber: String(page),
      },
    });
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
