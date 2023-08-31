import { TileEdge } from "./TileEdge";
import { PlanetProps } from "./PlanetProps";
import { NPC } from "./NPC";
import { DiscoveryTileProps } from "./DiscoveryTileProps";

export class SectorTileProps {

    constructor(id: number, edges: TileEdge[], planets: PlanetProps[], npcs: NPC[], discoveryTile: DiscoveryTileProps | null, point_value: number, artifact: boolean) {
      
      if(edges.length != 6) throw new Error("SectorTileProps: edges must be an array of length 6");
      
      this.id = id;
      this.edges = edges;
      this.planets = planets;
      this.npcs = npcs;
      this.discoveryTile = discoveryTile;
      this.point_value = point_value;
      this.artifact = artifact;
    }
  
    id: number;
    edges: TileEdge[];
    planets: PlanetProps[];
    npcs?: NPC[];
    discoveryTile?: DiscoveryTileProps | null;
    point_value: number;
    artifact: boolean;
    owner?: Player | null = null;
  }