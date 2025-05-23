import { BoardCellValue, DEFAULT_BOARD_SIZE } from './TicTacToe.constants';

export class Board {
    public board: BoardCellValue[] = [];

    public size: number = DEFAULT_BOARD_SIZE;

    constructor(board?: Partial<Board>, size?: number) {
        this.size = size ?? board?.size ?? DEFAULT_BOARD_SIZE;
        this.board = board?.board ? [...board.board] : this.getEmptyBoard(this.size);
    }

    public setCell(cellIndex: number, cellValue: BoardCellValue) {
        this.board = this.board.map((value, index) => (index === cellIndex ? cellValue : value));

        return new Board(this);
    }

    public getCell(cellIndex: number) {
        return this.board[cellIndex];
    }

    public isEmptyCell(cellIndex: number) {
        return this.getCell(cellIndex) !== BoardCellValue.Empty;
    }

    public getEmptyBoard(size: number) {
        return Array(size * size).fill(BoardCellValue.Empty);
    }

    private getCellRowCol(cellIndex: number): [number, number] {
        return [Math.floor(cellIndex / this.size), cellIndex % this.size];
    }

    public checkWin(cellIndex: number, playerCell: BoardCellValue, winCondition: number) {
        const cellValue = this.board[cellIndex];

        if (cellValue === BoardCellValue.Empty) return false;

        const [row, col] = this.getCellRowCol(cellIndex);

        return (
            this.checkLine(this.getColumn(col), playerCell, winCondition) ||
            this.checkLine(this.getRow(row), playerCell, winCondition) ||
            this.checkLine(this.getMainDiagonal([row, col]), playerCell, winCondition) ||
            this.checkLine(this.geSecondaryDiagonal([row, col]), playerCell, winCondition)
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
        const offset = col - row;
        const count = this.size - Math.abs(offset);
        const start = offset < 0 ? -1 * offset * this.size : offset;

        const diagonal = [];

        for (let i = start; i < start + count * (this.size + 1); i += this.size + 1) {
            diagonal.push(this.board[i]);
        }

        return diagonal;
    }

    private geSecondaryDiagonal([row, col]: [number, number]) {
        const offset = this.size - 1 - col - row;
        const count = this.size - Math.abs(offset);
        const start =
            offset < 0 ? -1 * offset * this.size + (this.size - 1) : this.size - 1 - offset;

        const diagonal = [];

        for (let i = start; i < start + count * (this.size - 1); i += this.size - 1) {
            diagonal.push(this.board[i]);
        }

        return diagonal;
    }

    private checkLine(
        line: BoardCellValue[],
        cellValue: BoardCellValue,
        winCondition: number,
    ): boolean {
        let count = 0;

        for (const cell of line) {
            if (cell !== cellValue) {
                count = 0;
                continue;
            }

            if (++count >= winCondition) {
                return true;
            }
        }

        return false;
    }
}

export default Board;
