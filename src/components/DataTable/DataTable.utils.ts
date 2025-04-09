import { ColumnKeys, SortOrder } from './DataTable.constants';

export const numSort = (a: number, b: number) => a - b;
export const stringSort = (a: string, b: string) => a.localeCompare(b);

export function sort<T>(a: T, b: T) {
    if (typeof a === 'number' && typeof b === 'number') {
        return numSort(a, b);
    }

    if (typeof a === 'string' && typeof b === 'string') {
        return stringSort(a, b);
    }

    return 0;
}

export function sortData<T>(data: T[], col: ColumnKeys<T>, order: SortOrder) {
    const sorted = [...data];

    sorted.sort((a, b) => {
        return (order === 'd' ? -1 : 1) * sort(a[col], b[col]);
    });

    return sorted;
}

export function getNextSortOrder(prevOrder: SortOrder, nextOrder?: SortOrder) {
    let targetOrder = nextOrder;

    if (!targetOrder) {
        switch (prevOrder) {
            case 'a':
                targetOrder = 'd';
                break;
            case 'n':
                targetOrder = 'a';
                break;
            case 'd':
            default:
                targetOrder = 'n';
        }
    }

    return targetOrder;
}

export function getPage<T>(items: T[] = [], page: number, pageSize: number) {
    const pageStart = page * pageSize;
    const pageEnd = pageStart + pageSize;

    return items.slice(pageStart, pageEnd);
}

export function classNames(classes: Record<string, boolean | undefined>) {
    return Object.entries(classes)
        .filter(([, val]) => Boolean(val))
        .map(([key]) => key)
        .join(' ');
}
