import { BoardCellValue, CellValueMap } from '../TicTacToe.constants';

interface CellProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    cell: BoardCellValue;
    disabled?: boolean;
}

export function Cell({ cell, disabled, onClick }: CellProps) {
    return (
        <button onClick={onClick} disabled={disabled} className="tic-tac-cell">
            {CellValueMap[cell]()}
        </button>
    );
}
