import { Habitat } from "./habitat";
//import { RoundImpact } from "./round-impact";
import { Impacts } from "./impacts";

export interface Round {
    id: number;
    disabled?: string;
    player?: string;
    //impact?: RoundImpact[];
    landscape: Habitat[];
    impacts?: Impacts;
}
