export interface AppData {
    name: string;
    insects: InsectData[];
}
export interface InsectData {
    id: string;
    modelURL:string;
    markerData: MarkerData;
}

export interface MarkerData {
    url:string;
}