import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {SvgIconTypeMap} from "@material-ui/core";
import React from "react";
import {IAdminProductsPageProps, IAdminProductOrdersPageProps} from "../AdminPages/types";

export interface ITabData {
    Icon:OverridableComponent<SvgIconTypeMap<{}, "svg">>
    label: String
    access: boolean
}

type AdminPage = React.FC<IAdminProductsPageProps> | React.FC<IAdminProductOrdersPageProps>

export interface ITabsPanelsData {
    tabs:ITabData[]
    panels:AdminPage[]
}