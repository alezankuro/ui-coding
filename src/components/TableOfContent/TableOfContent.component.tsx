import {
    startTransition,
    unstable_ViewTransition as ViewTransition,
    useEffect,
    useRef,
    useState,
} from 'react';

import { getHeadingElements, getHeadings, HeadingData } from './utils';

import './TableOfContent.style.css';

interface TableOfContentProps {
    contentSelector: string;
}
export function TableOfContent({ contentSelector }: TableOfContentProps) {
    const [headings, setHeadings] = useState<HeadingData[]>([]);
    const [visibleHeadings, setVisibleHeadings] = useState<Set<HTMLElement>>(new Set());
    const [selectedHeading, setSelectedHeading] = useState<HeadingData | null>(null);
    const isManualScrolling = useRef(false);

    useEffect(() => {
        setHeadings(getHeadings(document.querySelector(contentSelector)));
    }, [contentSelector]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0,
        };

        const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setVisibleHeadings((prev) => {
                        const newSet = new Set(prev);
                        newSet.add(entry.target as HTMLHeadingElement);
                        return newSet;
                    });
                } else {
                    setVisibleHeadings((prev) => {
                        const newSet = new Set(prev);
                        newSet.delete(entry.target as HTMLHeadingElement);
                        return newSet;
                    });
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
    }, [contentSelector]);

    useEffect(() => {
        if (isManualScrolling.current) {
            return;
        }
        const heading = headings.find((heading) => visibleHeadings.has(heading.element)) ?? null;

        setSelectedHeading(heading);
    }, [visibleHeadings, headings]);

    const onItemClick = (heading: HeadingData) => {
        startTransition(() => {
            isManualScrolling.current = true;
            setSelectedHeading(heading);

            heading.element.scrollIntoView({ behavior: 'smooth' });
            window.addEventListener('scrollend', () => (isManualScrolling.current = false), {
                once: true,
            });
        });
    };

    return (
        <aside>
            <div className="toc--wrapper">
                <ul className="toc--list">
                    {headings.map((heading, index) => {
                        const className = [
                            'toc--list-item',
                            selectedHeading === heading ? 'toc--list-item__selected' : '',
                        ].join(' ');

                        return (
                            <li
                                key={index}
                                className={className}
                                onClick={() => onItemClick(heading)}
                            >
                                {selectedHeading === heading && (
                                    <ViewTransition name="indicator">
                                        <div className="toc--list-item-indicator"></div>
                                    </ViewTransition>
                                )}
                                <div style={{ paddingLeft: `${heading.level * 15}px` }}>
                                    {heading.text}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </aside>
    );
}

export default TableOfContent;
