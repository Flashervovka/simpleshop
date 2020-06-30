import React, {useState} from 'react';
import {connect} from 'react-redux'
import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../../store";
//import ProductCreatePanel from "../../components/ProductCreatePanel";
import {sendFileAction} from "../../store/fileStorage/actions";
import {FileStorageActionTypes} from "../../store/fileStorage/types";
import {IProduct, ProductsActionTypes} from "../../store/products/types";

import {addNewProductAction, getProductsListAction, selectProductAction} from "../../store/products/actions";
import {getProductListSelector} from "../../store/products/reducer"

import './styles.css';
import ControllBar from "../../components/ControllBar";
import {adminTabsAndPanels} from "../../config";
import {getLastUploadedSelector} from "../../store/fileStorage/reducer";
import ProductDialog from '../../components/ProductDialog';

const mapStateToProps = (state: RootStateType) => ({
    productsListProp: getProductListSelector(state),
    productUploadedImageUrl: getLastUploadedSelector(state)
})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, FileStorageActionTypes | ProductsActionTypes>) => {
    return {
        onSendFile: (file: Blob): void => {
            dispatch(sendFileAction(file));
        },
        onGetProductsList: (): void => {
            dispatch(getProductsListAction());
        },
        onAddNewProduct: (product: IProduct): void => {
            dispatch(addNewProductAction(product))
        },
        onSelectProduct: (product: IProduct) => {
            dispatch(selectProductAction(product))
        }
    }
}

type ReduxType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const AdminPage: React.FC<ReduxType> = (props: ReduxType) => {
    const {onGetProductsList, productsListProp, onSelectProduct} = props;
    const [openAddProductDialog, setOpenAddProductDialog] = useState<boolean>(false);

    const onOpenProductDialog = (isOpen:boolean, product?:IProduct): void => {
        setOpenAddProductDialog(isOpen);
        if(product)onSelectProduct(product);
    }

    return (
        <div>
            <ControllBar
                tabsPanelsData={adminTabsAndPanels}
                onGetProductsList={onGetProductsList}
                productsList={productsListProp}
                onOpenProductDialog={onOpenProductDialog}/>
            {/*  <ProductCreatePanel onSendFile={onSendFile}/>*/}
            <ProductDialog open={openAddProductDialog} onOpenProductDialog={onOpenProductDialog}/>
        </div>

    )
}
export default connect(mapStateToProps, mapDispatcherToProps)(AdminPage);