import {IProductsState, ON_GET_PRODUCTS_REQUEST, ON_GET_PRODUCTS_REQUEST_COMPLETED, ProductsActionTypes} from "./types";


const init: IProductsState = {
    productsList:[],
    isLoaded:true,
    isLoading:false
};

export function fileStorage(state: IProductsState = init, action: ProductsActionTypes): IProductsState {
    switch (action.type) {
        case ON_GET_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoaded:false,
                isLoading:true
            };
        case ON_GET_PRODUCTS_REQUEST_COMPLETED:
            return {
                ...state,
                isLoaded:true,
                isLoading:false,
                productsList:[...action.productsList]
            };
        default:
            return state;
    }
}