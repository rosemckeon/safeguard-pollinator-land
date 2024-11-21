export interface HabitatResponse {
    id: number;
    name: string;
    label: string;
    labelShort: string;
    enabled: boolean;
    globalChange?: boolean;
    localChange?: boolean;
}