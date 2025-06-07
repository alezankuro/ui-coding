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
        setGame(game.makeMove(cellIndex));
    };

    const onReset = () => {
        setGame(new TicTacToeGame({ size: game.size, winCondition: game.winCondition }));
    };

    const onSettingsChange = ({
        boardSize,
        winCondition: newWinCondition,
    }: {
        boardSize: number;
        winCondition: number;
    }) => {
        setGame(new TicTacToeGame({ size: boardSize, winCondition: newWinCondition }));
    };

    return (
        <div className="tic-tac-game">
            <GameBoard board={game.getBoard()} winner={game.winner} onCellClick={onCellClick} />
            <Controls
                winner={game.winner}
                onReset={onReset}
                size={game.size}
                winCondition={game.winCondition}
                onSettingsChange={onSettingsChange}
            />
        </div>
    );
}

export default TicTacToe;
