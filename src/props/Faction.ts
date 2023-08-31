import { Blueprint } from "./Blueprint";

export class Faction {
   
    
    constructor(id: number, name: string, max_influence_disks: number, influence_costs: number[], reputation_capacity: number, ambassador_capacity: number, colony_ships: number, default_blueprints: Blueprint[], action_count: number[], starting_resources: { ResourceType: number }[], trade_ratio: number) {
        this.id = id;
        this.name = name;
        this.max_influence_disks = max_influence_disks;
        this.influence_costs = influence_costs;
        this.reputation_capacity = reputation_capacity;
        this.ambassador_capacity = ambassador_capacity;
        this.colony_ships = colony_ships;
        this.default_blueprints = default_blueprints;
        this.action_count = action_count;
        this.starting_resources = starting_resources;
        this.trade_ratio = trade_ratio;
    }

    /**
     * id int [PK]
        faction_name varchar
        max_influence_disks int
        influence_costs json
        reputation_capacity int
        ambassador_capacity int
        colony_ships int
        default_blueprints json
        action_count json
        starting_resources json
        trade_ratio int
     * 
     */

    id: number;
    name: string;
    max_influence_disks: number;
    influence_costs: number[];
    reputation_capacity: number;
    ambassador_capacity: number;
    colony_ships: number;
    default_blueprints: Blueprint[];
    action_count: number[];
    starting_resources: { ResourceType: number }[];
    trade_ratio: number;
}