import { useCallback, useState } from 'react';

import { ColumnKeys, FitlerValueType } from '../DataTable.constants';

export type ColumnFilter<T> = Map<ColumnKeys<T>, FitlerValueType>;

export function useColumnFilter<T>() {
    const [filters, setFilters] = useState<ColumnFilter<T>>(new Map());

    const updateFilter = useCallback(
        (column: ColumnKeys<T>, value?: FitlerValueType | null) => {
            if (!column) return;

            const newFilters = new Map(filters);

            if (!value) {
                newFilters.delete(column);
            } else {
                newFilters.set(column, value);
            }

            setFilters(newFilters);
        },
        [filters],
    );

    return {
        filters,
        updateFilter,
    };
}
