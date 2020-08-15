import React, {useState} from 'react';
import {connect} from 'react-redux'
import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../../store";
import {FileStorageActionTypes} from "../../store/fileStorage/types";
import {IProduct, ProductsActionTypes} from "../../store/products/types";

import {
    addNewProductAction,
    selectProductAction,
    updateProductAction
} from "../../store/products/actions";
import { getSelectedProductSelector} from "../../store/products/reducer"

import './styles.css';
import ControllBar from "../../components/ControllBar";
import {adminTabsAndPanels} from "../../config";
import ProductDialog from '../../components/ProductDialog';
import {CategoriesActionTypes} from "../../store/categories/types";
import {getCategoriesListSelector} from "../../store/categories/reducer";
import {getCategoriesListAction} from "../../store/categories/actions";

const mapStateToProps = (state: RootStateType) => ({
    selectedProductProp: getSelectedProductSelector(state),
    categories:getCategoriesListSelector(state)
})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, FileStorageActionTypes | ProductsActionTypes | CategoriesActionTypes>) => {
    return {
        onAddNewProduct: (product: IProduct, productImgFile: Blob): void => {
            dispatch(addNewProductAction(product, productImgFile))
        },
        onSelectProduct: (product: IProduct | null) => {
            dispatch(selectProductAction(product))
        },
        onUpdateProduct: (product: IProduct, productImgFile: Blob): void => {
            dispatch(updateProductAction(product, productImgFile))
        },
        onGetCategories: (): void => {
            dispatch(getCategoriesListAction());
        },
    }
}

type AdminPageType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const AdminPage: React.FC<AdminPageType> = (props: AdminPageType) => {
    const {
        onSelectProduct,
        selectedProductProp,
        onAddNewProduct,
        onUpdateProduct,
        onGetCategories,
        categories
    } = props;
    const [openProductDialog, setOpenProductDialog] = useState<boolean>(false);
    const [productDialogStatus, setProductDialogStatus] = useState<string>('');

    const onOpenProductDialog = (isOpen:boolean, product?:IProduct,  dialogStatus:string = ""): void => {
        setOpenProductDialog(isOpen);
        setProductDialogStatus(dialogStatus);
        onSelectProduct(product ? product : null);
        if(isOpen){
            onGetCategories();
        }
    }

    return (
        <div>
            <ControllBar
                tabsPanelsData={adminTabsAndPanels}
                onOpenProductDialog={onOpenProductDialog}
            />
            <ProductDialog
                open={openProductDialog}
                onOpenProductDialog={onOpenProductDialog}
                selectedProduct={selectedProductProp}
                onAddNewProduct={onAddNewProduct}
                dialogStatus={productDialogStatus}
                onUpdateProduct={onUpdateProduct}
                categories={categories}/>
        </div>

    )
}
export default connect(mapStateToProps, mapDispatcherToProps)(AdminPage);