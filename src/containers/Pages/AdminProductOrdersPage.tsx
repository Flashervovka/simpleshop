import React from "react";
import {IAdminProductOrdersPageProps} from "./types";


const AdminProductOrdersPage: React.FC<IAdminProductOrdersPageProps> = (props: IAdminProductOrdersPageProps) => {
    const {name} = props;
    return (
        <div>{name}</div>
    );
}

export default AdminProductOrdersPage;
