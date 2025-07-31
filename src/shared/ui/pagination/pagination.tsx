import { useSearchParams } from 'react-router-dom';

import './pagination.scss';

interface PaginationProps {
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

  return (
    <div className="pagination">
      {Array.from({ length: pages }).map((_, index) => {
        const activeClass = activeNumber === index + 1 ? 'active' : '';

        return (
          <button
            className={`button-pagination ${activeClass}`}
            key={index}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
