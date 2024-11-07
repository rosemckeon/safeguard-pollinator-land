import { Habitat } from "./habitat";

export interface Round {
    id: number;
    disabled?: string;
    player?: string;
    impact?: {
        pollinatorBiodiversity?: number;
        widerBiodiversity?: number;
        cropProduction?: number;
        culturalValue?: number;
        ecoSystemServices?: number;
    };
    landscape: Habitat[];
}
