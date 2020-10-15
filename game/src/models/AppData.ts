export interface AppJson {
    name: string;
    insects: InsectData[];
}
export interface InsectData {
    id: string;
    modelURL: string;
    markerData: MarkerData;
}

export interface MarkerData {
    width: number,
    height: number,
    dpi: number,
    url: string;
}


export class GameParam {
    // default 1080p
    static screenWidth: number = 1920;
    static screenHeight: number = 1080;
}

export function isMobile(): boolean {
    return /Android|mobile|iPad|iPhone/i.test(navigator.userAgent);
}