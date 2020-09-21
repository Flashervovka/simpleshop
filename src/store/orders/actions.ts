import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import {
    IOrder,
    ON_GET_ORDERS_REQUEST,
    ON_GET_ORDERS_REQUEST_COMPLETED,
    ON_ORDER_PRODUCT_REQUEST_COMPLETED,
    OrdersActionTypes
} from "./types";
import {IProduct} from "../products/types";
import ordersService from "../../services/OrdersService";
import {getUserIdSelector} from "../user/reducer";
import {IAuthRequestResponce} from "../../types/types";
import {IBasketProduct} from "../basket/types";
import {showInfoMessageAction} from "../infoMessages/actions";
import {clearBasketAction} from "../basket/actions";

type TOrdersAction = ThunkAction<void, RootStateType, unknown, OrdersActionTypes>;

export const getOrdersListAction = (): TOrdersAction => async (dispatch, state) => {
    const userId:string = getUserIdSelector(state());
    dispatch({type:ON_GET_ORDERS_REQUEST});
    const response:IAuthRequestResponce<IOrder[]> = await ordersService.getOrdersList(userId);
    /** access to orders only for administrator*/
    if(response.shopUser?.id!==null && response.data){
        dispatch({type:ON_GET_ORDERS_REQUEST_COMPLETED, ordersList:response.data});
    }
}

export const makeOrderAction = (order:IBasketProduct[],adress:string, phone:string): TOrdersAction => async (dispatch, state) => {
    dispatch({type:ON_GET_ORDERS_REQUEST});
    const result:IAuthRequestResponce<IOrder> = await ordersService.orderProduct(order, adress, phone);
    dispatch({type:ON_ORDER_PRODUCT_REQUEST_COMPLETED});
    if(result.data){
        dispatch(showInfoMessageAction('Заказ успешно отправлен!'));
        dispatch(clearBasketAction());
    }else {
        dispatch(showInfoMessageAction('Произошла ошибка отправки заказа! Попробуйте сдеать заказ еще раз.'))
    }
}

export const orderProductAction = (product:IProduct, count:string, adress:string, phone:string): TOrdersAction => async (dispatch, state) => {
   /* dispatch({type:ON_GET_ORDERS_REQUEST});
    await ordersService.orderProduct(product, count, adress, phone);
    dispatch({type:ON_ORDER_PRODUCT_REQUEST_COMPLETED});*/
}