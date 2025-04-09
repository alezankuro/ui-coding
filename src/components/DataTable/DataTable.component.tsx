import { useColumnSorting } from './hooks/useColumnSorting.hook';
import { usePagination } from './hooks/usePagination.hook';
import { ColumnDefinition, PAGE_SIZES } from './DataTable.constants';
import { classNames, getPage, sortData } from './DataTable.utils';
import { TablePagination } from './TablePagination.component';

import './DataTable.styles.css';

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDefinition<T>[];
}

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
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
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                onClick={() => {
                                    goToPage(0);
                                    sortColumn(column);
                                }}
                            >
                                <button
                                    className={classNames({
                                        ['data-table__header-button--sorted']:
                                            sortedColumn === column,
                                    })}
                                >
                                    {column.label}
                                </button>
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
