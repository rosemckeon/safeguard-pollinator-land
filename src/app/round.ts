import { Habitat } from "./habitat";
import { RoundImpact } from "./round-impact";

export interface Round {
    id: number;
    disabled?: string;
    player?: string;
    impact?: RoundImpact[];
    landscape: Habitat[];
}
