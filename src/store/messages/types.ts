export const LOAD_MESSAGES_LIST = "messages.LOAD_MESSAGES_LIST";
export const ADD_MESSAGE = "messages.ADD_MESSAGE";
export const EDIT_MESSAGE = "messages.EDIT_MESSAGE";
export const DELETE_MESSAGE = "messages.DELETE_MESSAGE";

export interface IMessage {
    id?: string
    name: string
    price?:string
    description?:string
}

export interface IChatState {
    messages: IMessage[]
}