import {IUser} from "../store/user/types";

export interface HttpRequestData {
    url:string,
    init?:object | undefined
}

export interface IAuthRequestResponce<T> {
    user:IUser | null
    data:T | null
}