import {ErrorsActionTypes, IAlertError, ON_ALERT_ERROR_SHOW} from "./types";

export const showAlertAction = (error:IAlertError):ErrorsActionTypes => {
    return {
        type:ON_ALERT_ERROR_SHOW,
        error:error
    }
}