import {ICategory} from "../store/categories/types";
import {IBasketProduct} from "../store/basket/types";

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