import { useCallback, useEffect, useRef } from 'react';

import { BoardCellValue, CellValueMap } from '../TicTacToe.constants';

interface ControlsProps {
    winner: BoardCellValue | null;
    onReset(): void;
}

export function Controls({ winner, onReset }: ControlsProps) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const openModal = useCallback(() => {
        const dialog = dialogRef.current;
        const button = buttonRef.current;

        if (dialog?.open) return;

        document.startViewTransition(() => {
            if (button) button.style.display = 'none';
            if (dialog) dialog.showModal();
        });
    }, []);

    const closeModal = useCallback(() => {
        const dialog = dialogRef.current;
        const button = buttonRef.current;

        document.startViewTransition(() => {
            if (dialog) dialog.close();
            if (button) button.style.display = 'block';
        });
    }, []);

    useEffect(() => {
        if (winner) openModal();
    }, [winner, openModal]);

    useEffect(() => {
        const dialog = dialogRef.current;

        function onClose(event: Event) {
            event.preventDefault();
            closeModal();
        }

        if (dialog) dialog.addEventListener('cancel', onClose);

        return () => {
            if (dialog) dialog.removeEventListener('cancel', onClose);
        };
    }, [closeModal]);

    function onPlayAgain() {
        onReset();
        closeModal();
    }

    return (
        <div className="tic-tac-controls">
            <button
                ref={buttonRef}
                style={{ viewTransitionName: 'reset-button' }}
                onClick={onReset}
            >
                Restart
            </button>
            <dialog ref={dialogRef} className="tic-tac-winner-dialog">
                <div className="winner-dialog-container">
                    <div className="winner-dialog-header">Winner</div>
                    <div className="winner-dialog-content">{winner && CellValueMap[winner]}</div>
                    <button style={{ viewTransitionName: 'reset-button' }} onClick={onPlayAgain}>
                        Play again
                    </button>
                </div>
            </dialog>
        </div>
    );
}
