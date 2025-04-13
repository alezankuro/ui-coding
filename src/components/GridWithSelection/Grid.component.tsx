import { CSSProperties, useImperativeHandle, useRef } from 'react';

export interface GridRef {
    getCells(): HTMLElement[];
    selectCell(cell: HTMLElement): void;
    unselectCell(cell: HTMLElement): void;
}

interface GridProps {
    ref?: React.Ref<GridRef>;
    size: { rows: number; cols: number };
}

export function Grid({ ref, size }: GridProps) {
    const gridRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
        ref,
        () => ({
            getCells() {
                if (!gridRef.current) return [];

                return Array.from(gridRef.current.querySelectorAll<HTMLElement>('.grid-cell'));
            },
            selectCell(cell: HTMLElement) {
                cell?.classList.add('grid-cell--selected');
            },
            unselectCell(cell: HTMLElement) {
                cell?.classList.remove('grid-cell--selected');
            },
        }),
        [],
    );

    return (
        <div ref={gridRef} className="grid" style={{ '--columns': size.cols } as CSSProperties}>
            {Array.from({ length: size.rows * size.cols }, (_, index) => (
                <div className="grid-cell" key={index}></div>
            ))}
        </div>
    );
}
