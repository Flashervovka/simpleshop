import {IProduct} from "../../store/products/types";

export interface AdminProductsPageProps {
    productsList:IProduct[]
    onOpenProductDialog(isOpenDialogCreate:boolean, product?:IProduct, dialogStatus?:string):void
    onRemoveProduct(product:IProduct):void
}

export interface AdminProductOrdersPageProps {
    name:string
}