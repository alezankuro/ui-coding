import { useEffect, useState } from 'react';

import { DEFAULT_BOARD_SIZE } from '../TicTacToe.constants';

import NumberInput from './NumberInput';

interface SettingsPopoverProps {
    onApply: (settings: { boardSize: number; winCondition: number }) => void;
    onCancel: () => void;
    currentSize: number;
    currentWinCondition?: number;
}

export function SettingsPopover({
    onApply,
    onCancel,
    currentSize,
    currentWinCondition,
}: SettingsPopoverProps) {
    const [boardSize, setBoardSize] = useState(currentSize || DEFAULT_BOARD_SIZE);
    const [winCondition, setWinCondition] = useState(currentWinCondition || boardSize);

    useEffect(() => {
        setBoardSize(currentSize);
        setWinCondition(currentWinCondition || currentSize);
    }, [currentSize, currentWinCondition]);

    useEffect(() => {
        if (winCondition > boardSize) {
            setWinCondition(boardSize);
        }
    }, [boardSize, winCondition]);

    const handleApply = () => {
        onApply({
            boardSize,
            winCondition,
        });
    };

    return (
        <div className="settings-popover-content">
            <div className="settings-popover-header">Game Settings</div>

            <div className="settings-input-group">
                <NumberInput
                    id="boardSize"
                    label="Board Size:"
                    value={boardSize}
                    min={3}
                    max={10}
                    disabled
                    onChange={(value) => setBoardSize(value)}
                    hint="Min: 3, Max: 10"
                />
            </div>

            <div className="settings-input-group">
                <NumberInput
                    id="winCondition"
                    label="Cells to Win:"
                    value={winCondition}
                    min={3}
                    max={boardSize}
                    disabled
                    onChange={(value) => setWinCondition(value)}
                    hint="Min: 3, Max: Board Size"
                />
            </div>

            <div className="settings-popover-footer">
                <button onClick={onCancel}>Cancel</button>
                <button onClick={handleApply}>Apply</button>
            </div>
        </div>
    );
}

export default SettingsPopover;
