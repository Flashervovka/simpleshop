import {IProduct} from "../../store/products/types";
import {ICategory} from "../Settings/types";

export interface AdminProductsPageProps {
    productsList:IProduct[]
    onOpenProductDialog(isOpenDialogCreate:boolean, product?:IProduct, dialogStatus?:string):void
    onRemoveProduct(product:IProduct):void
}

export interface AdminProductOrdersPageProps {
    name:string
}

export interface AdminSettingsPageProps {
    categories:ICategory[]
}