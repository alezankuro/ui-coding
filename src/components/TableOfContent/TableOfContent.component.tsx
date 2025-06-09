import { unstable_ViewTransition as ViewTransition, useEffect, useState } from 'react';
import clsx from 'clsx';

import { useHeadingSelection } from './useHeadingSelection';
import { useVisibleHeadings } from './useVisibleHeadings';
import { getHeadingElements, HEADING_LEVELS, HeadingTag } from './utils';

import './TableOfContent.style.css';

interface TableOfContentProps {
    contentSelector: string;
}
export function TableOfContent({ contentSelector }: TableOfContentProps) {
    const [headings, setHeadings] = useState<Element[]>([]);
    const { visibleHeadings } = useVisibleHeadings(headings);
    const { selectedHeading, selectHeading } = useHeadingSelection(headings, visibleHeadings);

    useEffect(() => {
        setHeadings(getHeadingElements(document.querySelector(contentSelector)));
    }, [contentSelector]);

    return (
        <ul className="toc--list">
            {headings.map((heading, index) => {
                return (
                    <ListItem
                        key={index}
                        heading={heading}
                        isSelected={selectedHeading === heading}
                        onClick={selectHeading}
                    />
                );
            })}
        </ul>
    );
}

interface ListItemProps {
    heading: Element;
    isSelected: boolean;
    onClick(heading: Element): void;
}

export function ListItem({ heading, isSelected, onClick }: ListItemProps) {
    const className = clsx('toc--list-item', isSelected && 'toc--list-item__selected');
    const offsetStyles = { paddingLeft: `${HEADING_LEVELS[heading.tagName as HeadingTag] * 15}px` };

    return (
        <li className={className} onClick={() => onClick(heading)}>
            {isSelected &&
                (ViewTransition ? (
                    <ViewTransition name="indicator">
                        <div className="toc--list-item-indicator"></div>
                    </ViewTransition>
                ) : (
                    <div className="toc--list-item-indicator"></div>
                ))}
            <div style={offsetStyles}>{heading.textContent}</div>
        </li>
    );
}

export default TableOfContent;
