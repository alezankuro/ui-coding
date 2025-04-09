import { ColumnDefinition, SortOrder, SortOrderMapping } from './DataTable.constants';

export const numSort = (a: number, b: number) => a - b;
export const stringSort = (a: string, b: string) => a.localeCompare(b);

export function sortData<T>(data: T[], col: ColumnDefinition<T>, order: SortOrder) {
    const sorted = [...data];
    const { sort } = col;

    sorted.sort((a, b) => (order === 'd' ? -1 : 1) * sort(a, b));

    return sorted;
}

export function getNextSortOrder(prevOrder: SortOrder, nextOrder?: SortOrder) {
    return nextOrder ?? SortOrderMapping[prevOrder];
}

export function getPage<T>(items: T[] = [], page: number, pageSize: number) {
    const pageStart = page * pageSize;
    const pageEnd = pageStart + pageSize;

    return items.slice(pageStart, pageEnd);
}
