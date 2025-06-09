export const HEADING_LEVELS = {
    H1: 1,
    H2: 2,
    H3: 3,
    H4: 4,
    H5: 5,
    H6: 6,
} as const;

export type HeadingTag = keyof typeof HEADING_LEVELS;

export interface HeadingData {
    text: string;
    level: number;
    element: HTMLHeadingElement;
}

export function getHeadingElements(container: Element | null) {
    return container
        ? Array.from(container.querySelectorAll(Object.keys(HEADING_LEVELS).join(',')))
        : [];
}

export function getHeadings(container: HTMLElement | null): HeadingData[] {
    if (!container) return [];

    const headings = getHeadingElements(container);

    return headings.map((el) => ({
        text: el.textContent ?? '',
        level: HEADING_LEVELS[el.tagName as HeadingTag],
        element: el as HTMLHeadingElement,
    }));
}

export function scrollToHeading(element: Element, onScrollEnd: () => void) {
    element.scrollIntoView({ behavior: 'smooth' });
    window.addEventListener('scrollend', onScrollEnd, { once: true });
}
