export function isIntersect(selection: HTMLElement, cell: HTMLElement): boolean {
    const s = selection.getBoundingClientRect();
    const c = cell.getBoundingClientRect();

    return !(s.top > c.bottom || s.right < c.left || s.bottom < c.top || s.left > c.right);
}
