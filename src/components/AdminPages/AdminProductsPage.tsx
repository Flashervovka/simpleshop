import React from "react";
//import ProductCreatePanel from "../ProductCreatePanel";
import {AdminProductsPageProps} from "./types";
import ProductsList from "../ProductsList";


const AdminProductsPage: React.FC<AdminProductsPageProps> = (props: AdminProductsPageProps) => {
    const {productsList, onCreateNewProduct} = props;
    return (
        <ProductsList productsList={productsList}  onCreateNewProduct={onCreateNewProduct}/>
        /*  <ProductCreatePanel onSendFile={onSendFile}/>*/
    );
}

export default AdminProductsPage;
