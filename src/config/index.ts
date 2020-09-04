import FastfoodIcon from '@material-ui/icons/Fastfood';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SettingsIcon from '@material-ui/icons/Settings';
import AdminProductsPage from "../containers/Pages/ProductsPage";
import AdminProductOrdersPage from "../containers/Pages/AdminProductOrdersPage";
import AdminSettingsPage from "../containers/Pages/AdminSettingsPage";
import {ITabsPanelsData} from "../components/ControllBar/types";

/*get path to API, maybe in future it will be change*/
const originPath: string[] = window.location.origin.split(":");
const basePath: String = originPath[0]+":"+originPath[1]+":8080";

const adminTabsAndPanels: ITabsPanelsData = {
    panels: [
        AdminProductsPage,
        AdminProductOrdersPage,
        AdminSettingsPage
    ],
    tabs: [
        {
            Icon: FastfoodIcon,
            label: "продукты",
            access:true
        },
        {
            Icon: FormatListNumberedIcon,
            label: "заказы",
            access:true
        },
        {
            Icon: SettingsIcon,
            label: "настройки",
            access:true
        }
    ]
}

const userTabsAndPanels: ITabsPanelsData = {
    panels: [
        AdminProductsPage
    ],
    tabs: [
        {
            Icon: FastfoodIcon,
            label: "продукты",
            access:true
        }
    ]
}


export {
    basePath,
    adminTabsAndPanels,
    userTabsAndPanels
}