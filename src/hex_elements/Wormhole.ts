import {
    useType,
    useNewComponent,
    useDraw,
    Geometry,
    Polygon,
    Vector,
} from "@hex-engine/2d";
  
export default function Wormhole(wormholeLocation: Vector) {
  useType(Wormhole);

  // Create a geometry component for the hexagon
  const wormhole = useNewComponent(() => Geometry({
    shape: Polygon.rectangle(new Vector(5, 5)),
    position: wormholeLocation,
  }));

  // Draw the hexagon and warp portals
  useDraw((context) => { 
        context.fillStyle = "red";
        wormhole.shape.draw(context, "fill");
  });

}