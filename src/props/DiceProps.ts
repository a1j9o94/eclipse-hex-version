

export interface DiceFace {
    damage: number;
}

export class DiceProps {
    constructor(diceFaces: DiceFace[]) {
        this.diceFaces = diceFaces;
    }

    diceFaces: DiceFace[];
}