export interface Habitat {
    id: number;
    type: string;
    globalChangeTypeTo: string;
    localChangeTypeTo: string;
    classes: string;
    nesting: number;
    floralResources: number;
    actionsActive: boolean;
    pollinators: number;
    pollinatorHealth: number;
    carryingCapacity: number;
    x: number;
    y: number;
}
