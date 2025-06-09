import { startTransition, useEffect, useRef, useState } from 'react';

import { HeadingData, scrollToHeading } from './utils';

export function useHeadingSelection(headings: HeadingData[], visibleHeadings: Set<HTMLElement>) {
    const [selectedHeading, setSelectedHeading] = useState<HeadingData | null>(null);
    const isManualScrolling = useRef(false);

    useEffect(() => {
        if (isManualScrolling.current) return;

        const heading = headings.find(({ element }) => visibleHeadings.has(element)) ?? null;

        setSelectedHeading(heading);
    }, [visibleHeadings, headings]);

    const selectHeading = (heading: HeadingData) => {
        startTransition(() => {
            setSelectedHeading(heading);
            isManualScrolling.current = true;
            scrollToHeading(heading.element, () => (isManualScrolling.current = false));
        });
    };

    return { selectedHeading, selectHeading };
}
