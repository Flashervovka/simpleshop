export const ON_USER_LOGIN_REQUEST = "user.ON_USER_LOGIN_REQUEST";
export const ON_USER_LOGIN_REQUEST_COMPLETED = "user.ON_USER_LOGIN_REQUEST_COMPLETED";

export interface IUserState {
    user:IUser | null
    isLoading: boolean
    isLoaded: boolean
}

export interface IUser {
    name: string
    secondName: string
    login: string
    password: string
    id: string
}

interface UserLoginRequestAction {
    type: typeof ON_USER_LOGIN_REQUEST
}

interface UserLoginRequestCompletedAction {
    type: typeof ON_USER_LOGIN_REQUEST_COMPLETED,
    user:IUser
}

export type UserActionTypes = UserLoginRequestAction
    | UserLoginRequestCompletedAction