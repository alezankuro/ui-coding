import { useEffect, useState } from 'react';

import { Controls, GameBoard } from './components';
import { DEFAULT_BOARD_SIZE } from './TicTacToe.constants';
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

export default TicTacToe;
