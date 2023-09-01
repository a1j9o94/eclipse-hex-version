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
import { DiscoveryTileProps } from "../props/DiscoveryTileProps";


export default function DiscoveryTile(location: Vector, size: number, discoveryTileProps: DiscoveryTileProps) {
    useType(DiscoveryTile);
    console.log("Discovery Tile Props: ", discoveryTileProps);
    console.log("Discovery Tile Location: ", location);

    // Create an array of points that represent an equalateral triangle with a side length of size
    const points = Array.from({ length: 3 }, (_, i) => {
        const angle = (Math.PI / 3) * i + Math.PI / 6;
        return new Vector(Math.cos(angle), Math.sin(angle)).multiply(size);
    });



    const discoveryTile = useNewComponent(() => Geometry({
        shape: new Polygon(points),
        position: location,
    }));

    const mouse = useNewComponent(Mouse);
    mouse.onClick(() => {
        //if it's not collectable, do nothing and return
        if (!discoveryTileProps.collectable) {
            return;
        }
        
        //if this is in a sector and collectable, give the player the choice of points or benefit if the player chooses to collect, move it to the player's discovery tile array
        if (discoveryTileProps.collectable) {
            alert("You have discovered a new technology! {discoveryTileProps.benefit} or {discoveryTileProps.points} points?");
        }
            

    });