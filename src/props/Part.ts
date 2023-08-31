

enum PartType {
    hull = "hull",
    cannon = "cannon",
    missile = "missile",
}

export interface Part {
    type: PartType;
    name: string;
}