import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ColumnKeys, SortOrder } from '../DataTable.constants';
import { getNextSortOrder, sortData } from '../DataTable.utils';

export function useColumnSorting<T>(
    data: T[],
    setData: Dispatch<SetStateAction<T[]>>,
    initialData: T[],
) {
    const [order, setOrder] = useState<SortOrder>('n');
    const [sortedColumn, setSortedColumn] = useState<ColumnKeys<T> | null>(null);

    useEffect(() => {
        if (!sortedColumn) return;

        setData(sortData(data, sortedColumn, order));
    }, [data, order, sortedColumn, setData]);

    useEffect(() => {
        if (order === 'n') {
            setData(initialData);
            setSortedColumn(null);
        }
    }, [initialData, order, setData]);

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
