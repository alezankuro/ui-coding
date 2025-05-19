import { CSSProperties, useEffect, useState } from 'react';

import { BoardCellValue, DEFAULT_BOARD_SIZE } from './TicTacToe.constants';
import TicTacToeGame from './TicTacToeGame';

import './TicTacToe.styles.css';

export interface TicTacToeProps {
    boardSize?: number;
    winCondition?: number;
}

export function TicTacToe({ boardSize = DEFAULT_BOARD_SIZE, winCondition }: TicTacToeProps) {
    const [game, setGame] = useState(new TicTacToeGame({ size: boardSize, winCondition }));

    useEffect(() => {
        setGame(new TicTacToeGame({ size: boardSize, winCondition }));
    }, [boardSize, winCondition]);

    const onCellClick = (cellIndex: number) => {
        if (game.board.getCell(cellIndex) !== BoardCellValue.Empty) return;

        setGame(game.makeMove(cellIndex));
    };

    const onReset = () => {
        setGame(new TicTacToeGame({ size: boardSize, winCondition }));
    };

    return (
        <div className="tic-tac-game">
            <div className="tic-tac-board" style={{ '--board-size': boardSize } as CSSProperties}>
                {game.board.board.map((cell, index) => (
                    <div
                        onClick={() => onCellClick(index)}
                        className="tic-tac-cell"
                        key={crypto.randomUUID()}
                    >
                        {cell}
                    </div>
                ))}
            </div>
            <div className="tic-tac-controls">
                {game.winner ? <div>Winner: {game.winner}</div> : null}
                <button onClick={onReset}>Restart</button>
            </div>
        </div>
    );
}

export default TicTacToe;
