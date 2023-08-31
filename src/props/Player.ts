import { Faction } from "./Faction";

export class Player {
    constructor(faction: Faction, color: string) {
        this.faction = faction;
        this.color = color;
    }

    faction: Faction;
    color: string;
}