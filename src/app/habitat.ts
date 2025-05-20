import { HabitatResponse } from "./habitat-response";

export interface Habitat {
    id: number;
    x: number;
    y: number;
    K: number;
    type: {
        active: string;
        globalChange?: string;
        localChange?: string;
    }
    response?: HabitatResponse[];
    pressure?: {
        pollinatorManagement?: number;
        landscapeSimplification?: number;
    };
    //stateValue?: number;
    state?: {
        habitatResources?: number;
        pestsAndWeeds?: number;
        wildPollinators?: number;
    };
    pollinators?: {
        N?: number;
        health?: number;
    }
}