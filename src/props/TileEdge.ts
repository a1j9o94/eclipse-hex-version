
export class TileEdge {

    constructor(hasWormhole: boolean) {
      this.hasWormhole = hasWormhole;
    }
  
    hasWormhole: boolean;
    connectedTile?: number | null = null; // You can use any identifier for the connected tile
  }