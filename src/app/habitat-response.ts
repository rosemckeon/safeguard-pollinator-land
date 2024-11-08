export interface HabitatResponse {
    id: number;
    type: string;
    enabled: boolean;
    globalChange?: boolean;
    localChange?: boolean;
}