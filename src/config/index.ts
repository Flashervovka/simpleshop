import FastfoodIcon from '@material-ui/icons/Fastfood';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SettingsIcon from '@material-ui/icons/Settings';
import AdminProductsPage from "../components/AdminPages/AdminProductsPage";
import AdminProductOrdersPage from "../components/AdminPages/AdminProductOrdersPage";
import AdminSettingsPage from "../components/AdminPages/AdminSettingsPage";
import {ITabsPanelsData} from "../components/ControllBar/types";


const basePath: String = "http://localhost:8080";


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


export {
    basePath,
    adminTabsAndPanels
}