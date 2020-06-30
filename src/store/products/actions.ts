import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import {
    IProduct,
    ON_ADD_NEW_PRODUCT_REQUEST, ON_ADD_NEW_PRODUCT_REQUEST_COMPLETED,
    ON_GET_PRODUCTS_REQUEST,
    ON_GET_PRODUCTS_REQUEST_COMPLETED,
    ProductsActionTypes
} from "./types";
import productService from '../../services/ProductsService';

export const getProductsListAction = (): ThunkAction<void, RootStateType, unknown, ProductsActionTypes> => async (dispatch, state) => {
    dispatch({type:ON_GET_PRODUCTS_REQUEST});
    const productsList:IProduct[] = await productService.getProductsList();
    dispatch({type:ON_GET_PRODUCTS_REQUEST_COMPLETED, productsList});
}

export const addNewProductAction = (product:IProduct): ThunkAction<void, RootStateType, unknown, ProductsActionTypes> => async (dispatch, state) => {
    dispatch({type:ON_ADD_NEW_PRODUCT_REQUEST});
    /*const newProduct:IProduct= */await productService.addNewProduct(product);
  //  dispatch({type:ON_ADD_NEW_PRODUCT_REQUEST_COMPLETED, newProduct});
}