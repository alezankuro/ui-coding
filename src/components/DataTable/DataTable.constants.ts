import { ReactNode } from 'react';

export type ColumnFilterTypes = 'text' | 'range';

export type RangeValue = number | undefined | null;

export type FitlerValueType = string | [RangeValue, RangeValue];

export type ColumnKeys<T> = Exclude<keyof T, symbol>;

export type ColumnSortComparator<T> = (a: T, b: T) => number;

export type ColumnDefinition<T> = {
    key: ColumnKeys<T>;
    label: string;
    cell(data: T): ReactNode;
    sort: ColumnSortComparator<T>;
    filter?: ColumnFilterTypes;
};

export type SortOrder = 'a' | 'd' | 'n';

export const SortOrderMapping: Record<SortOrder, SortOrder> = {
    a: 'd',
    n: 'a',
    d: 'n',
};

export const PAGE_SIZES = [5, 10, 20];
