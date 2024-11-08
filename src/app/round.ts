import { Habitat } from "./habitat";

export interface Round {
    id: number;
    disabled?: string;
    player?: string;
    impact?: {
        cropPollinationProduction?: number;
        economicValueChain?: number;
        wildPlantPollination?: number;
        aestheticValue?: number;
    };
    landscape: Habitat[];
}
