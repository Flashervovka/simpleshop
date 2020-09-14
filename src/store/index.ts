import {applyMiddleware, combineReducers, createStore} from 'redux';
import {fileStorage} from './fileStorage/reducer';
import {productsListState} from './products/reducer';
import {categoriesState} from './categories/reducer';
import {userState} from './user/reducer';
import {errorsState} from './errors/reducer';
import {ordersListState} from './orders/reducer';
import {IFileStorageState} from "./fileStorage/types";
import {IProductsState} from "./products/types";
import {createBrowserHistory} from 'history';
import {composeWithDevTools} from "redux-devtools-extension";
import {connectRouter} from "connected-react-router";
import thunk from "redux-thunk";
import {ICategoriesState} from "./categories/types";
import {IUserState} from "./user/types";
import {IErrorsSate} from "./errors/types";
import {IOrdersState} from "./orders/types";
export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router:connectRouter(history),
    fileStorage,
    productsListState,
    categoriesState,
    userState,
    errorsState,
    ordersListState
});
export interface IRootState {
    fileStorage:IFileStorageState
    productsListState:IProductsState
    categoriesState:ICategoriesState
    userState:IUserState
    errorsState:IErrorsSate
    ordersListState:IOrdersState
}
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootStateType = ReturnType<typeof rootReducer>;