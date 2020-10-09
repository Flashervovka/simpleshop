import {applyMiddleware, combineReducers, createStore} from 'redux';
import {fileStorage} from './fileStorage/reducer';
import {productsListState} from './products/reducer';
import {categoriesState} from './categories/reducer';
import {userState} from './user/reducer';
import {errorsState} from './errors/reducer';
import {ordersListState} from './orders/reducer';
import {basketState} from './basket/reducer';
import {infoMessagesState} from './infoMessages/reducer';
import {settingsState} from './settings/reducer';
import {archiveOrdersListState} from './ordersArchive/reducer';
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
import {IBasketState} from "./basket/types";
import {IInfoMessagesState} from "./infoMessages/types";
import {ISettingsState} from "./settings/types";
import {IOrdersArchiveState} from "./ordersArchive/types";
export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router:connectRouter(history),
    fileStorage,
    productsListState,
    categoriesState,
    userState,
    errorsState,
    ordersListState,
    basketState,
    infoMessagesState,
    settingsState,
    archiveOrdersListState
});
export interface IRootState {
    fileStorage:IFileStorageState
    productsListState:IProductsState
    categoriesState:ICategoriesState
    userState:IUserState
    errorsState:IErrorsSate
    ordersListState:IOrdersState
    basketState:IBasketState,
    infoMessagesState:IInfoMessagesState,
    settingsState:ISettingsState,
    archiveOrdersListState:IOrdersArchiveState
}
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootStateType = ReturnType<typeof rootReducer>;