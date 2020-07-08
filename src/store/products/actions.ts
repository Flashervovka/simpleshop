import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import {
    IProduct,
    ON_ADD_NEW_PRODUCT_REQUEST, ON_ADD_NEW_PRODUCT_REQUEST_COMPLETED,
    ON_GET_PRODUCTS_REQUEST,
    ON_GET_PRODUCTS_REQUEST_COMPLETED, ON_REMOVE_PRODUCT_REQUEST, ON_REMOVE_PRODUCT_REQUEST_COMPLETED,
    ON_SELECT_PRODUCT, ON_UPDATE_PRODUCT_REQUEST, ON_UPDATE_PRODUCT_REQUEST_COMPLETED,
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
    /*сохраняем картинку продукта перед тем как сохранить данные о продукте в БД*/
    dispatch({type:ON_SEND_FILE_REQUEST});
    const fileData:IFile = await fileStorage.sendFile(productImgFile);
    dispatch({type:ON_SEND_FILE_REQUEST_COMPLETED, uploadedFileData:fileData});
    dispatch({type:ON_ADD_NEW_PRODUCT_REQUEST});
    const img:IFile | null = getLastUploadedSelector(state());
    const newProduct:IProduct = await productService.addNewProduct({...product, url:img ? img.url : ''});
    dispatch({type:ON_ADD_NEW_PRODUCT_REQUEST_COMPLETED, newProduct});
}

export const updateProductAction = (product:IProduct, productImgFile:Blob): ThunkAction<void, RootStateType, unknown, ProductsActionTypes | FileStorageActionTypes> => async (dispatch, state) => {
    /*сохраняем картинку продукта перед тем как обновить данные о продукте в БД*/
    dispatch({type:ON_SEND_FILE_REQUEST});
    const fileData:IFile = await fileStorage.sendFile(productImgFile);
    dispatch({type:ON_SEND_FILE_REQUEST_COMPLETED, uploadedFileData:fileData});
    dispatch({type:ON_UPDATE_PRODUCT_REQUEST});
    const img:IFile | null = getLastUploadedSelector(state());
    const updatedProduct:IProduct = await productService.updateProduct({...product, url:img ? img.url : ''});
    dispatch({type:ON_UPDATE_PRODUCT_REQUEST_COMPLETED, updatedProduct});
}

export const removeProductAction = (product:IProduct): ThunkAction<void, RootStateType, unknown, ProductsActionTypes> => async (dispatch, state) => {
    /*сохраняем картинку продукта перед тем как обновить данные о продукте в БД*/
    dispatch({type:ON_REMOVE_PRODUCT_REQUEST});
    const removed:string = await productService.removeProduct(product);
    dispatch({type:ON_REMOVE_PRODUCT_REQUEST_COMPLETED, removed});
}


export const selectProductAction = (product:IProduct | null):ProductsActionTypes => {
    return {
        type:ON_SELECT_PRODUCT,
        selectedProduct:product
    }
}