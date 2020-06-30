import { combineReducers } from 'redux';
//import { chatState } from './messages';
import {fileStorage} from './fileStorage/reducer';
import {productsListState} from './products/reducer';
import {IFileStorageState} from "./fileStorage/types";
import {IProductsState} from "./products/types";
export const rootReducer = combineReducers({
    fileStorage,
    productsListState
});
export interface IRootState {
    fileStorage:IFileStorageState
    productsListState:IProductsState
}

export type RootStateType = ReturnType<typeof rootReducer>;