import { Ref, useEffect, useImperativeHandle, useRef } from 'react';

import { BoardCellValue, CellValueMap } from '../TicTacToe.constants';

export interface WinnerDialogRef {
    open: boolean;
    showModal(): void;
    close(): void;
}

interface WinnerDialogProps {
    ref?: Ref<WinnerDialogRef | null>;
    winner: BoardCellValue | null;
    onPlayAgain: () => void;
    onClose: () => void;
}

export default function WinnerDialog({ ref, winner, onPlayAgain, onClose }: WinnerDialogProps) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useImperativeHandle(ref, () => {
        return {
            get open() {
                return Boolean(dialogRef.current?.open);
            },
            showModal() {
                dialogRef.current?.showModal();
            },
            close() {
                dialogRef.current?.close();
            },
        };
    });

    useEffect(() => {
        const dialog = dialogRef.current;

        function onCancel(event: Event) {
            event.preventDefault();
            onClose();
        }

        if (dialog) dialog.addEventListener('cancel', onCancel);

        return () => {
            if (dialog) dialog.removeEventListener('cancel', onCancel);
        };
    }, [onClose]);

    return (
        <dialog ref={dialogRef} className="tic-tac-winner-dialog" closedby="any">
            <div className="winner-dialog-container">
                <div className="winner-dialog-header">Winner</div>
                <div className="winner-dialog-content">{winner && CellValueMap[winner]()}</div>
                <button style={{ viewTransitionName: 'reset-button' }} onClick={onPlayAgain}>
                    Play again
                </button>
            </div>
        </dialog>
    );
}
