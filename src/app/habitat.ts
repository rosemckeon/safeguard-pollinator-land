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
    state?: {
        floralResources?: number;
        habitatBiodiversity?: number;
    };
    pollinators?: {
        N?: number;
        health?: number;
    }
}