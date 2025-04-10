import { clsx } from 'clsx';

import { useColumnFilter } from './hooks/useColumnFilter';
import { useColumnSorting } from './hooks/useColumnSorting.hook';
import { usePagination } from './hooks/usePagination.hook';
import { ColumnDefinition, PAGE_SIZES } from './DataTable.constants';
import { filterData, getPage, sortData } from './DataTable.utils';
import { ColumnFilter } from './Filter.component';
import { TablePagination } from './TablePagination.component';

import './DataTable.styles.css';

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDefinition<T>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
    const { sortedColumn, order, sortColumn } = useColumnSorting<T>();
    const { filters, updateFilter } = useColumnFilter<T>();

    const filteredData = filterData(data, filters);

    const { page, pageSize, totalPagesCount, goToPage, changePageSize } = usePagination(
        filteredData.length,
        0,
        PAGE_SIZES[0],
    );

    const sortedData = sortedColumn ? sortData(filteredData, sortedColumn, order) : filteredData;
    const pageData = getPage(sortedData, page, pageSize);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={clsx({
                                    ['data-table__header-column--sorted']: sortedColumn === column,
                                })}
                            >
                                <button
                                    onClick={() => {
                                        goToPage(0);
                                        sortColumn(column);
                                    }}
                                >
                                    {column.label}
                                </button>
                                {column.filter && (
                                    <ColumnFilter
                                        type={column.filter}
                                        onChange={(value) => {
                                            goToPage(0);
                                            updateFilter(column.key, value);
                                        }}
                                    />
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pageData.map((rowData, index) => (
                        <tr key={index}>
                            {columns.map(({ key, cell }) => (
                                <td key={key}>{cell(rowData)}</td>
                            ))}
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

export default DataTable;
