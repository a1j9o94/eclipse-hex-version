import { DiceProps, DiceFace } from "./DiceProps";
import { ShipProps } from "./ShipProps";

export enum PartType {
    hull = "hull",
    cannon = "cannon",
    missile = "missile",
    shield = "shield",
    energy = "energy",
    computer = "computer",
    drive = "drive",
}

export class PartProps {
    
   constructor(type: PartType, energyCost: number, name: string) {
        this.type = type;
        this.energyCost = energyCost;
        this.name = name;
    }
    
    type: PartType;
    energyCost: number;
    name: string;
    triggerEffect?: (shipProps: ShipProps) => void;
}

export class HullProps extends PartProps {
    constructor(energyCost: number, name: string, hullPoints: number) {
        super(PartType.hull, energyCost, name);
        this.hullPoints = hullPoints;
    }
    
    hullPoints: number;
}

export class CannonProps extends PartProps {
    constructor(energyCost: number, name: string, dice: DiceProps[]) {
        super(PartType.cannon, energyCost, name);
        this.dice = dice;
    }
    
    dice: DiceProps[];

    rollDice: () => DiceFace[] = () => {
        //return a random face from each dice
        let results: DiceFace[] = [];
        this.dice.forEach(die => {
            results.push(die.diceFaces[Math.floor(Math.random() * die.diceFaces.length)]);
        });

        return results;
    }
}

export class MissleProps extends PartProps {
    constructor(energyCost: number, name: string, dice: DiceProps[]) {
        super(PartType.missile, energyCost, name);
        this.dice = dice;
    }
    
    dice: DiceProps[];

    rollDice: () => DiceFace[] = () => {
        //return a random face from each dice
        let results: DiceFace[] = [];
        this.dice.forEach(die => {
            results.push(die.diceFaces[Math.floor(Math.random() * die.diceFaces.length)]);
        });

        return results;
    }
}

export class ShieldProps extends PartProps {
    constructor(energyCost: number, name: string, shieldPoints: number) {
        super(PartType.shield, energyCost, name);
        this.shieldPoints = shieldPoints;
    }
    
    shieldPoints: number;
}

export class EnergyProps extends PartProps {
    constructor(name: string, energyPoints: number) {
        super(PartType.energy, 0, name);
        this.energyPoints = energyPoints;
    }
    
    energyPoints: number;
}

export class ComputerProps extends PartProps {
    constructor(energyCost: number, rollBonus: number, name: string) {
        super(PartType.computer, energyCost, name);
        this.rollBonus = rollBonus;
    }
    rollBonus: number;
}

export class DriveProps extends PartProps {
    constructor(energyCost: number, name: string, move: number) {
        super(PartType.drive, energyCost, name);
        this.move = move;
    }
    
    move: number;
}