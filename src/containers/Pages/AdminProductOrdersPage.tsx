import React, {useEffect, Fragment, useState} from "react";
import {connect} from "react-redux";
import {RootStateType} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {IOrder, OrdersActionTypes} from "../../store/orders/types";
import {changeAdminOrderStatusAction, getOrdersListAction} from "../../store/orders/actions";
import {getOrdersListSelector} from "../../store/orders/reducer";
import './styles.css';
import {getProductListSelector} from "../../store/products/reducer";
import OrdersList from "../../components/OrdersList";
import {
    ORDER_STATUS_CLOSE,
    ORDER_STATUS_CONFIRM,
    ORDER_STATUS_NEW,
    ORDER_STATUS_REJECT,
    STATUS_ADMIN_VIEW
} from "../../config";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {getClientOrderTotalPrice, hasOrdersWithNewStatus} from "../../helpers/dataHelper";
import moment from 'moment';
import {getSettingsSelector} from "../../store/settings/reducer";
//import {getArchiveOrdersListAction} from "../../store/ordersArchive/actions";

const mapStateToProps = (state: RootStateType) => ({
    ordersList: getOrdersListSelector(state),
    productsList: getProductListSelector(state),
    settings: getSettingsSelector(state)
})

const notificationSnd = new Audio(require("../../static/media/ntf.mp3"));
const dummySnd = new Audio(require("../../static/media/ntf.mp3"));
dummySnd.volume = 0.0001;
const notificationNewOrderSnd = new Audio(require("../../static/media/hasneworder.mp3"));

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, OrdersActionTypes>) => {
    return {
        onGetOrdersList: (mobileToken?:string): void => {
           // dispatch(getOrdersListAction(mobileToken));
            dispatch(getOrdersListAction("aad88778-125b-493b-aabb-75a5973cfd01"));
          //  dispatch(getArchiveOrdersListAction());
        },
        onChangeAdminOrderStatus: (order: IOrder, status: string): void => {
            dispatch(changeAdminOrderStatusAction(order, status));

        }
    }
}

type AdminTypeOrdersPageProps = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const AdminProductOrdersPage: React.FC<AdminTypeOrdersPageProps> = (props: AdminTypeOrdersPageProps) => {
    const {onGetOrdersList, ordersList, onChangeAdminOrderStatus, settings} = props;

    const [prevOrdersCount, setPrevOrdersCount] = useState<number>(ordersList.length);

    useEffect(() => {
        onGetOrdersList();
        if(window.isMobileApplication){
            window.onGetOrders = onGetOrdersList;
        }else{
            const interval: number = window.setInterval(onGetOrdersList, 10000);
            return () => {
                clearInterval(interval);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        //если изменилось количество заказов(добавился новый)
        if(prevOrdersCount !== ordersList.length){
            setPrevOrdersCount(ordersList.length);
            notificationSnd.play();
        }else if(hasOrdersWithNewStatus(ordersList) && settings.hasNewOrderNotification){
            // иначе если есть заказы со статусом NEW
            notificationNewOrderSnd.play();
        }else{
            dummySnd.play();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordersList])

    const onChangeOrderStatus = (order: IOrder, status: string) => () => {
        if(status === ORDER_STATUS_REJECT || status === ORDER_STATUS_CLOSE){
            setPrevOrdersCount(ordersList.length - 1);
        }
        onChangeAdminOrderStatus(order, status);
    }

    return (
        <div className="page-content-wrapper">
            {
                ordersList.length > 0 ?
                    ordersList.map((order, index) => {
                        return (
                            <Fragment key={`admin-order__${index}`}>
                                <ButtonGroup className="order-buttons-group" variant="contained" color="primary"
                                             aria-label="contained primary button group">
                                    <Button onClick={onChangeOrderStatus(order, ORDER_STATUS_CONFIRM)}
                                            disabled={order.status !== ORDER_STATUS_NEW}>
                                        {order.status === ORDER_STATUS_NEW ? "Принять" : "Заказ принят"}
                                    </Button>
                                    {
                                        order.status === ORDER_STATUS_NEW ?
                                            <Button onClick={onChangeOrderStatus(order, ORDER_STATUS_REJECT)}>
                                                Отменить
                                            </Button> :
                                            <Button onClick={onChangeOrderStatus(order, ORDER_STATUS_CLOSE)}>
                                                Закрыть
                                            </Button>
                                    }
                                </ButtonGroup>
                                <div className="order-controlls__date">
                                    {
                                        `Дата заказа: ${moment(order.orderDate).format("YYYY-MM-DD HH:mm")}`
                                    }
                                </div>
                                <OrdersList viewStatus={STATUS_ADMIN_VIEW}
                                            ordersList={[order.orderParsePositions]}/>
                                <div className="order-info-wrapper">
                                    <div className="order-controlls-wrapper__info">
                                        <a href={`tel:${order.phone}`}>
                                            {`Телефон: ${order.phone}`}
                                        </a>
                                    </div>
                                    <div className="order-controlls-wrapper__info">
                                        <b>Общая стоимость заказа: </b>
                                        {`${getClientOrderTotalPrice(order.orderParsePositions)} руб.`}
                                    </div>
                                    <div className="order-controlls-wrapper__info">
                                        <b>Адрес: </b>
                                        {`${order.adress}`}
                                    </div>
                                    {
                                        order.comments && order.comments !== "" &&
                                        <div className="order-controlls-wrapper__info">
                                            <b>Комментарий к заказу: </b>
                                            {`${order.comments}`}
                                        </div>
                                    }

                                </div>
                            </Fragment>
                        )
                    })
                    :
                    null
            }

        </div>

    );
}

export default connect(mapStateToProps, mapDispatcherToProps)(AdminProductOrdersPage);
