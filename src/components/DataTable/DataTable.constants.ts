import { ReactNode } from 'react';

export type ColumnKeys<T> = Exclude<keyof T, symbol>;

export type ColumnDefinition<T> = {
    key: Exclude<keyof T, symbol>;
    label: string;
    cell(data: T): ReactNode;
    sort(a: T, b: T): number;
};

export type SortOrder = 'a' | 'd' | 'n';

export const PAGE_SIZES = [5, 10, 20];
