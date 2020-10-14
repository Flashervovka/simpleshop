import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import {ErrorsActionTypes} from "../errors/types";
import {
    BasketActionTypes,
    IBasketProduct,
    ON_ADD_PRODUCT_TO_BASKET, ON_ADD_PRODUCTS_TO_BASKET,
    ON_CLEAR_BASKET,
    ON_REMOVE_PRODUCT_FROM_BASKET
} from "./types";


type TBasketAction = ThunkAction<void, RootStateType, unknown, BasketActionTypes | ErrorsActionTypes>;

export const addProductToBasketAction = (basketProduct: IBasketProduct): TBasketAction => async (dispatch, state) => {
    dispatch({type: ON_ADD_PRODUCT_TO_BASKET, basketProduct});
}
export const addProductsToBasketAction = (basketProducts: IBasketProduct[]): TBasketAction => async (dispatch, state) => {
    dispatch({type: ON_ADD_PRODUCTS_TO_BASKET, basketProducts});
}
export const removeProductFrombasketAction = (basketProduct: IBasketProduct): TBasketAction => async (dispatch, state) => {
    dispatch({type: ON_REMOVE_PRODUCT_FROM_BASKET, basketProduct});
}
export const clearBasketAction = (): TBasketAction => async (dispatch, state) => {
    dispatch({type:ON_CLEAR_BASKET});
}