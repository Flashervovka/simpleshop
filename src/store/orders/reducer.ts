import {
    IOrder,
    IOrdersState,
    ON_GET_ORDERS_REQUEST,
    ON_GET_ORDERS_REQUEST_COMPLETED,
    ON_ORDER_CONFIRM_REQUEST,
    ON_ORDER_CONFIRM_REQUEST_COMPLETED,
    OrdersActionTypes
} from "./types";
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
        case ON_ORDER_CONFIRM_REQUEST:
            return {
                ...state,
                isLoaded: true,
                isLoading: false,
            }
        case ON_ORDER_CONFIRM_REQUEST_COMPLETED:
            return {
                ...state,
                isLoaded: false,
                isLoading: true,
                ordersList:state.ordersList.map((order) => {
                    if(order.id === action.order.id){
                        return action.order;
                    }
                    return order;
                })
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