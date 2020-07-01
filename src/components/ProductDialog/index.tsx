import React from "react";
import Dialog from '@material-ui/core/Dialog';
import './styles.css';
import {IProduct} from "../../store/products/types";
import CreateProductDialog from "./CreateProductDialog";

interface ProductDialogProps {
    open: boolean
    onOpenProductDialog(isOpen: boolean, product?: IProduct): void
    selectedProduct: IProduct | null
    onAddNewProduct(product: IProduct, productImgFile: Blob): void
}

const ProductDialog: React.FC<ProductDialogProps> = (props: ProductDialogProps) => {
    const {open, onOpenProductDialog, selectedProduct, onAddNewProduct} = props;
    const onCloseDialog = (): void => {
        onOpenProductDialog(false);
    }

    const onSaveProduct = (product: IProduct, productImgFile: Blob): void => {
        onAddNewProduct(product, productImgFile);
    }

    return (
        <Dialog open={open} onClose={onCloseDialog} aria-labelledby="form-dialog-title" fullWidth>
            {selectedProduct ? '' : <CreateProductDialog onCloseDialog={onCloseDialog} onSaveProduct={onSaveProduct}/>}
        </Dialog>
    );
}

export default ProductDialog;
