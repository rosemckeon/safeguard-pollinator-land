import { Habitat } from "./habitat";

export interface Round {
    id: number;
    disabled?: string;
    score: number;
    player?: string;
    landscape: Habitat[];
    activeHabitatTypes?: {
        "Semi-natural": number;
        "Agricultural": number;
        "Urban": number;
    };
}
