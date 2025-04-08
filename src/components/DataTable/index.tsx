import { useState } from 'react';

import { usePagination } from './hooks/pagination.hooks';
import { useColumnSorting } from './hooks/sort.hooks';
import { columns, PAGE_SIZES, User } from './DataTable.constants';
import { classNames } from './DataTable.utils';
import { TablePagination } from './TablePagination';

import './DataTable.styles.css';

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
