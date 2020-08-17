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
import {IAuthRequestResponce} from "../../types/types";
import {showAlertAction} from "../errors/actions";
import {ErrorsActionTypes} from "../errors/types";

type TProductAction = ThunkAction<void, RootStateType, unknown, ProductsActionTypes | FileStorageActionTypes | ErrorsActionTypes>;

export const getProductsListAction = (): TProductAction => async (dispatch, state) => {
    dispatch({type:ON_GET_PRODUCTS_REQUEST});
    const productsList:IProduct[] = await productService.getProductsList();
    dispatch({type:ON_GET_PRODUCTS_REQUEST_COMPLETED, productsList});
}

export const addNewProductAction = (product:IProduct, productImgFile:Blob): TProductAction => async (dispatch, state) => {
    /*сохраняем картинку продукта перед тем как сохранить данные о продукте в БД*/
    dispatch({type:ON_SEND_FILE_REQUEST});
    const responce:IAuthRequestResponce<IFile> = await fileStorage.sendFile(productImgFile);
    if(responce.user && responce.data){
        dispatch({type:ON_SEND_FILE_REQUEST_COMPLETED, uploadedFileData:responce.data});
        dispatch({type:ON_ADD_NEW_PRODUCT_REQUEST});
        const img:IFile | null = getLastUploadedSelector(state());
        const newProduct:IAuthRequestResponce<IProduct> = await productService.addNewProduct({...product, url:img ? img.url : ''});
        if(newProduct.user && newProduct.data){
            dispatch({type:ON_ADD_NEW_PRODUCT_REQUEST_COMPLETED, newProduct:newProduct.data});
        }else{
            dispatch(showAlertAction({title:"Ошибка", text:"У текущего пользователя не прав для создания товаров."}))
        }
    }else{
        dispatch(showAlertAction({title:"Ошибка", text:"У текущего пользователя не прав для создания товаров."}))
    }
}

export const updateProductAction = (product:IProduct, productImgFile:Blob): TProductAction => async (dispatch, state) => {
    /*сохраняем картинку продукта перед тем как обновить данные о продукте в БД*/
    dispatch({type:ON_SEND_FILE_REQUEST});
    const responce:IAuthRequestResponce<IFile> = await fileStorage.sendFile(productImgFile);
    if(responce.user && responce.data){
        dispatch({type:ON_SEND_FILE_REQUEST_COMPLETED, uploadedFileData:responce.data});
        dispatch({type:ON_UPDATE_PRODUCT_REQUEST});
        const img:IFile | null = getLastUploadedSelector(state());
        const updatedProduct:IProduct = await productService.updateProduct({...product, url:img ? img.url : ''});
        dispatch({type:ON_UPDATE_PRODUCT_REQUEST_COMPLETED, updatedProduct});
    }else{
        dispatch(showAlertAction({title:"Ошибка", text:"У текущего пользователя не прав для изменения товаров."}))
    }

}

export const removeProductAction = (product:IProduct): TProductAction => async (dispatch, state) => {
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