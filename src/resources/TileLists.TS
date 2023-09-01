import { SectorTileProps } from "../props/SectorTileProps"
console.log("Tile Props: ", SectorTileProps);
import { PlanetProps } from "../props/PlanetProps"
import { ResourceType } from "../props/ResourceProps"
import { DiscoveryTileProps } from "../props/DiscoveryTileProps"
import { TileEdge } from "../props/TileEdge"
console.log("Tile Edge: ", TileEdge);
import { DiscoveryTileLists } from "./DiscoveryTilleLists";


let allTiles: SectorTileProps[] = [
    new SectorTileProps(
        2, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
            new PlanetProps(ResourceType.science),
            new PlanetProps(ResourceType.advanced_science)
        ], //planets
        [], //npcs
        DiscoveryTileLists[Math.floor(Math.random() * DiscoveryTileLists.length)], //discoveryTile
        2, //point_value
        false //artifact
    )
]

let centerTiles: SectorTileProps[] = [
    new SectorTileProps(
        0, //id
        [
            new TileEdge(true), //bottom right
            new TileEdge(true), //bottom
            new TileEdge(true), //bottom left
            new TileEdge(true), //top left
            new TileEdge(true), //top
            new TileEdge(true), //top right
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
            new PlanetProps(ResourceType.science),
            new PlanetProps(ResourceType.materials),
            new PlanetProps(ResourceType.advanced_science),
            new PlanetProps(ResourceType.advanced_materials),
            new PlanetProps(ResourceType.advanced_gold),
        ], //planets
        [], //npcs
        DiscoveryTileLists[Math.floor(Math.random() * DiscoveryTileLists.length)], //discoveryTile
        2, //point_value
        true
    )
]

let ring1Tiles: SectorTileProps[] = [
    new SectorTileProps(
        10, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [], //planets
        [], //npcs
        new DiscoveryTileProps(null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    ),
    new SectorTileProps(
        11, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
        ], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    ),
    new SectorTileProps(
        12, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
            new PlanetProps(ResourceType.science),
        ], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    ),
    new SectorTileProps(
        13, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
            new PlanetProps(ResourceType.science),
            new PlanetProps(ResourceType.advanced_science)
        ], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    ),
    new SectorTileProps(
        14, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
            new PlanetProps(ResourceType.science),
            new PlanetProps(ResourceType.advanced_science),
            new PlanetProps(ResourceType.advanced_science)
        ], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    )
]

let ring2Tiles: SectorTileProps[] = [
    new SectorTileProps(
        20, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    ),
    new SectorTileProps(
        21, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
        ], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    ),
    new SectorTileProps(
        22, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
            new PlanetProps(ResourceType.science),
        ], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    ),
    new SectorTileProps(
        23, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
            new PlanetProps(ResourceType.science),
            new PlanetProps(ResourceType.advanced_science)
        ], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    ),
    new SectorTileProps(
        24, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
            new PlanetProps(ResourceType.science),
            new PlanetProps(ResourceType.advanced_science),
            new PlanetProps(ResourceType.advanced_science)
        ], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    )
]

let ring3Tiles: SectorTileProps[] = [
    new SectorTileProps(
        30, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    ),
    new SectorTileProps(
        31, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
        ], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    ),
    new SectorTileProps(
        32, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
            new PlanetProps(ResourceType.science),
        ], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    ),
    new SectorTileProps(
        33, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
            new PlanetProps(ResourceType.science),
            new PlanetProps(ResourceType.advanced_science)
        ], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    ),
    new SectorTileProps(
        34, //id
        [
            new TileEdge(false), //bottom right,
            new TileEdge(true), //bottom,
            new TileEdge(false), //bottom left,
            new TileEdge(false), //top left,
            new TileEdge(true), //top,
            new TileEdge(false), //top right,
        ], //edges
        [
            new PlanetProps(ResourceType.gold),
            new PlanetProps(ResourceType.science),
            new PlanetProps(ResourceType.advanced_science),
            new PlanetProps(ResourceType.advanced_science)
        ], //planets
        [], //npcs
        new DiscoveryTileProps(false, null, () => {}), //discoveryTile
        2, //point_value
        false //artifact
    )
]

export default allTiles;
export { centerTiles as centerTiles, ring1Tiles, ring2Tiles, ring3Tiles };