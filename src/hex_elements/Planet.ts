import {
    useType,
    useNewComponent,
    useDraw,
    Geometry,
    Polygon,
    Vector,
} from "@hex-engine/2d";
import { PlanetProps } from "../props/PlanetProps";
import { ResourceType } from "../props/Resource";
  
export default function Planet(PlanetLocation: Vector, planetProps: PlanetProps) {
  useType(Planet);
  console.log("Planet Props: ", planetProps);
  console.log ("Planet Location: ", PlanetLocation);

  // Create a geometry component for the hexagon
  const planet = useNewComponent(() => Geometry({
    shape: Polygon.rectangle(new Vector(7, 7)),
    position: PlanetLocation,
  }));

  // Draw the hexagon and warp portals
  useDraw((context) => {

        //switch to set the color based on the resource type
        switch (planetProps.resource) {
            case ResourceType.gold:
                context.fillStyle = "gold";
                break;
            case ResourceType.advanced_gold:
                context.fillStyle = "gold";
                break;
            case ResourceType.science:
                context.fillStyle = "pink";
                break;
            case ResourceType.advanced_science:
                context.fillStyle = "pink";
                break;
            case ResourceType.materials:
                context.fillStyle = "brown";
                break;
            case ResourceType.advanced_materials:
                context.fillStyle = "brown";
                break;
            case ResourceType.wild:
                context.fillStyle = "gray";
                break;
            case ResourceType.advanced_wild:
                context.fillStyle = "gray";
                break;
            default:
                context.fillStyle = "black";
        }

        planet.shape.draw(context, "fill");
  });

}