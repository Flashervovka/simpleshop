import {IProduct} from "../products/types";
import {IBasketProduct} from "../basket/types";

export const ON_GET_ORDERS_REQUEST = "orders.ON_GET_ORDERS_REQUEST";
export const ON_GET_ORDERS_REQUEST_COMPLETED = "orders.ON_GET_ORDERS_REQUEST_COMPLETED";

export const ON_ORDER_PRODUCT_REQUEST = "orders.ON_ORDER_PRODUCT_REQUEST";
export const ON_ORDER_PRODUCT_REQUEST_COMPLETED = "orders.ON_ORDER_PRODUCT_REQUEST_COMPLETED";

export interface IOrder {
    id?: string
    /*productId:string
    count:number*/
    orderPositions:IBasketProduct[]
    status:string
    adress:string
    phone:string
}

export interface IFilledOrder {
    id: string
    status:string
    productData:IProduct
}

export interface IOrdersState {
    ordersList: IOrder[]
    isLoading: boolean
    isLoaded: boolean
}

interface OrderProductRequestAction {
    type: typeof ON_ORDER_PRODUCT_REQUEST
}

interface OrderProductRequestCompletedAction {
    type: typeof ON_ORDER_PRODUCT_REQUEST_COMPLETED
}

interface GetOrdersRequestAction {
    type: typeof ON_GET_ORDERS_REQUEST
}

interface GetOrdersRequestCompletedAction {
    type: typeof ON_GET_ORDERS_REQUEST_COMPLETED
    ordersList: IOrder[]
}

export type OrdersActionTypes = GetOrdersRequestAction
    | GetOrdersRequestCompletedAction
    | OrderProductRequestAction
    | OrderProductRequestCompletedAction;