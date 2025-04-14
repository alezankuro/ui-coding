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
    return function onPointerDown(event: PointerEvent) {
        if (!element) return;

        (event.target as HTMLElement).setPointerCapture(event.pointerId);

        const initialX = event.pageX;
        const initialY = event.pageY;

        resettSelectionBoxStyles(element, {
            left: initialX,
            top: initialY,
        });

        function onPointerMove(moveEvent: PointerEvent) {
            if (!element) return;

            updateSelectionBoxStyles(element, {
                left: Math.min(initialX, moveEvent.pageX),
                top: Math.min(initialY, moveEvent.pageY),
                width: Math.abs(moveEvent.pageX - initialX),
                height: Math.abs(moveEvent.pageY - initialY),
            });

            onSelection?.(element);
        }

        function onPointerUp() {
            if (!element) return;

            hideSelectionBox(element);

            document.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('pointerup', onPointerUp);
        }

        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp);
    };
}
