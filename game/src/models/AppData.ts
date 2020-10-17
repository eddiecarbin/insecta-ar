export interface AppJson {
    name: string;
    assetURL:string;
    insects: InsectData[];
}
export interface InsectData {
    id: string;
    modelURL: string;
    file:string;
    markerData: MarkerData;
}

export interface MarkerData {
    width: number;
    height: number;
    dpi: number;
    url: string;
    offsetX:number;
    offsetY:number;
}


export class GameParam {
    // default 1080p
    static screenWidth: number = 1920;
    static screenHeight: number = 1080;
    // default 1080p
    // static screenWidth: number = 640;
    // static screenHeight: number = 480;
}

export function isMobile(): boolean {
    return /Android|mobile|iPad|iPhone/i.test(navigator.userAgent);
}