import { Part } from './Part';
import { Player } from './Player';


export class DiscoveryTileProps {
    
    constructor(isPart: boolean, benefit: Part | null, collect: (player: Player) => void) {
        this.isPart = isPart;
        this.benefit = benefit;
        this.collect = collect;
    }
    
    isPart: boolean;
    benefit: Part | null;

    //callback function to be called when the benefit is applied
    collect: (player: Player) => void;
}   