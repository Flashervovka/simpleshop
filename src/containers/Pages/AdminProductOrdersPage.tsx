import React, {useEffect,Fragment} from "react";
import {connect} from "react-redux";
import {RootStateType} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {OrdersActionTypes} from "../../store/orders/types";
import {getOrdersListAction} from "../../store/orders/actions";
import {getOrdersListSelector} from "../../store/orders/reducer";
//import OrdersList from "../../components/OrdersList";
import './styles.css';
import {getProductListSelector} from "../../store/products/reducer";
import OrdersList from "../../components/OrdersList";
import {STATUS_ADMIN_VIEW} from "../../config";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const mapStateToProps = (state: RootStateType) => ({
    ordersList:getOrdersListSelector(state),
    productsList:getProductListSelector(state)
})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, OrdersActionTypes>) => {
    return{
        onGetOrdersList: (): void => {
            dispatch(getOrdersListAction());
        }
    }
}

type AdminTypeOrdersPageProps = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const AdminProductOrdersPage: React.FC<AdminTypeOrdersPageProps> = (props: AdminTypeOrdersPageProps) => {
    const {onGetOrdersList, ordersList} = props;
    useEffect(() => {
        onGetOrdersList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="page-content-wrapper">
            {
                ordersList.length > 0 ?
                    ordersList.map((order, index) => {
                        return (
                            <Fragment key={`admin-order__${index}`}>
                                <ButtonGroup className="order-buttons-group" variant="contained" color="primary" aria-label="contained primary button group">
                                    <Button>Принять</Button>
                                    <Button>Отменить</Button>
                                </ButtonGroup>
                                <OrdersList viewStatus={STATUS_ADMIN_VIEW}
                                            ordersList={[order.orderParsePositions]}/>
                                <div className="order-info-wrapper">
                                    <div className="order-controlls-wrapper__info">{`Телефон: ${order.adress}`}</div>
                                    <div className="order-controlls-wrapper__info">{`Адрес: ${order.phone}`}</div>
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
