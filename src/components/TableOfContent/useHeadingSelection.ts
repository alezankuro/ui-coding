import { startTransition, useEffect, useRef, useState } from 'react';

import { scrollToHeading } from './utils';

export function useHeadingSelection(headings: Element[], visibleHeadings: Set<Element>) {
    const [selectedHeading, setSelectedHeading] = useState<Element | null>(null);
    const isManualScrolling = useRef(false);

    useEffect(() => {
        if (isManualScrolling.current) return;

        const heading = headings.find((element) => visibleHeadings.has(element)) ?? null;

        setSelectedHeading(heading);
    }, [visibleHeadings, headings]);

    const selectHeading = (heading: Element) => {
        startTransition(() => {
            setSelectedHeading(heading);
            isManualScrolling.current = true;
            scrollToHeading(heading, () => (isManualScrolling.current = false));
        });
    };

    return { selectedHeading, selectHeading };
}
