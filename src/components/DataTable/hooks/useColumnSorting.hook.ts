import { useState } from 'react';

import { ColumnDefinition, SortOrder } from '../DataTable.constants';
import { getNextSortOrder } from '../DataTable.utils';

export function useColumnSorting<T>() {
    const [order, setOrder] = useState<SortOrder>('n');
    const [sortedColumn, setSortedColumn] = useState<ColumnDefinition<T> | null>(null);

    const sortColumn = (column: ColumnDefinition<T>, newOrder?: SortOrder) => {
        const nextOrder = column === sortedColumn ? getNextSortOrder(order, newOrder) : 'a';

        setOrder(nextOrder);
        setSortedColumn(nextOrder !== 'n' ? column : null);
    };

    return {
        order,
        setOrder,
        sortedColumn,
        setSortedColumn,
        sortColumn,
    };
}
