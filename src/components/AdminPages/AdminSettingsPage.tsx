import React from 'react';
import {AdminSettingsPageProps} from "./types";
import AdminSettings from "../Settings";

const AdminSettingsPage: React.FC<AdminSettingsPageProps> = (props: AdminSettingsPageProps) => {
    const {categories} = props;
    return (
        <AdminSettings categories={categories}/>
    );
}

export default AdminSettingsPage;
