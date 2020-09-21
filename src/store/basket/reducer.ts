import {
    BasketActionTypes,
    IBasketProduct,
    IBasketState,
    ON_ADD_PRODUCT_TO_BASKET,
    ON_CLEAR_BASKET,
    ON_REMOVE_PRODUCT_FROM_BASKET
} from "./types";
import {RootStateType} from "../index";


const init: IBasketState = {
    order:[],
    isLoaded:true,
    isLoading:false
};

export function basketState(state: IBasketState = init, action: BasketActionTypes): IBasketState {
    switch (action.type){
        case ON_ADD_PRODUCT_TO_BASKET:
            return {
                ...state,
                order:[...state.order, action.basketProduct]
            }
        case ON_REMOVE_PRODUCT_FROM_BASKET:
            return {
                ...state,
                order:state.order.filter((basketOrder) => basketOrder.id !== action.basketProduct.id )
            }
        case ON_CLEAR_BASKET:
            return {
                ...state,
                order:[]
            }
        default:
            return state
    }
}

const getBasketOrdersListSelector = (state:RootStateType):IBasketProduct[] => {
    return state.basketState.order;
}
export {
    getBasketOrdersListSelector
}