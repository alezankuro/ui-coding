import { PAGE_SIZES } from './DataTable.constants';

interface TablePaginationProps {
    currentIndex: number;
    totalPagesCount: number;
    pageSize: number;
    onPageSizeChange(value: number): void;
    onNextPage(): void;
    onPrevPage(): void;
}

export function TablePagination({
    currentIndex = 0,
    totalPagesCount = 0,
    pageSize,
    onPageSizeChange,
    onNextPage,
    onPrevPage,
}: TablePaginationProps) {
    return (
        <div className="table-pagination__container">
            <select
                aria-label="Page size"
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
            >
                {PAGE_SIZES.map((size) => (
                    <option key={size} value={size}>
                        Show {size}
                    </option>
                ))}
            </select>
            <button onClick={onPrevPage} disabled={!currentIndex}>
                Prev
            </button>
            <span aria-label="Page number">{`Page ${currentIndex + 1} of ${totalPagesCount}`}</span>
            <button onClick={onNextPage} disabled={currentIndex === totalPagesCount - 1}>
                Next
            </button>
        </div>
    );
}
