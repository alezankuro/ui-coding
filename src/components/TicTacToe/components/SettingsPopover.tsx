import { useEffect, useState } from 'react';

interface SettingsPopoverProps {
    popoverRef: React.RefObject<HTMLElement>;
    onApply: (settings: { boardSize: number; winCondition: number }) => void;
    currentSize: number;
    currentWinCondition?: number;
}

export function SettingsPopover({
    popoverRef,
    onApply,
    currentSize,
    currentWinCondition,
}: SettingsPopoverProps) {
    const [boardSize, setBoardSize] = useState(currentSize);
    const [winCondition, setWinCondition] = useState(currentWinCondition || 3);

    // Update local state when props change
    useEffect(() => {
        setBoardSize(currentSize);
        setWinCondition(currentWinCondition || 3);
    }, [currentSize, currentWinCondition]);

    // Validate and apply settings
    const handleApply = () => {
        // Ensure win condition doesn't exceed board size
        const validWinCondition = Math.min(winCondition, boardSize);

        onApply({
            boardSize,
            winCondition: validWinCondition,
        });

        // Close the popover
        if (popoverRef.current) {
            (popoverRef.current as HTMLDialogElement).hidePopover();
        }
    };

    return (
        <div className="settings-popover-content">
            <div className="settings-popover-header">Game Settings</div>

            <div className="settings-input-group">
                <label htmlFor="boardSize">Board Size:</label>
                <input
                    id="boardSize"
                    type="number"
                    min="3"
                    max="10"
                    value={boardSize}
                    onChange={(e) =>
                        setBoardSize(Math.max(3, Math.min(10, e.target.valueAsNumber || 3)))
                    }
                />
                <span className="settings-input-hint">Min: 3, Max: 10</span>
            </div>

            <div className="settings-input-group">
                <label htmlFor="winCondition">Cells to Win:</label>
                <input
                    id="winCondition"
                    type="number"
                    min="3"
                    max={boardSize}
                    value={winCondition}
                    onChange={(e) =>
                        setWinCondition(
                            Math.max(3, Math.min(boardSize, e.target.valueAsNumber || 3)),
                        )
                    }
                />
                <span className="settings-input-hint">Min: 3, Max: Board Size</span>
            </div>

            <div className="settings-popover-footer">
                <button onClick={() => popoverRef.current?.hidePopover()}>Cancel</button>
                <button onClick={handleApply}>Apply</button>
            </div>
        </div>
    );
}

export default SettingsPopover;
