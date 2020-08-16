import {ErrorsActionTypes, IErrorsSate, ON_ALERT_ERROR_HIDE, ON_ALERT_ERROR_SHOW} from "./types";

const init:IErrorsSate = {
    alertError:null
}

export function errorsState(state: IErrorsSate = init, action: ErrorsActionTypes): IErrorsSate {
    switch (action.type){
        case ON_ALERT_ERROR_SHOW:
            return {
                ...state,
                alertError:{
                    ...action.error,
                    isShow:true
                }
            }
        case ON_ALERT_ERROR_HIDE:
            return {
                ...state,
                alertError:{
                    text:'',
                    title:'',
                    isShow:false
                }
            }
        default:
            return state;
    }
}