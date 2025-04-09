import { ReactNode } from 'react';

export type ColumnKeys<T> = Exclude<keyof T, symbol>;

export type ColumnSortComparator<T> = (a: T, b: T) => number;

export type ColumnDefinition<T> = {
    key: ColumnKeys<T>;
    label: string;
    cell(data: T): ReactNode;
    sort: ColumnSortComparator<T>;
};

export type SortOrder = 'a' | 'd' | 'n';

export const SortOrderMapping: Record<SortOrder, SortOrder> = {
    a: 'd',
    n: 'a',
    d: 'n',
};

export const PAGE_SIZES = [5, 10, 20];
