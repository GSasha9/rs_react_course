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
        const activeClass = props.activeNumber === index + 1 ? 'active' : '';

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
