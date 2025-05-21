import { CSSProperties, useEffect, useState } from 'react';

import Board from './Board';
import { BoardCellValue, CellValueMap, DEFAULT_BOARD_SIZE } from './TicTacToe.constants';
import TicTacToeGame from './TicTacToeGame';

import './TicTacToe.styles.css';

export interface TicTacToeProps {
    boardSize?: number;
    winCondition?: number;
}

export function TicTacToe({ boardSize = DEFAULT_BOARD_SIZE, winCondition }: TicTacToeProps) {
    const [game, setGame] = useState(() => new TicTacToeGame({ size: boardSize, winCondition }));

    useEffect(() => {
        setGame(new TicTacToeGame({ size: boardSize, winCondition }));
    }, [boardSize, winCondition]);

    const onCellClick = (cellIndex: number) => {
        if (game.board.isEmptyCell(cellIndex)) return;

        setGame(game.makeMove(cellIndex));
    };

    const onReset = () => {
        setGame(new TicTacToeGame({ size: boardSize, winCondition }));
    };

    return (
        <div className="tic-tac-game">
            <GameBoard board={game.getBoard()} winner={game.winner} onCellClick={onCellClick} />
            <Controls winner={game.winner} onReset={onReset} />
        </div>
    );
}

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

interface CellProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    cell: BoardCellValue;
    disabled?: boolean;
}

export function Cell({ cell, disabled, onClick }: CellProps) {
    return (
        <button onClick={onClick} disabled={disabled} className="tic-tac-cell">
            {CellValueMap[cell]}
        </button>
    );
}

interface ControlsProps {
    winner: BoardCellValue | null;
    onReset(): void;
}

export function Controls({ winner, onReset }: ControlsProps) {
    return (
        <div className="tic-tac-controls">
            {winner ? <div>Winner: {winner}</div> : null}
            <button onClick={onReset}>Restart</button>
        </div>
    );
}

export function Cross() {
    return (
        <svg className="tic-tac-cross" viewBox="0 0 100 100">
            <path d="M10,10 L90,90"></path>
            <path d="M10,90 L90,10"></path>
        </svg>
    );
}

export function Zero() {
    return (
        <svg className="tic-tac-zero" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" />
        </svg>
    );
}

export default TicTacToe;
