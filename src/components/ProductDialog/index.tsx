import React from "react";
import Dialog from '@material-ui/core/Dialog';
import './styles.css';
import {IProduct} from "../../store/products/types";
import CreateProductDialog from "./CreateProductDialog";
import EditAndViewProductDialog from "./EditAndViewProductDialog";
import {ICategory} from "../../store/categories/types";

interface ProductDialogProps {
    open: boolean
    onOpenProductDialog(isOpen: boolean, product?: IProduct): void
    selectedProduct: IProduct | null
    onAddNewProduct(product: IProduct, productImgFile: Blob): void
    dialogStatus: string
    onUpdateProduct(product: IProduct, productImgFile: Blob): void
    categories:ICategory[]
}

const ProductDialog: React.FC<ProductDialogProps> = (props: ProductDialogProps) => {
    const {open, onOpenProductDialog, selectedProduct, onAddNewProduct, dialogStatus, onUpdateProduct, categories} = props;
    const onCloseDialog = (): void => {
        onOpenProductDialog(false);
    }

    const onSave = (product: IProduct, productImgFile: Blob): void => {
        onAddNewProduct(product, productImgFile);
    }

    const onUpdate = (product: IProduct, productImgFile: Blob): void => {
        onUpdateProduct(product, productImgFile);
    }


    return (
        <Dialog open={open} onClose={onCloseDialog} aria-labelledby="form-dialog-title" fullWidth>
            {
                selectedProduct ?
                <EditAndViewProductDialog
                    onCloseDialog={onCloseDialog}
                    selectedProduct={selectedProduct}
                    dialogStatus={dialogStatus}
                    onUpdateProduct={onUpdate}
                    categories={categories}/> :
                <CreateProductDialog
                    onCloseDialog={onCloseDialog}
                    onSaveProduct={onSave}
                    categories={categories}/>
            }
        </Dialog>
    );
}

export default ProductDialog;
