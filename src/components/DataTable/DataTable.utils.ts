import {
    ColumnDefinition,
    ColumnKeys,
    FitlerValueType,
    SortOrder,
    SortOrderMapping,
} from './DataTable.constants';

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

export function filterData<T>(data: T[], filters: Map<ColumnKeys<T>, FitlerValueType>) {
    return data.filter((item) => {
        return [...filters.entries()].every(([col, filterValue]) => {
            const value = item[col];

            if (Array.isArray(filterValue)) {
                const [start, end] = filterValue;

                if (start == null && end != null) {
                    return Number(value) <= end;
                }

                if (end == null && start != null) {
                    return Number(value) >= start;
                }

                if (start == null && end == null) {
                    return false;
                }

                return start! <= Number(value) && Number(value) <= end!;
            } else {
                return String(value).toLowerCase().includes(filterValue.toLowerCase());
            }
        });
    });
}
