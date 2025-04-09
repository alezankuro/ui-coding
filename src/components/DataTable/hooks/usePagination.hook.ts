import { useState } from 'react';

export function usePagination(totalItemsCount: number, initialPage = 0, initialPageSize = 0) {
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const totalPagesCount = Math.ceil(totalItemsCount / pageSize);

    const goToPage = (index: number) => {
        if (index < 0 || index >= totalPagesCount) return;

        setPage(index);
    };

    const changePageSize = (newSize: number) => {
        setPageSize(newSize);
        setPage(0);
    };

    return {
        page,
        pageSize,
        totalPagesCount,
        goToPage,
        changePageSize,
    };
}
