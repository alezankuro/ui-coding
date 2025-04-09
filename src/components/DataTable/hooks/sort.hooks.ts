import { useEffect, useState } from 'react';

import { ColumnKeys, SortOrder } from '../DataTable.constants';
import { getNextSortOrder } from '../DataTable.utils';

export function useColumnSorting<T>() {
    const [order, setOrder] = useState<SortOrder>('n');
    const [sortedColumn, setSortedColumn] = useState<ColumnKeys<T> | null>(null);

    useEffect(() => {
        if (order === 'n') {
            setSortedColumn(null);
        }
    }, [order]);

    const sortColumn = (column: ColumnKeys<T>, newOrder?: SortOrder) => {
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
