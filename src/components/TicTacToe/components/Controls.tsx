import { useCallback, useEffect, useId, useRef } from 'react';

import { BoardCellValue } from '../TicTacToe.constants';

import SettingsIcon from './SettingsIcon';
import SettingsPopover from './SettingsPopover';
import WinnerDialog, { WinnerDialogRef } from './WinnerDialog';

interface ControlsProps {
    winner: BoardCellValue | null;
    onReset(): void;
    size: number;
    winCondition?: number;
    onSettingsChange?(settings: { boardSize: number; winCondition: number }): void;
}

export function Controls({ winner, onReset, size, winCondition, onSettingsChange }: ControlsProps) {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const winnerDialogRef = useRef<WinnerDialogRef | null>(null);
    const popoverId = useId();

    const openWinnerDialog = useCallback(() => {
        const dialog = winnerDialogRef.current;
        const button = buttonRef.current;

        if (dialog?.open) return;

        document.startViewTransition(() => {
            if (button) button.style.display = 'none';
            if (dialog) dialog.showModal();
        });
    }, []);

    const closeWinnerDialog = useCallback(() => {
        const dialog = winnerDialogRef.current;
        const button = buttonRef.current;

        document.startViewTransition(() => {
            if (dialog) dialog.close();
            if (button) button.style.display = 'block';
        });
    }, []);

    function onPlayAgain() {
        onReset();
        closeWinnerDialog();
    }

    const handleSettingsChange = (settings: { boardSize: number; winCondition: number }) => {
        onSettingsChange?.(settings);
    };

    useEffect(() => {
        if (winner) openWinnerDialog();
    }, [winner, openWinnerDialog]);

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

                <button className="settings-button" popoverTarget={popoverId}>
                    <SettingsIcon />
                </button>
            </div>

            <WinnerDialog
                ref={winnerDialogRef}
                winner={winner}
                onPlayAgain={onPlayAgain}
                onClose={closeWinnerDialog}
            />

            <SettingsPopover
                id={popoverId}
                onApply={handleSettingsChange}
                currentSize={size}
                currentWinCondition={winCondition}
            />
        </div>
    );
}
