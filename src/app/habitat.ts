/*export type ResponseKey = 
 | 'restoration'
 | 'IPM'
 | 'farmingSystem';
*/
//type Responses = Record<ResponseKey, ResponseDetails>

export interface Response {
    id: number;
    type: string;
    enabled: boolean;
    globalChange?: boolean;
    localChange?: boolean;
}

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
    response?: Response[];
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