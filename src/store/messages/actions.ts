import {ADD_MESSAGE, EDIT_MESSAGE, IMessage, LOAD_MESSAGES_LIST} from "./types";
import {ThunkAction} from 'redux-thunk'
import {RootStateType} from "../index";
import {http} from "../../helpers";

import fileStorage from '../../services/FileStorageService';



export interface LoadMessagesAction {
    type: typeof LOAD_MESSAGES_LIST
    messages: IMessage[],
}
export const getMessages = (messages: IMessage[]): LoadMessagesAction => {
    return {
        type: LOAD_MESSAGES_LIST,
        messages: messages
    }
}
export interface AddMessagesAction {
    message: IMessage,
    type: typeof ADD_MESSAGE
}
export const addMessage = (message: IMessage): AddMessagesAction => {
    return {
        type: ADD_MESSAGE,
        message: message
    }
}

export interface EditMessagesAction {
    message: IMessage,
    type: typeof EDIT_MESSAGE
}

export const editMessage = (message: IMessage): EditMessagesAction => {
    return {
        type: EDIT_MESSAGE,
        message: message
    }
}


export type MessagesActionTypes = LoadMessagesAction | AddMessagesAction | EditMessagesAction;


export const loadMessagesAction = (): ThunkAction<void, RootStateType, unknown, MessagesActionTypes> => async (dispatch, state) => {
    const msgs = await http({url: "http://localhost:8080/product"});
    dispatch(getMessages(msgs));
}

export const addMessageAction = (file: Blob): ThunkAction<void, RootStateType, unknown, MessagesActionTypes> => async (dispatch, state) => {
    const fs:Object = await fileStorage.sendFile(file);
    console.log(fs);
    /*const msgs = await http({
        url: "http://localhost:8080/product",
        init: {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: message, price:100, description:"Описание товара"})
        }
    });*/
    //dispatch(addMessage(msgs));
}

export const editMessageAction = (message: IMessage): ThunkAction<void, RootStateType, unknown, MessagesActionTypes> => async (dispatch, state) => {
    /*const msgs = await http({
        url: `http://localhost:8080/product/${message.id}`,
        init: {
            method: "PUT",
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text:message.text})
        }
    });
    dispatch(editMessage(msgs));*/
}



