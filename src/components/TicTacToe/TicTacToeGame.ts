export enum BoardCellValue {
    Zero = '0',
    Cross = 'X',
    Empty = '',
}

export const DEFAULT_BOARD_SIZE = 3;

export const NEXT_PLAYER_CELL: Record<BoardCellValue, BoardCellValue> = {
    [BoardCellValue.Cross]: BoardCellValue.Zero,
    [BoardCellValue.Zero]: BoardCellValue.Cross,
    [BoardCellValue.Empty]: BoardCellValue.Zero,
};

export class TicTacToeGame {
    public board: BoardCellValue[] = [];

    public size: number = DEFAULT_BOARD_SIZE;

    public currentPlayerCell = BoardCellValue.Zero;

    public winCondition: number = DEFAULT_BOARD_SIZE;

    public winner: BoardCellValue | null = null;

    constructor(game: Partial<TicTacToeGame>) {
        this.currentPlayerCell = game.currentPlayerCell ?? BoardCellValue.Zero;
        this.size = game.size ?? DEFAULT_BOARD_SIZE;
        this.board = game.board ?? this.getEmptyBoard(this.size);
        this.winCondition = game.winCondition ?? this.size;
        this.winner = game.winner ?? null;
    }

    public setCell(cellIndex: number, cellValue: BoardCellValue) {
        this.board = this.board.map((value, index) => (index === cellIndex ? cellValue : value));

        return new TicTacToeGame(this);
    }

    public getCell(cellIndex: number) {
        return this.board[cellIndex];
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

        this.setCell(cellIndex, this.currentPlayerCell);

        if (this.checkWin(cellIndex)) {
            this.setWinner();
        } else {
            this.setCurrentPlayerCell();
        }

        return new TicTacToeGame(this);
    }

    private getEmptyBoard(size: number) {
        return Array(size * size).fill(BoardCellValue.Empty);
    }

    private getCellRowCol(cellIndex: number) {
        return [Math.floor(cellIndex / this.size), cellIndex % this.size];
    }

    private checkWin(cellIndex: number) {
        const cellValue = this.board[cellIndex];

        if (cellValue === BoardCellValue.Empty) return false;

        const [row, col] = this.getCellRowCol(cellIndex);

        return (
            this.checkLine(this.getColumn(col), this.currentPlayerCell, this.winCondition) ||
            this.checkLine(this.getRow(row), this.currentPlayerCell, this.winCondition) ||
            this.checkLine(
                this.getMainDiagonal([row, col]),
                this.currentPlayerCell,
                this.winCondition,
            ) ||
            this.checkLine(
                this.geSecondaryDiagonal([row, col]),
                this.currentPlayerCell,
                this.winCondition,
            )
        );
    }

    private getColumn(colIndex: number) {
        const column = [];

        for (let i = 0; i < this.size; i++) {
            column.push(this.board[colIndex + i * this.size]);
        }

        return column;
    }

    private getRow(rowIndex: number) {
        const row = [];

        for (let i = 0; i < this.size; i++) {
            row.push(this.board[rowIndex * this.size + i]);
        }

        return row;
    }

    private getMainDiagonal([row, col]: [number, number]) {
        const cellOffset = col - row;
        const count = this.size - Math.abs(cellOffset);
        const startIndex = cellOffset < 0 ? -1 * cellOffset * this.size : cellOffset;
        const diagonal = [];

        for (let i = startIndex; i < startIndex + count * (this.size + 1); i += this.size + 1) {
            diagonal.push(this.board[i]);
        }

        return diagonal;
    }

    private geSecondaryDiagonal([row, col]: [number, number]) {
        const cellOffset = this.size - 1 - col - row;
        const count = this.size - Math.abs(cellOffset);
        const startIndex =
            cellOffset < 0
                ? -1 * cellOffset * this.size + (this.size - 1)
                : this.size - 1 - cellOffset;

        const diagonal = [];

        for (let i = startIndex; i < startIndex + count * (this.size - 1); i += this.size - 1) {
            diagonal.push(this.board[i]);
        }

        return diagonal;
    }

    private checkLine(
        line: BoardCellValue[],
        cellValue: BoardCellValue,
        requiredLength: number,
    ): boolean {
        let count = 0;

        for (const cell of line) {
            if (cell !== cellValue) {
                count = 0;
                continue;
            }

            if (++count >= requiredLength) {
                return true;
            }
        }

        return false;
    }
}

export default TicTacToeGame;
