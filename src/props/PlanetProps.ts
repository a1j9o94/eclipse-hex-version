import { ResourceType } from "./ResourceProps";

export class PlanetProps {
    
    constructor(resource: ResourceType) {
        this.resource = resource;
        this.populated = false;
    }

    resource: ResourceType;
    populated: boolean;
}