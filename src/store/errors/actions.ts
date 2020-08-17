import {ErrorsActionTypes, IAlertError, ON_ALERT_ERROR_HIDE, ON_ALERT_ERROR_SHOW} from "./types";

export const showAlertAction = (error:IAlertError):ErrorsActionTypes => {
    return {
        type:ON_ALERT_ERROR_SHOW,
        error:error
    }
}

export const hideAlertAction = ():ErrorsActionTypes => {
    return {
        type:ON_ALERT_ERROR_HIDE
    }
}