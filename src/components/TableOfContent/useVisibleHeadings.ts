import { useEffect, useState } from 'react';

import { addToSet, removeFromSet } from './utils';

const DEFAULT_INTERSECTION_OPTIONS: IntersectionObserverInit = {
    root: null,
    rootMargin: '20px',
    threshold: 1.0,
};

export function useVisibleHeadings(
    headings: Element[],
    intersectionOptions: IntersectionObserverInit = {},
) {
    const [visibleHeadings, setVisibleHeadings] = useState<Set<Element>>(new Set());

    useEffect(() => {
        const options: IntersectionObserverInit = {
            ...DEFAULT_INTERSECTION_OPTIONS,
            ...intersectionOptions,
        };

        const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setVisibleHeadings((prev) => addToSet(prev, entry.target));
                } else {
                    setVisibleHeadings((prev) => removeFromSet(prev, entry.target));
                }
            });
        };

        const observer = new IntersectionObserver(intersectionCallback, options);

        headings.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [headings, intersectionOptions]);

    return { visibleHeadings };
}
