import {ICategory} from "../store/categories/types";
import {IBasketProduct} from "../store/basket/types";
import {ITabData} from "../components/ControllBar/types";
import {IOrder} from "../store/orders/types";
import {ORDER_STATUS_NEW} from "../config";

export function getCategoryByName(categories:ICategory[], categoryName:string):ICategory | null{
    return categories.filter((category) => category.name === categoryName)[0];
}

export function getClientOrderTotalPrice(clientOrder: IBasketProduct[]): number {
   let totalPrice:number = 0;
    clientOrder.forEach((order)=>{
        totalPrice+=parseFloat(order.product.price)*order.count;
    });
   return totalPrice;
}

export function getTabIndex(tabs:ITabData[], url:string):number{
    let tabIndex = -1;
    tabs.forEach((tab, index) => {
        if(tab.url === url) {
            tabIndex = index
        }
    });
    return tabIndex;
}

export function hasOrdersWithNewStatus(orders:IOrder[]): boolean {
    return orders.some((order) => order.status === ORDER_STATUS_NEW)
}
