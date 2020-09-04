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
import ProductDialog from '../../components/ProductDialog';
import {CategoriesActionTypes} from "../../store/categories/types";
import {getCategoriesListSelector} from "../../store/categories/reducer";
import {getCategoriesListAction} from "../../store/categories/actions";
import {ITabsPanelsData} from "../../components/ControllBar/types";

const mapStateToProps = (state: RootStateType) => ({
    selectedProductProp: getSelectedProductSelector(state),
    categories:getCategoriesListSelector(state)
})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, FileStorageActionTypes | ProductsActionTypes | CategoriesActionTypes>) => {
    return {
        onAddNewProduct: (product: IProduct, productImgFile: Blob): void => {
            dispatch(addNewProductAction(product, productImgFile))
        },
        onSelectProduct: (product: IProduct | null) :void => {
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

interface IProductPageProps{
    pages:ITabsPanelsData
    readOnly?:boolean
}

type MainPageType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const MainPage: React.FC<MainPageType & IProductPageProps> = (props: MainPageType & IProductPageProps) => {
    const {
        onSelectProduct,
        selectedProductProp,
        onAddNewProduct,
        onUpdateProduct,
        onGetCategories,
        categories,
        pages,
        readOnly
    } = props;
    const [openProductDialog, setOpenProductDialog] = useState<boolean>(false);
    const [productDialogStatus, setProductDialogStatus] = useState<string>('');

    const onOpenProductDialog = (isOpen:boolean, product?:IProduct,  dialogStatus:string = ""): void => {
        if(isOpen){
            setProductDialogStatus(dialogStatus);
            /** get categories list only for edit and add action*/
            if(dialogStatus!==""){
                onGetCategories();
            }
            onSelectProduct(product ? product : null);
        }
        setOpenProductDialog(isOpen);
    }

    return (
        <div>
            <ControllBar
                tabsPanelsData={pages}
                onOpenProductDialog={onOpenProductDialog}
                readOnly={readOnly}
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
export default connect(mapStateToProps, mapDispatcherToProps)(MainPage);