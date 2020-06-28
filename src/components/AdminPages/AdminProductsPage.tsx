import React from "react";
//import ProductCreatePanel from "../ProductCreatePanel";
import {AdminProductsPageProps} from "./types";
import ProductsList from "../ProductsList";


const AdminProductsPage: React.FC<AdminProductsPageProps> = (props: AdminProductsPageProps) => {
    //const {onSendFile} = props;
    return (
       <ProductsList/>
      /*  <ProductCreatePanel onSendFile={onSendFile}/>*/
    );
}

export default AdminProductsPage;
