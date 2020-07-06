import React, {useState} from 'react';
import {connect} from 'react-redux'
import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../../store";
//import ProductCreatePanel from "../../components/ProductCreatePanel";
import {FileStorageActionTypes} from "../../store/fileStorage/types";
import {IProduct, ProductsActionTypes} from "../../store/products/types";

import {
    addNewProductAction,
    getProductsListAction,
    selectProductAction,
    updateProductAction
} from "../../store/products/actions";
import {getProductListSelector, getSelectedProductSelector} from "../../store/products/reducer"

import './styles.css';
import ControllBar from "../../components/ControllBar";
import {adminTabsAndPanels} from "../../config";
import ProductDialog from '../../components/ProductDialog';

const mapStateToProps = (state: RootStateType) => ({
    productsListProp: getProductListSelector(state),
    selectedProductProp: getSelectedProductSelector(state),
})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, FileStorageActionTypes | ProductsActionTypes>) => {
    return {
        onGetProductsList: (): void => {
            dispatch(getProductsListAction());
        },
        onAddNewProduct: (product: IProduct, productImgFile: Blob): void => {
            dispatch(addNewProductAction(product, productImgFile))
        },
        onSelectProduct: (product: IProduct | null) => {
            dispatch(selectProductAction(product))
        },
        onUpdateProduct: (product: IProduct, productImgFile: Blob): void => {
            dispatch(updateProductAction(product, productImgFile))
        }
    }
}

type ReduxType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const AdminPage: React.FC<ReduxType> = (props: ReduxType) => {
    const {onGetProductsList, productsListProp, onSelectProduct, selectedProductProp,onAddNewProduct, onUpdateProduct} = props;
    const [openProductDialog, setOpenProductDialog] = useState<boolean>(false);
    const [productDialogStatus, setProductDialogStatus] = useState<string>('');

    const onOpenProductDialog = (isOpen:boolean, product?:IProduct,  dialogStatus:string = ""): void => {
        setOpenProductDialog(isOpen);
        setProductDialogStatus(dialogStatus);
        onSelectProduct(product ? product : null);
    }

    return (
        <div>
            <ControllBar
                tabsPanelsData={adminTabsAndPanels}
                onGetProductsList={onGetProductsList}
                productsList={productsListProp}
                onOpenProductDialog={onOpenProductDialog}/>
            {/*  <ProductCreatePanel onSendFile={onSendFile}/>*/}
            <ProductDialog
                open={openProductDialog}
                onOpenProductDialog={onOpenProductDialog}
                selectedProduct={selectedProductProp}
                onAddNewProduct={onAddNewProduct}
                dialogStatus={productDialogStatus}
                onUpdateProduct={onUpdateProduct}/>
        </div>

    )
}
export default connect(mapStateToProps, mapDispatcherToProps)(AdminPage);