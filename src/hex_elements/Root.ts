import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Vector,
} from "@hex-engine/2d";
import SectorTile from "./SectorTile";
import SectorGrid from "./SectorGrid";

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "white" }));
  canvas.fullscreen({ pixelZoom: 3});

  const canvasCenter = new Vector(
    canvas.element.width / 2,
    canvas.element.height / 2
  );

  useChild(() => SectorGrid(canvasCenter));

}
