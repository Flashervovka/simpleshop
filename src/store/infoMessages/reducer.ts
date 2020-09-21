import {IInfoMessagesState, InfoMessagesActionTypes, ON_HIDE_INFO_MESSAGE, ON_SHOW_INFO_MESSAGE} from "./types";
import {RootStateType} from "../index";

const init: IInfoMessagesState = {
    isShow:false,
    message:''
};

export function infoMessagesState(state: IInfoMessagesState = init, action: InfoMessagesActionTypes): IInfoMessagesState {
    switch (action.type){
        case ON_SHOW_INFO_MESSAGE:
            return {
                ...state,
                isShow:true,
                message:action.message
            }
        case ON_HIDE_INFO_MESSAGE:
            return {
                ...state,
                isShow:false
            }
        default:
            return state;
    }
}

const getShowInfoMessageSelector = (state:RootStateType):boolean => {
    return state.infoMessagesState.isShow;
}

const getMessageInfoMessageSelector = (state:RootStateType):string => {
    return state.infoMessagesState.message;
}

export {
    getShowInfoMessageSelector,
    getMessageInfoMessageSelector
}