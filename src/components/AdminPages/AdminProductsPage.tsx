import React from "react";
//import ProductCreatePanel from "../ProductCreatePanel";
import {AdminProductsPageProps} from "./types";
import ProductsList from "../ProductsList";


const AdminProductsPage: React.FC<AdminProductsPageProps> = (props: AdminProductsPageProps) => {
    const {productsList, onOpenProductDialog} = props;
    return (
        <ProductsList productsList={productsList}  onOpenProductDialog={onOpenProductDialog}/>
        /*  <ProductCreatePanel onSendFile={onSendFile}/>*/
    );
}

export default AdminProductsPage;
