import { useRef } from 'react';

import { Grid, GridRef } from './Grid.component';
import { isIntersect } from './GridWithSelection.utils';
import { SelectionBox } from './SelectionBox.component';

import './GridWithSelection.styles.css';

interface GridWithSelectionProps {
    size: { rows: number; cols: number };
}

export function GridWithSelection({ size }: GridWithSelectionProps) {
    const gridRef = useRef<GridRef>(null);

    function onSelection(selectionBox: HTMLElement) {
        if (!selectionBox || !gridRef.current) return;

        const cells = gridRef.current.getCells();

        cells.forEach((cell) => {
            if (isIntersect(selectionBox, cell)) {
                gridRef.current?.selectCell(cell);
            } else {
                gridRef.current?.unselectCell(cell);
            }
        });
    }

    return (
        <div className="grid-with-selection-container">
            <SelectionBox onSelection={onSelection} />
            <Grid ref={gridRef} size={size} />
        </div>
    );
}
