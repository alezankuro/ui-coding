import Board from './Board';
import { BoardCellValue, DEFAULT_BOARD_SIZE, NEXT_PLAYER_CELL } from './TicTacToe.constants';

export class TicTacToeGame {
    public size: number;

    public board: Board;

    public currentPlayerCell: BoardCellValue;

    public winCondition: number;

    public winner: BoardCellValue | null;

    constructor(game: Partial<TicTacToeGame>) {
        this.size = game.size ?? DEFAULT_BOARD_SIZE;
        this.board = new Board(game.board, this.size);
        this.currentPlayerCell = game.currentPlayerCell ?? BoardCellValue.Zero;
        this.winCondition = game.winCondition ?? this.board.size;
        this.winner = game.winner ?? null;
    }

    public getBoard() {
        return this.board;
    }

    public getCurrentPlayerCell() {
        return this.currentPlayerCell;
    }

    public setCurrentPlayerCell(cellValue?: BoardCellValue) {
        if (cellValue) {
            this.currentPlayerCell = cellValue;
        } else {
            this.currentPlayerCell = NEXT_PLAYER_CELL[this.currentPlayerCell];
        }

        return new TicTacToeGame(this);
    }

    public setWinner(value: BoardCellValue | null = this.currentPlayerCell) {
        this.winner = value;

        return new TicTacToeGame(this);
    }

    public makeMove(cellIndex: number) {
        if (this.winner) return this;

        this.board.setCell(cellIndex, this.currentPlayerCell);

        if (this.board.checkWin(cellIndex, this.currentPlayerCell, this.winCondition)) {
            this.setWinner();
        } else {
            this.setCurrentPlayerCell();
        }

        return new TicTacToeGame(this);
    }
}

export default TicTacToeGame;
