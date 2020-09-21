import {IAuthRequestResponce} from "../types/types";
import {http} from "../helpers";
import {basePath} from "../config";
import {IOrder} from "../store/orders/types";
import {IBasketProduct} from "../store/basket/types";

class OrdersService {

    //async orderProduct(orderPositions:IBasketProduct[], adress:string, phone:string, userId?:string):Promise<IAuthRequestResponce<IProduct>> {
    async orderProduct(orderPositions:IBasketProduct[], adress:string, phone:string, userId?:string):Promise<IAuthRequestResponce<IOrder>> {
        const responce: Object = await http({
            url: `${basePath}/orders`,
            init: {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    data:{
                        orderPositions:JSON.stringify(orderPositions),
                        status:"new",
                        adress,
                        phone
                    },
                    shopUser:{id:userId}
                })
            }
        });

        return responce as IAuthRequestResponce<IOrder>;
    }

    /*async orderProduct(orderProductData: IProduct, count:string, adress:string, phone:string, userId?:string):Promise<IAuthRequestResponce<IProduct>> {
        const responce: IAuthRequestResponce<IProduct> = await http({
            url: `${basePath}/orders`,
            init: {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    data:{
                        productId:orderProductData.id,
                        orderCount:count,
                        status:"new",
                        adress,
                        phone
                    },
                    shopUser:{id:userId}
                })
            }
        });
        return responce;
    }*/

    async getOrdersList(userId:string):Promise<IAuthRequestResponce<IOrder[]>> {
        const responce:IAuthRequestResponce<IOrder[]> = await http({url:`${basePath}/orders/${userId}`});
        return responce;
    }
}

export default new OrdersService();

