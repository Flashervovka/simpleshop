import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import {ON_GET_PRODUCTS_REQUEST, ProductsActionTypes} from "./types";
import productService from '../../services/ProductsService';

export const getProductsListAction = (): ThunkAction<void, RootStateType, unknown, ProductsActionTypes> => async (dispatch, state) => {
    dispatch({type:ON_GET_PRODUCTS_REQUEST});
    const fileData:Object = await productService.getProductsList();
    console.log("fileData",fileData);
    //dispatch({type:ON_SEND_FILE_REQUEST_COMPLETED, uploadedFileData:fileData});
}