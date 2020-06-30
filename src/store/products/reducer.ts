import {
    IProductsState,
    ON_GET_PRODUCTS_REQUEST,
    ON_GET_PRODUCTS_REQUEST_COMPLETED,
    ON_SELECT_PRODUCT,
    ProductsActionTypes
} from "./types";
import {RootStateType} from "../index";


const init: IProductsState = {
    productsList:[],
    isLoaded:true,
    isLoading:false,
    selectedProduct:null
};

export function productsListState(state: IProductsState = init, action: ProductsActionTypes): IProductsState {
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
        case ON_SELECT_PRODUCT:
            return {
                ...state,
                selectedProduct:action.selectedProduct
            };
        default:
            return state;
    }
}

const getProductListSelector = (state:RootStateType) => {
    return state.productsListState.productsList
}

export {
    getProductListSelector
}