export interface Habitat {
    id: number;
    type: string;
    globalChangeTypeTo: string;
    localChangeTypeTo: string;
    score: number;
    nesting: number;
    floralResources: number;
    actionsActive: boolean;
    pollinators: number;
    pollinatorHealth: number;
    carryingCapacity: number;
    x: number;
    y: number;
}