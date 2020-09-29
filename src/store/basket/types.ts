import {IProduct} from "../products/types";

export const ON_ADD_PRODUCT_TO_BASKET = "basket.ON_ADD_PRODUCT_TO_BASKET";
export const ON_REMOVE_PRODUCT_FROM_BASKET = "basket.ON_REMOVE_PRODUCT_FROM_BASKET";
export const ON_CLEAR_BASKET = "basket.ON_CLEAR_BASKET";


export interface IBasketProduct {
    product:IProduct
    count:number
    id:string
    status?:string
}

export interface IBasketState {
    order:IBasketProduct[]
    isLoading: boolean
    isLoaded: boolean
}

interface AddProductToBasketAction {
    type: typeof ON_ADD_PRODUCT_TO_BASKET
    basketProduct:IBasketProduct
}

interface RemoveProductFromBasketAction {
    type: typeof ON_REMOVE_PRODUCT_FROM_BASKET
    basketProduct:IBasketProduct
}

interface ClearBasketAction {
    type: typeof ON_CLEAR_BASKET
}

export type BasketActionTypes = AddProductToBasketAction
    | RemoveProductFromBasketAction
    | ClearBasketAction;

