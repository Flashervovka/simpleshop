import React, {useEffect} from "react";
import {connect} from "react-redux";
import {RootStateType} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {OrdersActionTypes} from "../../store/orders/types";
import {getOrdersListAction} from "../../store/orders/actions";
import {getOrdersListSelector} from "../../store/orders/reducer";
//import OrdersList from "../../components/OrdersList";
import './styles.css';
import {getProductListSelector} from "../../store/products/reducer";

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
    const {onGetOrdersList/*, ordersList, productsList*/} = props;
    useEffect(() => {
        onGetOrdersList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="page-content-wrapper">
            {/*} <OrdersList
                ordersList={ordersList}
                productsList={productsList}/>*/}
        </div>

    );
}

export default connect(mapStateToProps, mapDispatcherToProps)(AdminProductOrdersPage);
