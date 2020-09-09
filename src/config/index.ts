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

const STATUS_EDIT:string = "edit";
const STATUS_ADD:string = "add";
const STATUS_CLIENT_VIEW:string = "client_view";
const STATUS_ADMIN_VIEW:string = "admin_view";

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
    userTabsAndPanels,
    STATUS_EDIT,
    STATUS_ADD,
    STATUS_ADMIN_VIEW,
    STATUS_CLIENT_VIEW
}