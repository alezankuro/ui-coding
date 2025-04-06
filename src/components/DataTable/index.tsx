import { useEffect, useState } from 'react';

import './DataTable.styles.css';

export function classNames(classes: Record<string, boolean | undefined>) {
    return Object.entries(classes)
        .filter(([, val]) => Boolean(val))
        .map(([key]) => key)
        .join(' ');
}

const PAGE_SIZES = [5, 10, 20];

type User = {
    id: number;
    name: string;
    age: number;
    occupation: string;
};

const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Occupation', key: 'occupation' },
] as const;

type ColumnKeys = (typeof columns)[number]['key'];
type SortOrder = 'a' | 'd' | 'n';

const numSort = (a: number, b: number) => a - b;
const stringSort = (a: string, b: string) => a.localeCompare(b);

function sort<T>(a: T, b: T) {
    if (typeof a === 'number' && typeof b === 'number') {
        return numSort(a, b);
    }

    if (typeof a === 'string' && typeof b === 'string') {
        return stringSort(a, b);
    }

    return 0;
}

function sortData(data: User[], col: ColumnKeys, order: SortOrder) {
    const sorted = [...data];

    sorted.sort((a, b) => {
        return (order === 'd' ? -1 : 1) * sort(a[col], b[col]);
    });

    return sorted;
}

function getNextSortOrder(prevOrder: SortOrder, nextOrder?: SortOrder) {
    let targetOrder = nextOrder;

    if (!targetOrder) {
        switch (prevOrder) {
            case 'a':
                targetOrder = 'd';
                break;
            case 'n':
                targetOrder = 'a';
                break;
            case 'd':
            default:
                targetOrder = 'n';
        }
    }

    return targetOrder;
}

function useColumnSorting(data: User[], setData: (d: User[]) => void, initialData: User[]) {
    const [order, setOrder] = useState<SortOrder>('n');
    const [sortedColumn, setSortedColumn] = useState<ColumnKeys | null>(null);

    useEffect(() => {
        if (!sortedColumn) return;

        setData(sortData(data, sortedColumn, order));
    }, [data, order, sortedColumn]);

    useEffect(() => {
        if (order === 'n') {
            setData(initialData);
            setSortedColumn(null);
        }
    }, [initialData, order]);

    const sortColumn = (column: ColumnKeys, newOrder?: SortOrder) => {
        if (column === sortedColumn) {
            setOrder(getNextSortOrder(order, newOrder));
        } else {
            setOrder('a');
        }

        setSortedColumn(column);
    };

    return {
        order,
        setOrder,
        sortedColumn,
        setSortedColumn,
        sortColumn,
    };
}

interface DataTableProps {
    data: User[];
}

export default function DataTable({ data }: DataTableProps) {
    const [items, setItems] = useState<User[]>(data);
    const { pageData, page, pageSize, totalPagesCount, goToPage, changePageSize } = usePagination(
        items,
        0,
        PAGE_SIZES[0],
    );

    const { sortedColumn, sortColumn } = useColumnSorting(items, setItems, data);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map(({ label, key }) => (
                            <th
                                key={key}
                                onClick={() => {
                                    goToPage(0);
                                    sortColumn(key);
                                }}
                            >
                                <button
                                    className={classNames({
                                        ['data-table__header-button--sorted']: sortedColumn === key,
                                    })}
                                >
                                    {label}
                                </button>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pageData.map(({ id, name, age, occupation }) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{age}</td>
                            <td>{occupation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TablePagination
                currentIndex={page}
                pageSize={pageSize}
                totalPagesCount={totalPagesCount}
                onPageSizeChange={changePageSize}
                onNextPage={() => goToPage(page + 1)}
                onPrevPage={() => goToPage(page - 1)}
            />
        </div>
    );
}

function usePagination(data: User[] = [], initialPage = 0, initialPageSize = 0) {
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [pageData, setPageData] = useState<User[]>([]);

    const totalPagesCount = Math.ceil(data.length / pageSize);

    useEffect(() => {
        const pageStart = page * pageSize;
        const pageEnd = pageStart + pageSize;

        setPageData(data.slice(pageStart, pageEnd));
    }, [data, page, pageSize]);

    const goToPage = (index: number) => {
        if (index < 0 || index >= totalPagesCount) return;

        setPage(index);
    };

    const changePageSize = (newSize: number) => {
        setPageSize(newSize);
        setPage(0);
    };

    return {
        pageData,
        page,
        pageSize,
        totalPagesCount,
        goToPage,
        changePageSize,
    };
}

interface TablePaginationProps {
    currentIndex: number;
    totalPagesCount: number;
    pageSize: number;
    onPageSizeChange(value: number): void;
    onNextPage(): void;
    onPrevPage(): void;
}

function TablePagination({
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
