import {HttpRequestData} from "../types/types";

export async function http(
    request: HttpRequestData
): Promise<any> {
    const response = await fetch(request.url, request.init);
    const body = await response.json();
    return body;
}