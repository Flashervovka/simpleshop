import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {SvgIconTypeMap} from "@material-ui/core";
import React from "react";
import {IAdminProductsPageProps, IAdminProductOrdersPageProps} from "../../containers/Pages/types";

export interface ITabData {
    Icon:OverridableComponent<SvgIconTypeMap<{}, "svg">>
    label: String
    access: boolean
}
type Pages = React.FC<IAdminProductsPageProps> | React.FC<IAdminProductOrdersPageProps>

export interface ITabsPanelsData {
    tabs:ITabData[]
    panels:Pages[]
}