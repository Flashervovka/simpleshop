import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import {ErrorsActionTypes} from "../errors/types";
import {
    ISettings,
    ON_GET_SETTINGS_REQUEST,
    ON_GET_SETTINGS_REQUEST_COMPLETED,
    ON_SET_SETTINGS_REQUEST,
    SettingsActionTypes
} from "./types";
import {getUserIdSelector} from "../user/reducer";
import settingsService from "../../services/SettingsService"
import {IAuthRequestResponce} from "../../types/types";


type TSettingsAction = ThunkAction<void, RootStateType, unknown, SettingsActionTypes | ErrorsActionTypes>;

export const getSettingsAction = (): TSettingsAction => async (dispatch, state) => {
    const userId:string = getUserIdSelector(state());
    dispatch({type:ON_GET_SETTINGS_REQUEST});
    const response:IAuthRequestResponce<ISettings> = await settingsService.getSettings(userId);
    if(response.data){
        dispatch({type: ON_GET_SETTINGS_REQUEST_COMPLETED, settings:response.data});
    }
}

export const setSettingsAction = (settings:ISettings): TSettingsAction => async (dispatch, state) => {
    const userId:string = getUserIdSelector(state());
    dispatch({type:ON_SET_SETTINGS_REQUEST});
    const response:IAuthRequestResponce<ISettings> = await settingsService.setSettings(settings, userId);
    /** access to settings only for administrator*/
     if(response.shopUser?.id!==null && response.data){
       dispatch({type: ON_GET_SETTINGS_REQUEST_COMPLETED,settings:response.data});
     }
}