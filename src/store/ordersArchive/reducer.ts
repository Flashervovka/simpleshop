import {
    ArchiveOrdersActionTypes,
    IOrdersArchiveState,
    ON_GET_ORDERS_ARCHIVE_REQUEST,
    ON_GET_ORDERS_ARCHIVE_REQUEST_COMPLETED
} from "./types";
import {RootStateType} from "../index";
import {IOrder} from "../orders/types";

const init: IOrdersArchiveState = {
    ordersArchiveList:[],
    isLoaded:true,
    isLoading:false,
};

export function archiveOrdersListState(state: IOrdersArchiveState = init, action: ArchiveOrdersActionTypes): IOrdersArchiveState {
    switch (action.type){
        case ON_GET_ORDERS_ARCHIVE_REQUEST:
            return {
                ...state,
                isLoaded:false,
                isLoading:true
            }
        case ON_GET_ORDERS_ARCHIVE_REQUEST_COMPLETED:
            return {
                ...state,
                isLoaded:true,
                isLoading:false,
                ordersArchiveList:action.ordersArchiveList
            }
        default:
            return state
    }
}

const getArchiveOrdersListSelector = (state:RootStateType):IOrder[] => {
    return state.archiveOrdersListState.ordersArchiveList;
}
export {
    getArchiveOrdersListSelector
}