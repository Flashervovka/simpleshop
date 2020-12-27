export const ON_GET_SETTINGS_REQUEST = "settings.ON_GET_SETTINGS_REQUEST";
export const ON_GET_SETTINGS_REQUEST_COMPLETED = "settings.ON_GET_SETTINGS_REQUEST_COMPLETED";

export const ON_SET_SETTINGS_REQUEST = "settings.ON_SET_SETTINGS_REQUEST";
export const ON_SET_SETTINGS_REQUEST_COMPLETED = "settings.ON_SET_SETTINGS_REQUEST_COMPLETED";

export interface ISettings{
    minOrderCost: string//минимальная сумма заказа для бесплатной доставки
    orderSuccessMessage:string// текст уведомления после отправки заказа клиентом
    hasNewOrderNotification:boolean// уведомлять звуковым сигналом если есть новый(непринятый заказ) если приложение не в фокусе
    id:number
}

export interface ISettingsState {
    settings:ISettings
    isLoading: boolean
    isLoaded: boolean
}

interface GetSettingsRequestAction {
    type: typeof ON_GET_SETTINGS_REQUEST
}
interface GetSettingsRequestCompletedAction {
    type: typeof ON_GET_SETTINGS_REQUEST_COMPLETED
    settings:ISettings
}

interface SetSettingsRequestAction {
    type: typeof ON_SET_SETTINGS_REQUEST
}
interface SetSettingsRequestCompletedAction {
    type: typeof ON_SET_SETTINGS_REQUEST_COMPLETED
    settings:ISettings
}
export type SettingsActionTypes = GetSettingsRequestAction
    | GetSettingsRequestCompletedAction
    | SetSettingsRequestAction
    | SetSettingsRequestCompletedAction