import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import {IUser, ON_USER_LOGIN_REQUEST, ON_USER_LOGIN_REQUEST_COMPLETED, UserActionTypes} from "./types";
import userService from "../../services/UserService";

type TUserAction = ThunkAction<void, RootStateType, unknown, UserActionTypes>;

export const userLoginAction = (login:string, password:string, beInSystem:boolean): TUserAction => async (dispatch, state) => {
    dispatch({type:ON_USER_LOGIN_REQUEST});
    const user:IUser = await userService.login(login, password, beInSystem);
    dispatch({type:ON_USER_LOGIN_REQUEST_COMPLETED, user});
}
/*export const userLogoutAction = (): TUserAction => async (dispatch, state) => {
   /* dispatch({type:ON_USER_LOGIN_REQUEST});
    const user:IUser = await userService.login(login, password, beInSystem);
    dispatch({type:ON_USER_LOGIN_REQUEST_COMPLETED, user});
    const user:IUser = await userService.logout();
}*/