import { ResourceType } from "./Resource";

export class PlanetProps {
    
    constructor(resource: ResourceType) {
        this.resource = resource;
        this.populated = false;
    }

    resource: ResourceType;
    populated: boolean;
}