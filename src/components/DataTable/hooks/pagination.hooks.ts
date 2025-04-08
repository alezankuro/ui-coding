import { useEffect, useState } from 'react';

import { User } from '../DataTable.constants';

export function usePagination(data: User[] = [], initialPage = 0, initialPageSize = 0) {
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [pageData, setPageData] = useState<User[]>([]);

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
