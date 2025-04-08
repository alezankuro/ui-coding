export type User = {
    id: number;
    name: string;
    age: number;
    occupation: string;
};

export type ColumnKeys = (typeof columns)[number]['key'];
export type SortOrder = 'a' | 'd' | 'n';

export const PAGE_SIZES = [5, 10, 20];

export const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Occupation', key: 'occupation' },
] as const;
