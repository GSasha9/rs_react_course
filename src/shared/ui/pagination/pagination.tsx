import { useSearchParams } from 'react-router-dom';

import type { paginationProps } from './model/interfaces';

import './pagination.scss';

const Pagination = (props: paginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      pageNumber: String(page),
    });
  };

  return (
    <div className="pagination">
      {Array.from({ length: props.pages }).map((_, index) => {
        return (
          <button
            className="button-pagination"
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
