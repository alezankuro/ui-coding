export function resettSelectionBoxStyles(
    element: HTMLDivElement,
    { left, top }: { left: number; top: number },
) {
    Object.assign(element.style, {
        display: 'block',
        left: `${left}px`,
        top: `${top}px`,
        width: '0',
        height: '0',
    });
}

export function updateSelectionBoxStyles(
    element: HTMLDivElement,
    { left, top, width, height }: { left: number; top: number; width: number; height: number },
) {
    Object.assign(element.style, {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
    });
}

export function hideSelectionBox(element: HTMLDivElement) {
    element.style.display = 'none';
}

export function startSelectionHandling(
    element?: HTMLDivElement | null,
    onSelection?: (selectionBox: HTMLElement) => void,
) {
    return function onMouseDown(event: MouseEvent) {
        if (!element) return;

        resettSelectionBoxStyles(element, {
            left: event.pageX,
            top: event.pageY,
        });

        function onMouseMove(moveEvent: MouseEvent) {
            if (!element) return;

            updateSelectionBoxStyles(element, {
                left: Math.min(event.pageX, moveEvent.pageX),
                top: Math.min(event.pageY, moveEvent.pageY),
                width: Math.abs(moveEvent.pageX - event.pageX),
                height: Math.abs(moveEvent.pageY - event.pageY),
            });

            onSelection?.(element);
        }

        function onMouseUp() {
            if (!element) return;

            hideSelectionBox(element);

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp, { once: true });
    };
}
