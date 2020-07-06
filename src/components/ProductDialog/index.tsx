import React from "react";
import Dialog from '@material-ui/core/Dialog';
import './styles.css';
import {IProduct} from "../../store/products/types";
import CreateProductDialog from "./CreateProductDialog";
import EditAndViewProductDialog from "./EditAndViewProductDialog";

interface ProductDialogProps {
    open: boolean
    onOpenProductDialog(isOpen: boolean, product?: IProduct): void
    selectedProduct: IProduct | null
    onAddNewProduct(product: IProduct, productImgFile: Blob): void
    dialogStatus: string,
    onUpdateProduct(product: IProduct, productImgFile: Blob): void
}

const ProductDialog: React.FC<ProductDialogProps> = (props: ProductDialogProps) => {
    const {open, onOpenProductDialog, selectedProduct, onAddNewProduct, dialogStatus, onUpdateProduct} = props;
    const onCloseDialog = (): void => {
        onOpenProductDialog(false);
    }

    const onSaveProduct = (product: IProduct, productImgFile: Blob): void => {
        onAddNewProduct(product, productImgFile);
    }

    return (
        <Dialog open={open} onClose={onCloseDialog} aria-labelledby="form-dialog-title" fullWidth>
            {selectedProduct ?
                <EditAndViewProductDialog onCloseDialog={onCloseDialog} selectedProduct={selectedProduct} dialogStatus={dialogStatus} onUpdateProduct={onUpdateProduct}/> :
                <CreateProductDialog onCloseDialog={onCloseDialog} onSaveProduct={onSaveProduct}/>}
        </Dialog>
    );
}

export default ProductDialog;
