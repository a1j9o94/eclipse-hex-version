import { PartProps } from './PartProps';
import { PlayerProps } from './PlayerProps';


export class DiscoveryTileProps {
    
    constructor(benefit: PartProps | null, points: number = 2, collect: (player: PlayerProps) => void) {
        this.benefit = benefit;
        this.collect = collect;
        this.points = points;
    }
    
    benefit: PartProps | null;
    reveal: boolean = false;
    collectable: boolean = false;
    points: number = 0;

    //callback function to be called when the benefit is applied
    collect: (player: PlayerProps) => void;
}   