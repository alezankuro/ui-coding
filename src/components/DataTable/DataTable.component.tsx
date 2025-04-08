import { ReactElement, useState } from 'react';

import { usePagination } from './hooks/pagination.hooks';
import { useColumnSorting } from './hooks/sort.hooks';
import { PAGE_SIZES, TableColumn } from './DataTable.constants';
import { classNames } from './DataTable.utils';
import { TablePagination } from './TablePagination';

import './DataTable.styles.css';

interface DataTableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    renderRow(rowData: T): ReactElement;
}

export function DataTable<T>({ data, columns, renderRow }: DataTableProps<T>) {
    const [items, setItems] = useState<T[]>(data);
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
                <tbody>{pageData.map((rowData) => renderRow(rowData))}</tbody>
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

export default DataTable;
