import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ColumnKeys, SortOrder, User } from '../DataTable.constants';
import { getNextSortOrder, sortData } from '../DataTable.utils';

export function useColumnSorting(
    data: User[],
    setData: Dispatch<SetStateAction<User[]>>,
    initialData: User[],
) {
    const [order, setOrder] = useState<SortOrder>('n');
    const [sortedColumn, setSortedColumn] = useState<ColumnKeys | null>(null);

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
