import { CSSProperties } from 'react';

import Board from '../Board';
import { BoardCellValue } from '../TicTacToe.constants';

import { Cell } from './Cell';

interface BoardProps {
    onCellClick?(cellIndex: number): void;
    board: Board;
    winner: BoardCellValue | null;
}

export function GameBoard({ board, winner, onCellClick }: BoardProps) {
    return (
        <div className="tic-tac-board" style={{ '--board-size': board.size } as CSSProperties}>
            {board.board.map((cell, index) => (
                <Cell
                    onClick={() => onCellClick?.(index)}
                    key={index}
                    cell={cell}
                    disabled={board.isEmptyCell(index) || Boolean(winner)}
                />
            ))}
        </div>
    );
}
