import {IUser, IUserState, ON_USER_LOGIN_REQUEST, ON_USER_LOGIN_REQUEST_COMPLETED, UserActionTypes} from "./types";
import {RootStateType} from "../index";

const init: IUserState = {
    user:null,
    isLoading: false,
    isLoaded: true
};

export function userState(state: IUserState = init, action: UserActionTypes): IUserState {
    switch (action.type){
        case ON_USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            }
        case ON_USER_LOGIN_REQUEST_COMPLETED:
            return {
                ...state,
                user:action.user,
                isLoading: false,
                isLoaded: true
            }
        default:
            return state;
    }
}

const getUserSelector = (state:RootStateType): IUser | null => {
    return state.userState.user;
}

const getUserIdSelector = (state:RootStateType):string => {
    return state.userState.user?.id ? state.userState.user.id : '';
}

export {
    getUserSelector,
    getUserIdSelector
}