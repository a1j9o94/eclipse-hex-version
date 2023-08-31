import {
  useType,
  useChild,
  Vector,
} from "@hex-engine/2d";
import { PlaceholderTile } from "./SectorTile";
import { sin60 } from "../utility/HexMath";

export default function SectorGrid(center: Vector) {
  useType(SectorGrid);

  const hexRadius = 40;

  // Loop through each ring
  for (let ring = 1; ring <= 4 ; ring++) {
    // Get the hexagonal coordinates for each hexagon in this ring
    const hex_coords = get_hex_coordinates(ring);
    console.log(hex_coords);


    // Loop through each hexagon in this ring
    for (let i = 0; i < hex_coords.length; i++) {
      // Get the hexagonal coordinates for this hexagon
      const [x_hex, y_hex, z_hex] = hex_coords[i];

      // Calculate the Cartesian coordinates for this hexagon
      const [x_cartesian, y_cartesian] = hex_to_cartesian(hex_coords[i], hexRadius);

      // Calculate the center of this hexagon
      const tile_center = new Vector(x_cartesian + center.x, y_cartesian + center.y);

      let tile = useChild(() => PlaceholderTile(tile_center, hexRadius, ring));
    }
    
  }
}

function get_hex_coordinates(ring) {
  // Initialize an array to hold the coordinates of the hexagons
  let hex_coords: [number[]] = [];

  // If it's the first ring, it's just the center hexagon
  if (ring === 1) {
    return [[0, 0, 0]];
  }

  // Initialize hexagonal coordinates for the first hexagon in this ring
  let x_hex = ring - 1;
  let y_hex = -ring + 1;
  let z_hex = 0;

  // Iterate through each of the 6 edges
  for (let edge = 0; edge < 6; edge++) {
    // Traverse each edge
    for (let i = 0; i < ring - 1; i++) {
      // Append the current coordinates to the hex_coords array
      hex_coords.push([x_hex, y_hex, z_hex]);

      // Move to the next hexagon along this edge
      if (edge === 0) { y_hex++; z_hex--; }
      else if (edge === 1) { x_hex--; y_hex++; }
      else if (edge === 2) { x_hex--; z_hex++; }
      else if (edge === 3) { y_hex--; z_hex++; }
      else if (edge === 4) { x_hex++; y_hex--; }
      else if (edge === 5) { x_hex++; z_hex--; }
    }
  }

  return hex_coords;
}

function hex_to_cartesian(hex_coords, hexRadius) {
  // Destructure the hex coordinates
  const [x_hex, y_hex, z_hex] = hex_coords;

  // Calculate horizontal Cartesian coordinate
  const x_cartesian = x_hex * hexRadius * 1.6;

  // Calculate vertical Cartesian coordinate
  // Adjusted the multiplier from 2 * (Math.sqrt(3) / 3) to 1.5
  const y_cartesian = .85 * hexRadius * (y_hex - z_hex);

  // Return the Cartesian coordinates
  return [x_cartesian, y_cartesian];
}