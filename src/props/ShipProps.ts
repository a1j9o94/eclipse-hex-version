import { Constructable } from "./Constructable";
import { BlueprintProps } from "./BlueprintProps";

export class ShipProps implements Constructable {
    constructor(materialCosts: number, blueprint: BlueprintProps) {
        this.materialCosts = materialCosts;
        this.blueprint = blueprint;
    }

    materialCosts: number;
    blueprint: BlueprintProps;
}