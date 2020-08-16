export const ON_ALERT_ERROR_SHOW = "errors.ON_ALERT_ERROR_SHOW";
export const ON_ALERT_ERROR_HIDE = "errors.ON_ALERT_ERROR_HIDE";

export interface IErrorsSate {
    alertError: IAlertError | null
}

export interface IAlertError {
    isShow?: boolean
    text: string
    title?: string
}

interface ShowAlertErrorAction {
    type: typeof ON_ALERT_ERROR_SHOW
    error: IAlertError
}

interface HideAlertErrorAction {
    type: typeof ON_ALERT_ERROR_HIDE
}

export type ErrorsActionTypes = ShowAlertErrorAction
    | HideAlertErrorAction