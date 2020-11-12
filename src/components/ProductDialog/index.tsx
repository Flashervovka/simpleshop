import React from "react";
import Dialog from '@material-ui/core/Dialog';
import './styles.css';
import {IProduct} from "../../store/products/types";
import CreateProductDialog from "./CreateProductDialog";
import EditAndViewProductDialog from "./EditAndViewProductDialog";
import {ICategory} from "../../store/categories/types";
import {ISettings} from "../../store/settings/types";

interface ProductDialogProps {
    open: boolean
    onOpenProductDialog(isOpen: boolean, product?: IProduct): void
    selectedProduct: IProduct | null
    onAddNewProduct(product: IProduct, productImgFile: File): void
    dialogStatus: string
    onUpdateProduct(product: IProduct, productImgFile: File): void
    categories:ICategory[],
    onPutProductToBasket(product:IProduct, count:number, id:string): void
    settings:ISettings
}

const ProductDialog: React.FC<ProductDialogProps> = (props: ProductDialogProps) => {
    const {
        open,
        onOpenProductDialog,
        selectedProduct,
        onAddNewProduct,
        dialogStatus,
        onUpdateProduct,
        categories,
        onPutProductToBasket,
        settings
    } = props;
    const onCloseDialog = (): void => {
        onOpenProductDialog(false);
    }

    const onSave = (product: IProduct, productImgFile: File): void => {
        onAddNewProduct(product, productImgFile);
    }

    const onUpdate = (product: IProduct, productImgFile: File): void => {
        onUpdateProduct(product, productImgFile);
    }

    return (
        <Dialog open={open} onClose={onCloseDialog} aria-labelledby="form-dialog-title" fullWidth>
            {
                selectedProduct ?
                <EditAndViewProductDialog
                    settings={settings}
                    onCloseDialog={onCloseDialog}
                    selectedProduct={selectedProduct}
                    dialogStatus={dialogStatus}
                    onUpdateProduct={onUpdate}
                    categories={categories}
                    onPutProductToBasket={onPutProductToBasket}/> :
                <CreateProductDialog
                    onCloseDialog={onCloseDialog}
                    onSaveProduct={onSave}
                    categories={categories}/>
            }
        </Dialog>
    );
}

export default ProductDialog;
