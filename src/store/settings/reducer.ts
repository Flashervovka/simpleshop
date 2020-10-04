import {
    ISettings,
    ISettingsState,
    ON_GET_SETTINGS_REQUEST,
    ON_GET_SETTINGS_REQUEST_COMPLETED,
    ON_SET_SETTINGS_REQUEST,
    ON_SET_SETTINGS_REQUEST_COMPLETED,
    SettingsActionTypes
} from "./types";
import {RootStateType} from "../index";

const init: ISettingsState = {
    settings:{
        minOrderCost:'',
        id:0
    },
    isLoaded:true,
    isLoading:false,
};

export function settingsState(state: ISettingsState = init, action: SettingsActionTypes): ISettingsState {
    switch (action.type){
        case ON_GET_SETTINGS_REQUEST:
            return {
                ...state,
                isLoaded:false,
                isLoading:true
            }
        case ON_GET_SETTINGS_REQUEST_COMPLETED:
            return {
                ...state,
                isLoaded:true,
                isLoading:false,
                settings:{
                    ...action.settings
                }
            }
        case ON_SET_SETTINGS_REQUEST:
            return {
                ...state,
                isLoaded:false,
                isLoading:true
            }
        case ON_SET_SETTINGS_REQUEST_COMPLETED:
            return {
                ...state,
                isLoaded:true,
                isLoading:false,
                settings:{
                    ...action.settings
                }
            }
        default:
            return state
    }
}

const getSettingsSelector = (state:RootStateType):ISettings => {
    return state.settingsState.settings;
}
export {
    getSettingsSelector
}