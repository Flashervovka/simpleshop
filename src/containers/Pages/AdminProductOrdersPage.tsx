import React, {useEffect} from "react";
import {connect} from "react-redux";
import {RootStateType} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {OrdersActionTypes} from "../../store/orders/types";
import {getOrdersListAction} from "../../store/orders/actions";
import {getOrdersListSelector} from "../../store/orders/reducer";

const mapStateToProps = (state: RootStateType) => ({
    ordersList:getOrdersListSelector(state)
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
        <div>sssssssssss</div>
    );
}

export default connect(mapStateToProps, mapDispatcherToProps)(AdminProductOrdersPage);
