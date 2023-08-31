import {
  useType,
  useNewComponent,
  useChild,
  useDraw,
  Geometry,
  Polygon,
  Vector,
  Mouse,
  Entity,
  SystemFont,
  Label,
  Component,
} from "@hex-engine/2d";
import Wormhole from "./Wormhole";
import { centerTiles, ring1Tiles, ring2Tiles, ring3Tiles } from "../resources/TileLists";
import { TileEdge } from "../props/TileEdge";
import { SectorTileProps } from "../props/SectorTileProps";
import { PlanetProps } from "../props/PlanetProps";
import Planet from "./Planet";
import { sin60 } from "../utility/HexMath";

export default function SectorTile(center: Vector, radius: number, tileProps: SectorTileProps, isPlaceholder: boolean = false, ring: number = 0) {
  useType(SectorTile);

  let edges = tileProps.edges;

  // Define the points for the hexagon based on the origin and radius
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return new Vector(x, y);
  });

  // Create a geometry component for the hexagon
  const outline = useNewComponent(() => Geometry({
    shape: new Polygon(points),
    position: center,
  }));


  // creaete geometry components for the warp portals

  let wormholes: Entity[] = [];

  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    if (edge.hasWormhole) {
      const point1 = points[i];
      const point2 = points[(i + 1) % 6];
      let midpoint = wormholeMidpoint(center, point1, point2, i+1);
      // Draw the wormhole at the new midpoint
      let wormhole = useChild(() => Wormhole(midpoint));
      wormholes.push(wormhole);
    }
  }

  let planets: Entity[] = [];
  


  const mouse = useNewComponent(Mouse);
  mouse.onClick(() => {

    if (isPlaceholder) {
      //replace props with a random tile from this ring
      let randomTile;
      if (ring === 1) {
        randomTile = centerTiles[Math.floor(Math.random() * centerTiles.length)];
      } else if (ring === 2) {
        randomTile = ring1Tiles[Math.floor(Math.random() * ring1Tiles.length)];
      } else if (ring === 3) {
        randomTile = ring2Tiles[Math.floor(Math.random() * ring2Tiles.length)];
      } else {
        randomTile = ring3Tiles[Math.floor(Math.random() * ring3Tiles.length)];
      }
      edges = randomTile.edges;
      tileProps = randomTile;

      //place planets for new tile
      let planetLocations = calculatePlanetLocations(outline, points, tileProps.planets.length);

      console.log("Planet locations: ", planetLocations);

      if(!planetLocations) {
        console.log("Error: planetLocations is null");
        throw new Error("Error: planetLocations is null");
      }
      
      if( planetLocations.length != tileProps.planets.length) {
        console.log("Error: do not have location for each planet");
        throw new Error("Error: do not have location for each planet");
      }

      for (let i = 0; i < tileProps.planets.length; i++) {
        const planetProps = tileProps.planets[i];
        const planetLocation = planetLocations[i];
        let planet = useChild(() => Planet(planetLocation, planetProps));
        planets.push(planet);
      }

      isPlaceholder = false;
    } else {
      console.log("Clicked on hexagon at ", center);
      console.log("Array reference before calling rotateTile: ", edges);
      rotateTile(edges, 1);
      //remove wormholes
      for (let i = 0; i < wormholes.length; i++) {
        wormholes[i].destroy();
      }
  }
    //create new wormholes
    for (let i = 0; i < edges.length; i++) {
      const edge = edges[i];
      if (edge.hasWormhole) {
        const point1 = points[i];
        const point2 = points[(i + 1) % 6];
        let midpoint = wormholeMidpoint(center, point1, point2, i+1);
        let wormhole = useChild(() => Wormhole(midpoint));
        wormholes.push(wormhole);
      }
    }
  });

  const font = useNewComponent(() =>
    SystemFont({ name: "sans-serif", size: 12 })
  );

  const label = useNewComponent(() =>
    Label({ font })
  );

  // Draw the hexagon
  useDraw((context) => {

    context.strokeStyle = "black";
    context.lineWidth = 2;

    // Check if dotted lines are needed
    if (isPlaceholder) {
      context.setLineDash([5, 3]); // sets the line dash pattern
    }

    outline.shape.draw(context, "stroke");
    label.text = tileProps.id.toString();
    label.draw(context, {x: outline.shape.width/2, y: outline.shape.height/2 });

  });

}

export function PlaceholderTile(center: Vector, radius: number, ring: number) {
  useType(PlaceholderTile);

  // call the sector tile constructor with a placeholder tile
  let placeholderTileProps = new SectorTileProps(0, [
    new TileEdge(false),
    new TileEdge(false),
    new TileEdge(false),
    new TileEdge(false),
    new TileEdge(false),
    new TileEdge(false),
  ], [], [], null, 0, false);

  SectorTile(center, radius, placeholderTileProps, true, ring);
}

function rotateTile(edges: TileEdge[], rotation: number) {

  // Rotate the array
  for (let i = 0; i < rotation; i++) {
    let poppedElement = edges.pop();
    edges.unshift(poppedElement!);
  } 

  return edges;
}

function wormholeMidpoint(hexCenter: Vector, point1: Vector, point2: Vector, edgeIndex: number) {
  let midpoint = new Vector((point1.x + point2.x) / 2, (point1.y + point2.y) / 2);
  
  // Calculate vector from hexagon center to midpoint
  let vectorToMidpoint = midpoint.clone().subtract(hexCenter);

  // Normalize the vector
  const normalizedVector = vectorToMidpoint.normalize();

  // Scale and adjust the midpoint
  const inwardMovement = 5; // you can adjust this value
  
  let newMidpoint;
  // Special handling for edges 6, 1, and 2
  if ([6, 1, 2].includes(edgeIndex)) {
    newMidpoint = midpoint.add(normalizedVector.multiply(inwardMovement)); // Adding to move towards the center
  } else {
    newMidpoint = midpoint.subtract(normalizedVector.multiply(inwardMovement)); // Subtracting to move towards the center
  }

  return newMidpoint;
}

//write a function that takes in the center of a hexgon, all of it's points, and a number of planets that need to fit in the hexagon
// The planets should be placed in the hexagon in a way that they are equidistant from each other and from the center of the hexagon
// There will be between 0 and 7 planets in a hexagon
// The function should return an array of planet locations as vectors
// The function will take in the center of the hexagon, the 6 points that make up the hexagon, and the number of planets that need to be placed inside the hexagon
function calculatePlanetLocations(outline: {
  shape: Polygon;
  position: Vector;
  rotation: number;
  scale: Vector;
  origin: Vector;
  worldPosition(): Vector;
} & Component, points: Vector[], numPlanets: number) {

  let center = new Vector(0,0);

  console.log("Calculating planet locations for " + numPlanets + " planets");
  console.log("Center: ", outline.position);
  console.log("Points: ", points);
  let planetLocations: Vector[] = [];

  // If there are no planets, return an empty array
  if (numPlanets === 0) {
    return planetLocations;
  }

  // If there is only one planet, return the center of the hexagon
  if (numPlanets === 1) {
    const planetLocation = new Vector(0,0);
    planetLocations.push(planetLocation);
    return planetLocations;
  }

  // If there are two planets return two points that create a line with the center of the hexagon 1/3 of the way from the center to the edge
  // 0,0 is the center of the hexagon
  if (numPlanets === 2) {
    
    let point1 = new Vector(outline.shape.width/4,0);
    let point2 = new Vector(-outline.shape.width/4,0);

    planetLocations.push(point1);
    planetLocations.push(point2);

    return planetLocations;
  }

  // If there are three planets, return the points of a trinagle around the center equidistant between the center and the edge of the hexagon
  if (numPlanets === 3) {
    // the top point of the triangle is the center of the hexagon and about half way between the top of the hexagon and the center
    let point1 = new Vector(0, outline.shape.height/4);

    // the bottom left point of the triangle is about 1/3 of the way from the center to the left edge of the hexagon
    let point2 = new Vector(-outline.shape.width/6, -outline.shape.height/6);

    // the bottom right point of the triangle is about 1/3 of the way from the center to the right edge of the hexagon
    let point3 = new Vector(outline.shape.width/6, -outline.shape.height/6);

    planetLocations.push(point1);
    planetLocations.push(point2);
    planetLocations.push(point3);

    return planetLocations;
  }

  // If there are four planets, foour points of a square around the center equidistant between the center and the edge of the hexagon
  if (numPlanets === 4) {
    // the top left point of the square is about 1/3 of the way from the center to the left edge of the hexagon
    let point1 = new Vector(-outline.shape.width/6, outline.shape.height/6);

    // the top right point of the square is about 1/3 of the way from the center to the right edge of the hexagon
    let point2 = new Vector(outline.shape.width/6, outline.shape.height/6);

    // the bottom left point of the square is about 1/3 of the way from the center to the left edge of the hexagon
    let point3 = new Vector(-outline.shape.width/6, -outline.shape.height/6);

    // the bottom right point of the square is about 1/3 of the way from the center to the right edge of the hexagon
    let point4 = new Vector(outline.shape.width/6, -outline.shape.height/6);


    planetLocations.push(point1);
    planetLocations.push(point2);
    planetLocations.push(point3);
    planetLocations.push(point4);

    return planetLocations;
  }

  throw new Error("Error: calculatePlanetLocations does not support " + numPlanets + " planets");

}
