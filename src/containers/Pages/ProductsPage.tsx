import React, {useEffect} from "react";
import {IAdminProductsPageProps} from "./types";
import ProductsList from "../../components/ProductsList";
import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../../store";
import {IProduct, ProductsActionTypes} from "../../store/products/types";
import {getProductListSelector} from "../../store/products/reducer";
import {
    getProductsListAction, removeProductAction,
} from "../../store/products/actions";
import {connect} from "react-redux";

const mapStateToProps = (state: RootStateType) => ({
    productsList:getProductListSelector(state),
})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, ProductsActionTypes>) => {
    return{
        onGetProductsList: (): void => {
            dispatch(getProductsListAction());
        },
        onRemoveProduct: (product: IProduct): void => {
            dispatch(removeProductAction(product))
        }
    }
}

type AdminTypeProductsPageProps = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const ProductsPage: React.FC<AdminTypeProductsPageProps & IAdminProductsPageProps> = (props: AdminTypeProductsPageProps & IAdminProductsPageProps) => {
    const {productsList, onOpenProductDialog, onRemoveProduct, onGetProductsList, readOnly} = props;

    useEffect(() => {
        onGetProductsList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ProductsList
            productsList={productsList}
            onOpenProductDialog={onOpenProductDialog}
            onRemoveProduct={onRemoveProduct}
            readOnly={readOnly}/>
    );
}

export default connect(mapStateToProps, mapDispatcherToProps)(ProductsPage);
