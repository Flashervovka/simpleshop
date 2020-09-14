import {IOrder, IOrdersState, ON_GET_ORDERS_REQUEST, ON_GET_ORDERS_REQUEST_COMPLETED, OrdersActionTypes} from "./types";
import {RootStateType} from "../index";

const init: IOrdersState = {
    ordersList:[],
    isLoaded:true,
    isLoading:false,
};

export function ordersListState(state: IOrdersState = init, action: OrdersActionTypes): IOrdersState {
    switch (action.type) {
        case ON_GET_ORDERS_REQUEST:
            return {
                ...state,
                isLoaded: false,
                isLoading: true
            }
        case ON_GET_ORDERS_REQUEST_COMPLETED:
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
                ordersList:[...action.ordersList]
            }
        default:
            return state;
    }
}

const getOrdersListSelector = (state:RootStateType):IOrder[] => {
    return state.ordersListState.ordersList;
}
export {
    getOrdersListSelector
}