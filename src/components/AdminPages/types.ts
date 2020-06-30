import {IProduct} from "../../store/products/types";

export interface AdminProductsPageProps {
    productsList:IProduct[]
    onCreateNewProduct(isOpenDialogCreate:boolean):void
}

export interface AdminProductOrdersPageProps {
    name:string
}