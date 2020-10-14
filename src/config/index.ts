import FastfoodIcon from '@material-ui/icons/Fastfood';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SettingsIcon from '@material-ui/icons/Settings';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AdminProductsPage from "../containers/Pages/ProductsPage";
import AdminProductOrdersPage from "../containers/Pages/AdminProductOrdersPage";
import AdminSettingsPage from "../containers/Pages/AdminSettingsPage";
import {ITabsPanelsData} from "../components/ControllBar/types";
import ShoppingPage from "../containers/Pages/ShoppingPage";

/*get path to API, maybe in future it will be change*/
const originPath: string[] = window.location.origin.split(":");
const basePath: String = originPath[0]+":"+originPath[1]+":8080";

const STATUS_EDIT:string = "edit";
const STATUS_ADD:string = "add";
const STATUS_CLIENT_VIEW:string = "client_view";
const STATUS_ADMIN_VIEW:string = "admin_view";
const ORDER_STATUS_NEW:string = "new";
const ORDER_STATUS_CONFIRM:string = "confirm";
const ORDER_STATUS_REJECT:string = "reject";
const ORDER_STATUS_CLOSE:string = "close";
const LOCAL_STORAGE_BASKET:string = "simpleShop__basket";

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
            access:true,
            url:"/dashboard"
        },
        {
            Icon: FormatListNumberedIcon,
            label: "заказы",
            access:true,
            url:"/dashboard/orders"
        },
        {
            Icon: SettingsIcon,
            label: "настройки",
            access:true,
            url:"/dashboard/settings"
        }
    ]
}

const userTabsAndPanels: ITabsPanelsData = {
    panels: [
        AdminProductsPage,
        ShoppingPage
    ],
    tabs: [
        {
            Icon: FastfoodIcon,
            label: "продукты",
            access:true,
            url:"/"
        },
        {
            Icon: ShoppingCartIcon,
            label: "корзина",
            access:true,
            showOrdersInfo:true,
            url:"/basket"
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
    STATUS_CLIENT_VIEW,
    ORDER_STATUS_NEW,
    ORDER_STATUS_CONFIRM,
    ORDER_STATUS_REJECT,
    ORDER_STATUS_CLOSE,
    LOCAL_STORAGE_BASKET
}