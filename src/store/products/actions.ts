import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import {
    IProduct,
    ON_ADD_NEW_PRODUCT_REQUEST, ON_ADD_NEW_PRODUCT_REQUEST_COMPLETED,
    ON_GET_PRODUCTS_REQUEST,
    ON_GET_PRODUCTS_REQUEST_COMPLETED,
    ON_SELECT_PRODUCT,
    ProductsActionTypes
} from "./types";
import productService from '../../services/ProductsService';
import {
    FileStorageActionTypes,
    IFile,
    ON_SEND_FILE_REQUEST,
    ON_SEND_FILE_REQUEST_COMPLETED
} from "../fileStorage/types";
import fileStorage from "../../services/FileStorageService";
import {getLastUploadedSelector} from "../fileStorage/reducer";

export const getProductsListAction = (): ThunkAction<void, RootStateType, unknown, ProductsActionTypes> => async (dispatch, state) => {
    dispatch({type:ON_GET_PRODUCTS_REQUEST});
    const productsList:IProduct[] = await productService.getProductsList();
    dispatch({type:ON_GET_PRODUCTS_REQUEST_COMPLETED, productsList});
}

export const addNewProductAction = (product:IProduct, productImgFile:Blob): ThunkAction<void, RootStateType, unknown, ProductsActionTypes | FileStorageActionTypes> => async (dispatch, state) => {
    console.log("product",product);
    /*сохраняем картинку продукта перед тем как сохранить данные о продукте в БД*/
    dispatch({type:ON_SEND_FILE_REQUEST});
    const fileData:IFile = await fileStorage.sendFile(productImgFile);
    dispatch({type:ON_SEND_FILE_REQUEST_COMPLETED, uploadedFileData:fileData});
    dispatch({type:ON_ADD_NEW_PRODUCT_REQUEST});
    const img:IFile | null = getLastUploadedSelector(state());
    const newProduct:IProduct = await productService.addNewProduct({...product, url:img ? img.url : ''});
    dispatch({type:ON_ADD_NEW_PRODUCT_REQUEST_COMPLETED, newProduct});
}

export const selectProductAction = (product:IProduct | null):ProductsActionTypes => {
    return {
        type:ON_SELECT_PRODUCT,
        selectedProduct:product
    }
}