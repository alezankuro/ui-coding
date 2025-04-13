import { useEffect, useRef } from 'react';

import { startSelectionHandling } from './SelectionBox.utils';

interface SelectionBoxProps {
    onSelection?: (selectionBox: HTMLElement) => void;
}

export function SelectionBox({ onSelection }: SelectionBoxProps) {
    const selectionBox = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onMouseDown = startSelectionHandling(selectionBox.current, onSelection);

        document.addEventListener('mousedown', onMouseDown);

        return () => {
            document.removeEventListener('mousedown', onMouseDown);
        };
    }, [onSelection]);

    return <div ref={selectionBox} className="selection-box"></div>;
}
