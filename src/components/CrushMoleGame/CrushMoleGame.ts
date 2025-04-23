export enum FieldValue {
    EMPTY,
    MOLE,
}

export class CrushMoleGameSerivce {
    public field: FieldValue[] = [];

    private timer: ReturnType<typeof setTimeout> | null = null;

    constructor(public fieldSize: number = 0) {
        this.field = Array(fieldSize * fieldSize).fill(FieldValue.EMPTY);
    }

    public get size() {
        return this.field.length;
    }

    public clearField() {
        this.field = this.field.map(() => FieldValue.EMPTY);

        return this;
    }

    public placeMole() {
        const nextPosition = this.getRandomNumber(0, this.size);

        this.field = this.field.map((_, index) =>
            index === nextPosition ? FieldValue.MOLE : FieldValue.EMPTY,
        );

        return this;
    }

    public startGame() {
        const newGame = new CrushMoleGameSerivce(this.fieldSize);
        newGame.placeMole();

        return newGame;
    }

    public stopGame() {
        return new CrushMoleGameSerivce(this.fieldSize);
    }

    public crushMole(delay = this.getRandomNumber(100, 1000)) {
        if (this.timer) return;

        return new Promise<FieldValue[]>((resolve) => {
            this.timer = setTimeout(() => {
                this.placeMole();
                this.timer = null;

                resolve(this.field);
            }, delay);
        });
    }

    private resetTimer() {
        this.timer = null;
    }

    private getRandomNumber(min = 0, max = 1) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
