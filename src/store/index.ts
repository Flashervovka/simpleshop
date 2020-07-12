import {applyMiddleware, combineReducers, createStore} from 'redux';
import {fileStorage} from './fileStorage/reducer';
import {productsListState} from './products/reducer';
import {IFileStorageState} from "./fileStorage/types";
import {IProductsState} from "./products/types";
import {createBrowserHistory} from 'history';
import {composeWithDevTools} from "redux-devtools-extension";
import {connectRouter} from "connected-react-router";
import thunk from "redux-thunk";
export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router:connectRouter(history),
    fileStorage,
    productsListState
});
export interface IRootState {
    fileStorage:IFileStorageState
    productsListState:IProductsState
}
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootStateType = ReturnType<typeof rootReducer>;