import { Habitat } from "./habitat";

export interface Round {
    id: number;
    active: boolean;
    score: number;
    player?: string;
    landscape: [Habitat];
}
