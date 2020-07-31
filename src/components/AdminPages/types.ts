import {IProduct} from "../../store/products/types";

export interface IAdminProductsPageProps {
    onOpenProductDialog(isOpenDialogCreate:boolean, product?:IProduct, dialogStatus?:string):void
}

export interface IAdminProductOrdersPageProps {
    name:string
}