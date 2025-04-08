import { useEffect, useState } from 'react';

export function usePagination<T>(data: T[] = [], initialPage = 0, initialPageSize = 0) {
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [pageData, setPageData] = useState<T[]>([]);

    const totalPagesCount = Math.ceil(data.length / pageSize);

    useEffect(() => {
        const pageStart = page * pageSize;
        const pageEnd = pageStart + pageSize;

        setPageData(data.slice(pageStart, pageEnd));
    }, [data, page, pageSize]);

    const goToPage = (index: number) => {
        if (index < 0 || index >= totalPagesCount) return;

        setPage(index);
    };

    const changePageSize = (newSize: number) => {
        setPageSize(newSize);
        setPage(0);
    };

    return {
        pageData,
        page,
        pageSize,
        totalPagesCount,
        goToPage,
        changePageSize,
    };
}
