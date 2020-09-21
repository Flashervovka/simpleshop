export const ON_SHOW_INFO_MESSAGE = "infoMessages.ON_SHOW_INFO_MESSAGE";
export const ON_HIDE_INFO_MESSAGE = "infoMessages.ON_HIDE_INFO_MESSAGE";

export interface IInfoMessagesState {
    message:string
    isShow:boolean
}

interface ShowInfoMessagesAction {
    type: typeof ON_SHOW_INFO_MESSAGE
    message:string
}
interface HideInfoMessagesAction {
    type: typeof ON_HIDE_INFO_MESSAGE
}

export type InfoMessagesActionTypes = ShowInfoMessagesAction | HideInfoMessagesAction
