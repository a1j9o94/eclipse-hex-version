import {
    useType,
    useNewComponent,
    useDraw,
    Geometry,
    Polygon,
    Vector,
    Label,
    SystemFont,
    Mouse,
} from "@hex-engine/2d";
import { PlanetProps } from "../props/PlanetProps";
import { ResourceType } from "../props/ResourceProps";
  
export default function Planet(PlanetLocation: Vector, planetProps: PlanetProps) {
  useType(Planet);
  console.log("Planet Props: ", planetProps);
  console.log ("Planet Location: ", PlanetLocation);

  // Create a geometry component for the hexagon
  const planet = useNewComponent(() => Geometry({
    shape: Polygon.rectangle(new Vector(7, 7)),
    position: PlanetLocation,
  }));

    const mouse = useNewComponent(Mouse);
    mouse.onClick(() => {
        //set the planet to populated or vice versa
        planetProps.populated = !planetProps.populated;
    });


  const font = useNewComponent(() =>
    SystemFont({ name: "sans-serif", size: 8 })
  );

  const label = useNewComponent(() =>
    Label({ font })
  );

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

        // write a white x if the planet is "populated"
        if (planetProps.populated) {
            label.text = "X";
            label.draw(context, {x: 0, y: 0});
        }
  });

}