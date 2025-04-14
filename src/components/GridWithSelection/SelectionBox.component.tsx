import { useEffect, useRef } from 'react';

import { startSelectionHandling } from './SelectionBox.utils';

interface SelectionBoxProps {
    onSelection?: (selectionBox: HTMLElement) => void;
}

export function SelectionBox({ onSelection }: SelectionBoxProps) {
    const selectionBox = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onPointerDown = startSelectionHandling(selectionBox.current, onSelection);

        document.addEventListener('pointerdown', onPointerDown);

        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
        };
    }, [onSelection]);

    return <div ref={selectionBox} className="selection-box"></div>;
}
