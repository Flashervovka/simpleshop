import {IBasketProduct} from "../store/basket/types";
import {LOCAL_STORAGE_BASKET} from "../config";

export function addUserOrderToLocalStorage(basketProduct:IBasketProduct):void{
    const lsBasket:string | null = localStorage.getItem(LOCAL_STORAGE_BASKET);
    const userOrder:IBasketProduct[] = lsBasket ? [...JSON.parse(lsBasket), basketProduct] : [basketProduct];
    localStorage.setItem("simpleShop__basket",JSON.stringify(userOrder));
}
export function removeProductFromLocalStorage(basketProductId:string):void{
    const userOrder:IBasketProduct[] = getUserOrderFromLocalStorage().filter((basketProduct) => basketProduct.id !== basketProductId);
    localStorage.setItem("simpleShop__basket",JSON.stringify(userOrder));
}
export function getUserOrderFromLocalStorage():IBasketProduct[]{
    const lsBasket:string | null = localStorage.getItem(LOCAL_STORAGE_BASKET);
    const userOrder:IBasketProduct[] = lsBasket ? JSON.parse(lsBasket) : []
    return userOrder;
}
export function getLocalStorageItem(itemKey:string):string{
    const lsItem:string | null = localStorage.getItem(itemKey);
    return lsItem ? lsItem : '';
}