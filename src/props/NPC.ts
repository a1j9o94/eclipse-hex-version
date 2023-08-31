import { Blueprint } from "./Blueprint";

export interface NPC {
    name: string;
    blueprint: Blueprint;
    damage: number;
}