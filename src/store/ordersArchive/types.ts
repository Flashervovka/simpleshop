import {IOrder} from "../orders/types";

export const ON_GET_ORDERS_ARCHIVE_REQUEST = "orders.ON_GET_ORDERS_ARCHIVE_REQUEST";
export const ON_GET_ORDERS_ARCHIVE_REQUEST_COMPLETED = "orders.ON_GET_ORDERS_ARCHIVE_REQUEST_COMPLETED";

export interface IOrdersArchiveState {
    ordersArchiveList: IOrder[]
    isLoading: boolean
    isLoaded: boolean
}

interface GetOrdersArchiveRequestAction {
    type: typeof ON_GET_ORDERS_ARCHIVE_REQUEST
}

interface GetOrdersArchiveRequestCompletedAction {
    type: typeof ON_GET_ORDERS_ARCHIVE_REQUEST_COMPLETED
    ordersArchiveList:IOrder[]
}

export type ArchiveOrdersActionTypes = GetOrdersArchiveRequestAction
    | GetOrdersArchiveRequestCompletedAction;