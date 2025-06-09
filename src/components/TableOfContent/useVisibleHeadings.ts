import { useEffect, useState } from 'react';

import { getHeadingElements } from './utils';

const DEFAULT_INTERSECTION_OPTIONS: IntersectionObserverInit = {
    root: null,
    rootMargin: '20px',
    threshold: 1.0,
};

function addToSet<T>(set: Set<T>, value: T) {
    const newSet = new Set(set);
    newSet.add(value);
    return newSet;
}

function removeFromSet<T>(set: Set<T>, value: T) {
    const newSet = new Set(set);
    newSet.delete(value);
    return newSet;
}

export function useVisibleHeadings(
    contentSelector: string,
    intersectionOptions: IntersectionObserverInit = {},
) {
    const [visibleHeadings, setVisibleHeadings] = useState<Set<HTMLElement>>(new Set());

    useEffect(() => {
        const options: IntersectionObserverInit = {
            ...DEFAULT_INTERSECTION_OPTIONS,
            ...intersectionOptions,
        };

        const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setVisibleHeadings((prev) =>
                        addToSet(prev, entry.target as HTMLHeadingElement),
                    );
                } else {
                    setVisibleHeadings((prev) =>
                        removeFromSet(prev, entry.target as HTMLHeadingElement),
                    );
                }
            });
        };

        const observer = new IntersectionObserver(intersectionCallback, options);

        getHeadingElements(document.querySelector(contentSelector)).forEach((el) => {
            observer.observe(el);
        });

        return () => {
            observer.disconnect();
        };
    }, [contentSelector, intersectionOptions]);

    return { visibleHeadings };
}
