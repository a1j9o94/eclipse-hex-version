import { DiscoveryTileProps } from "../props/DiscoveryTileProps";
import { HullProps } from "../props/PartProps";

let conifoldField: HullProps = new HullProps(1, "Conifold Field", 3);

export const DiscoveryTileLists: DiscoveryTileProps[] = [
    new DiscoveryTileProps(conifoldField, (player) => {
        player.faction.default_blueprints[player.choice].parts.push(conifoldField);
    }),
    new DiscoveryTileProps(null, (player) => {
        player.resources.gold += 3;
    }),
];