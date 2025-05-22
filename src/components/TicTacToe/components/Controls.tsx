import { useCallback, useEffect, useRef } from 'react';

import { BoardCellValue, CellValueMap } from '../TicTacToe.constants';

import SettingsIcon from './SettingsIcon';
import SettingsPopover from './SettingsPopover';

interface ControlsProps {
    winner: BoardCellValue | null;
    onReset(): void;
    size: number;
    winCondition?: number;
    onSettingsChange?(settings: { boardSize: number; winCondition: number }): void;
}

export function Controls({ winner, onReset, size, winCondition, onSettingsChange }: ControlsProps) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const settingsPopoverRef = useRef<HTMLElement | null>(null);

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

    const handleSettingsChange = (settings: { boardSize: number; winCondition: number }) => {
        if (onSettingsChange) {
            onSettingsChange(settings);
        }
    };

    return (
        <div className="tic-tac-controls">
            <div className="tic-tac-buttons">
                <button
                    ref={buttonRef}
                    style={{ viewTransitionName: 'reset-button' }}
                    onClick={onReset}
                >
                    Restart
                </button>

                <button
                    className="settings-button"
                    onClick={() => settingsPopoverRef.current?.showPopover()}
                >
                    <SettingsIcon />
                </button>
            </div>

            <dialog ref={dialogRef} className="tic-tac-winner-dialog">
                <div className="winner-dialog-container">
                    <div className="winner-dialog-header">Winner</div>
                    <div className="winner-dialog-content">{winner && CellValueMap[winner]}</div>
                    <button style={{ viewTransitionName: 'reset-button' }} onClick={onPlayAgain}>
                        Play again
                    </button>
                </div>
            </dialog>

            <div
                ref={settingsPopoverRef as React.RefObject<HTMLDivElement>}
                className="tic-tac-settings-popover"
                popover="auto"
            >
                <SettingsPopover
                    popoverRef={settingsPopoverRef as React.RefObject<HTMLElement>}
                    onApply={handleSettingsChange}
                    currentSize={size}
                    currentWinCondition={winCondition}
                />
            </div>
        </div>
    );
}
