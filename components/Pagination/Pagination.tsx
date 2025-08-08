import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={onPageChange}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel={'Prev'}
      nextLabel={'Next'}
      breakLabel={'...'}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      disabledClassName={css.disabled}
    />
  );
}
