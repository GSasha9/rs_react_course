import { useSearchParams } from 'react-router-dom';

import './pagination.scss';

export interface PaginationProps {
  pages: number;
  activeNumber: number;
}

const Pagination = ({ pages, activeNumber }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      pageNumber: String(page),
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
