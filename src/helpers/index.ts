import {HttpRequestData} from "../types/types";
import CyrillicToTranslit from "cyrillic-to-translit-js";

export const cyrToLat = new CyrillicToTranslit();

export async function http(
    request: HttpRequestData
): Promise<any> {
    const response = await fetch(request.url, request.init);
    const body = await response.json();
    return body;
}

