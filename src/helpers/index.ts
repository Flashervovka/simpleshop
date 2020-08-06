import {HttpRequestData} from "../types/types";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import imageCompression from 'browser-image-compression';

export const cyrToLat = new CyrillicToTranslit();

export async function http(
    request: HttpRequestData
): Promise<any> {
    const response = await fetch(request.url, request.init);
    const body = await response.json();
    return body;
}


export async function compressImage(imageFile:File, callBack:Function):Promise<void>{

    const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1000
    }
    try {

        const compressedFile = await imageCompression(imageFile, options);

        callBack(new File([compressedFile], imageFile.name))
    } catch (error) {
        console.log(error);
    }
}
