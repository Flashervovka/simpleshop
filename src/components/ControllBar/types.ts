import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {SvgIconTypeMap} from "@material-ui/core";
import React from "react";
import {AdminProductsPageProps, AdminProductOrdersPageProps, AdminSettingsPageProps} from "../AdminPages/types";

export interface ITabData {
    Icon:OverridableComponent<SvgIconTypeMap<{}, "svg">>
    label: String
}


type AdminPage = React.FC<AdminProductsPageProps> | React.FC<AdminProductOrdersPageProps> | React.FC<AdminSettingsPageProps>

export interface ITabsPanelsData {
    tabs:ITabData[]
    panels:AdminPage[]
}