import {InfoMessagesActionTypes, ON_HIDE_INFO_MESSAGE, ON_SHOW_INFO_MESSAGE} from "./types";
import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";

type TInfoMessagesAction = ThunkAction<void, RootStateType, unknown, InfoMessagesActionTypes>;

export const showInfoMessageAction = (message:string): TInfoMessagesAction => async (dispatch, state) => {
   dispatch({type:ON_SHOW_INFO_MESSAGE, message:message});
}
export const hideInfoMessageAction = (): TInfoMessagesAction => async (dispatch, state) => {
    dispatch({type:ON_HIDE_INFO_MESSAGE});
}