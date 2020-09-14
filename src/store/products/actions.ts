import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import {
    IProduct,
    ON_ADD_NEW_PRODUCT_REQUEST,
    ON_ADD_NEW_PRODUCT_REQUEST_COMPLETED,
    ON_GET_PRODUCTS_REQUEST,
    ON_GET_PRODUCTS_REQUEST_COMPLETED,
    ON_REMOVE_PRODUCT_REQUEST,
    ON_REMOVE_PRODUCT_REQUEST_COMPLETED,
    ON_SELECT_PRODUCT,
    ON_UPDATE_PRODUCT_REQUEST,
    ON_UPDATE_PRODUCT_REQUEST_COMPLETED,
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
import {getUserIdSelector} from "../user/reducer";

type TProductAction = ThunkAction<void, RootStateType, unknown, ProductsActionTypes | FileStorageActionTypes | ErrorsActionTypes>;

export const getProductsListAction = (): TProductAction => async (dispatch, state) => {
    dispatch({type:ON_GET_PRODUCTS_REQUEST});
    const productsList:IProduct[] = await productService.getProductsList();
    dispatch({type:ON_GET_PRODUCTS_REQUEST_COMPLETED, productsList});
}

export const addNewProductAction = (product:IProduct, productImgFile:Blob): TProductAction => async (dispatch, state) => {
    /*сохраняем картинку продукта перед тем как сохранить данные о продукте в БД*/
    dispatch({type:ON_SEND_FILE_REQUEST});
    const userId:string = getUserIdSelector(state());
    const responce:IAuthRequestResponce<IFile> = await fileStorage.sendFile(productImgFile, userId);
    if(responce.shopUser && responce.data){
        dispatch({type:ON_SEND_FILE_REQUEST_COMPLETED, uploadedFileData:responce.data});
        dispatch({type:ON_ADD_NEW_PRODUCT_REQUEST});
        const img:IFile | null = getLastUploadedSelector(state());
        const newProduct:IAuthRequestResponce<IProduct> = await productService.addNewProduct({...product, url:img ? img.url : ''}, userId);
        if(newProduct.shopUser && newProduct.data){
            dispatch({type:ON_ADD_NEW_PRODUCT_REQUEST_COMPLETED, newProduct:newProduct.data});
        }else{
            dispatch(showAlertAction({title:"Ошибка", text:"У текущего пользователя не прав для создания товаров."}))
        }
    }else{
        dispatch(showAlertAction({title:"Ошибка", text:"У текущего пользователя не прав для создания товаров."}))
    }
}

export const updateProductAction = (product:IProduct, productImgFile:Blob): TProductAction => async (dispatch, state) => {

    const userId:string = getUserIdSelector(state());
    /** если обновляется картинка продукта*/
    if(productImgFile){
        /*сохраняем картинку продукта перед тем как обновить данные о продукте в БД*/
        dispatch({type:ON_SEND_FILE_REQUEST});
        const responce:IAuthRequestResponce<IFile> = await fileStorage.sendFile(productImgFile, userId);
        if(responce.shopUser && responce.data){
            dispatch({type:ON_SEND_FILE_REQUEST_COMPLETED, uploadedFileData:responce.data});
        }else{
            dispatch(showAlertAction({title:"Ошибка", text:"У текущего пользователя не прав для изменения товаров."}))
        }
    }

    dispatch({type:ON_UPDATE_PRODUCT_REQUEST});
    const img:IFile | null = getLastUploadedSelector(state());
    const updatedProduct:IAuthRequestResponce<IProduct> = await productService.updateProduct({...product, url:img ? img.url : product.url}, userId);
    if(updatedProduct.shopUser && updatedProduct.data){
        dispatch({type:ON_UPDATE_PRODUCT_REQUEST_COMPLETED, updatedProduct:updatedProduct.data});
    }else{
        dispatch(showAlertAction({title:"Ошибка", text:"У текущего пользователя не прав для изменения товаров."}))
    }



}

export const removeProductAction = (product:IProduct): TProductAction => async (dispatch, state) => {
    /*сохраняем картинку продукта перед тем как обновить данные о продукте в БД*/
    dispatch({type:ON_REMOVE_PRODUCT_REQUEST});
    const userId:string = getUserIdSelector(state());
    const removed:IAuthRequestResponce<string> = await productService.removeProduct(product, userId);
    if(removed.shopUser && removed.data){
        dispatch({type:ON_REMOVE_PRODUCT_REQUEST_COMPLETED, removed:removed.data});
    }else{
        dispatch(showAlertAction({title:"Ошибка", text:"У текущего пользователя не прав для удаления товаров."}))
    }
}
/*
export const orderProductAction = (product:IProduct, count:string): TProductAction => async (dispatch, state) => {
    dispatch({type:ON_ORDER_PRODUCT_REQUEST});
    //const ordered:IAuthRequestResponce<IProduct> = await ordersService.orderProduct(product);
    await ordersService.orderProduct(product, count);
    dispatch({type:ON_ORDER_PRODUCT_REQUEST_COMPLETED});
}*/


export const selectProductAction = (product:IProduct | null):ProductsActionTypes => {
    return {
        type:ON_SELECT_PRODUCT,
        selectedProduct:product
    }
}