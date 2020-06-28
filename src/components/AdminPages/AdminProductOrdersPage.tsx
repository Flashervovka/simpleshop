import React from "react";
import {AdminProductOrdersPageProps} from "./types";


const AdminProductOrdersPage: React.FC<AdminProductOrdersPageProps> = (props: AdminProductOrdersPageProps) => {
    const {name} = props;
    return (
        <div>{name}</div>
    );
}

export default AdminProductOrdersPage;
