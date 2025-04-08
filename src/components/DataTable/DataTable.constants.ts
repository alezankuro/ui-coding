export type ColumnKeys<T> = Exclude<keyof T, symbol>;

export type TableColumn<T> = {
    label: string;
    key: ColumnKeys<T>;
};

export type SortOrder = 'a' | 'd' | 'n';

export const PAGE_SIZES = [5, 10, 20];
