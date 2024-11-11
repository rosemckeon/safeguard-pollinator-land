export interface HabitatResponse {
    id: number;
    name: string;
    label: string;
    enabled: boolean;
    globalChange?: boolean;
    localChange?: boolean;
}