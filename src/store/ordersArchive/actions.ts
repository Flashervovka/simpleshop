import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import {ErrorsActionTypes} from "../errors/types";
import {
    ArchiveOrdersActionTypes,
    ON_GET_ORDERS_ARCHIVE_REQUEST,
    ON_GET_ORDERS_ARCHIVE_REQUEST_COMPLETED
} from "./types";
import {getUserIdSelector} from "../user/reducer";
import {IOrder} from "../orders/types";
import {IAuthRequestResponce} from "../../types/types";
import archiveOrdersService from "../../services/ArchiveService";


type TArchiveOrdersAction = ThunkAction<void, RootStateType, unknown, ArchiveOrdersActionTypes | ErrorsActionTypes>;

export const getArchiveOrdersListAction = (): TArchiveOrdersAction => async (dispatch, state) => {
    const userId:string = getUserIdSelector(state());
    dispatch({type:ON_GET_ORDERS_ARCHIVE_REQUEST});
    const response:IAuthRequestResponce<IOrder[]> = await archiveOrdersService.getArchiveOrdersList(userId);
    /** access to orders only for administrator*/
    if(response.shopUser?.id!==null && response.data){
        dispatch({type: ON_GET_ORDERS_ARCHIVE_REQUEST_COMPLETED, ordersArchiveList: response.data});
    }
}