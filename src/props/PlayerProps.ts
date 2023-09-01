import { DiscoveryTileProps } from "./DiscoveryTileProps";
import { FactionProps } from "./FactionProps";
import { ReputationTileProps } from "./ReputationTileProps";
import { ResourceType } from "./ResourceProps";

export class PlayerProps {
    constructor(faction: FactionProps, color: string) {
        this.faction = faction;
        this.color = color;
    }

    faction: FactionProps;
    color: string;

    discoveryTiles: DiscoveryTileProps[] = [];
    reputationTiles: ReputationTileProps[] = [];
    resources: { [key in ResourceType]: number } = {
        [ResourceType.gold]: 0,
        [ResourceType.science]: 0,
        [ResourceType.materials]: 0,
        [ResourceType.advanced_gold]: 0,
        [ResourceType.advanced_science]: 0,
        [ResourceType.advanced_materials]: 0,
        [ResourceType.wild]: 0,
        [ResourceType.advanced_wild]: 0,
    };

    choice: number = -1; // will be the array index that represents a choice made by the player


    addReputationTile(tile: ReputationTileProps) {
        if (this.reputationTiles.length < this.faction.reputation_capacity) {
            this.reputationTiles.push(tile);
        } else {
            console.log("Max reputation capacity reached.");
        }
    }
}