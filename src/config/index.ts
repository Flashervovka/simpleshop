import FastfoodIcon from '@material-ui/icons/Fastfood';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SettingsIcon from '@material-ui/icons/Settings';
import AdminProductsPage from "../components/AdminPages/AdminProductsPage";
import AdminProductOrdersPage from "../components/AdminPages/AdminProductOrdersPage";
import {ITabsPanelsData} from "../components/ControllBar/types";


const basePath:String = "http://localhost:8080";


const adminTabsAndPanels:ITabsPanelsData = {
    panels:[
        AdminProductsPage,
        AdminProductOrdersPage
        ],
    tabs:[
        {
            Icon:FastfoodIcon,
            label:"продукты"
        },
        {
            Icon:FormatListNumberedIcon,
            label:"заказы"
        },
        {
            Icon:SettingsIcon,
            label:"настройки"
        }
    ]
}





export {
    basePath,
    adminTabsAndPanels
}