import {ADD_MESSAGE, EDIT_MESSAGE, IChatState, IMessage, LOAD_MESSAGES_LIST} from "./types";
import {MessagesActionTypes} from "./actions";


const init: IChatState = {
    messages: []
};

export function chatState(state: IChatState = init, action: MessagesActionTypes): IChatState {
    switch (action.type) {
        case LOAD_MESSAGES_LIST:
            return {
                messages:[...state.messages, ...action.messages],
            };
        case ADD_MESSAGE:
            return {
                messages:[...state.messages, action.message],
            };
        case EDIT_MESSAGE:
            const msgs:IMessage[] = state.messages.map((message) => {
                if(message.id === action.message.id){
                    return action.message;
                }
                return message;
            })
            return {
                messages:msgs
            }
        default:
            return state;
    }
}