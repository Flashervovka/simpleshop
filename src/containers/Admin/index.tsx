import React, {useState} from 'react';
import {connect} from 'react-redux'
import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../../store";
//import ProductCreatePanel from "../../components/ProductCreatePanel";
import {sendFileAction} from "../../store/fileStorage/actions";
import {FileStorageActionTypes} from "../../store/fileStorage/types";
import {IProduct, ProductsActionTypes} from "../../store/products/types";

import {addNewProductAction, getProductsListAction} from "../../store/products/actions";
import {getProductListSelector} from "../../store/products/reducer"

import './styles.css';
import ControllBar from "../../components/ControllBar";
import {adminTabsAndPanels} from "../../config";
import {getLastUploadedSelector} from "../../store/fileStorage/reducer";
import NewProductDialog from "../../components/NewProductDialog/NewProductDialog";

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
        }
    }
}

type ReduxType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const AdminPage: React.FC<ReduxType> = (props: ReduxType) => {
    const {onGetProductsList, productsListProp} = props;
    const [openAddProductDialog, setOpenAddProductDialog] = useState<boolean>(false);

    const onOpenAddProductDialog = (isOpen:boolean): void => {console.log("isOpen",isOpen);
        setOpenAddProductDialog(isOpen);
    }

    return (
        <div>
            <ControllBar
                tabsPanelsData={adminTabsAndPanels}
                onGetProductsList={onGetProductsList}
                productsList={productsListProp}
                onCreateNewProduct={onOpenAddProductDialog}/>
            {/*  <ProductCreatePanel onSendFile={onSendFile}/>*/}
            <NewProductDialog open={openAddProductDialog} onOpenAddProductDialog={onOpenAddProductDialog}/>
        </div>

    )
}
export default connect(mapStateToProps, mapDispatcherToProps)(AdminPage);