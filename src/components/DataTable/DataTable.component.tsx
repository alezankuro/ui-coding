import { ReactElement } from 'react';

import { usePagination } from './hooks/pagination.hooks';
import { useColumnSorting } from './hooks/sort.hooks';
import { PAGE_SIZES, TableColumn } from './DataTable.constants';
import { classNames, getPage, sortData } from './DataTable.utils';
import { TablePagination } from './TablePagination';

import './DataTable.styles.css';

interface DataTableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    renderRow(rowData: T): ReactElement;
}

export function DataTable<T>({ data, columns, renderRow }: DataTableProps<T>) {
    const { sortedColumn, order, sortColumn } = useColumnSorting<T>();
    const { page, pageSize, totalPagesCount, goToPage, changePageSize } = usePagination(
        data.length,
        0,
        PAGE_SIZES[0],
    );

    const sortedData = sortedColumn ? sortData(data, sortedColumn, order) : data;
    const pageData = getPage(sortedData, page, pageSize);

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
