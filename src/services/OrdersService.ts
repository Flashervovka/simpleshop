import {IAuthRequestResponce} from "../types/types";
import {http} from "../helpers";
import {basePath} from "../config";
import {IOrder} from "../store/orders/types";
import {IBasketProduct} from "../store/basket/types";

class OrdersService {

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


    async getOrdersList(userId:string):Promise<IAuthRequestResponce<IOrder[]>> {
        const response:IAuthRequestResponce<Object[]> = await http({url:`${basePath}/orders/${userId}`});
        if(response.data){
            /*make serialization fot orderPositions, because we recieved it in JSON format*/
            const orderPositions:IOrder[] = response.data.map((order)=>{
                const orderSerialized:IOrder = order as IOrder;
                return {
                    ...orderSerialized,
                    orderParsePositions:JSON.parse(orderSerialized.orderPositions)
                }
            })
            const result:IAuthRequestResponce<IOrder[]> = {
                data:orderPositions,
                shopUser:response.shopUser
            }
            return result;
        }else{
            return {
                data:null,
                shopUser:response.shopUser
            }
        }
    }
}

export default new OrdersService();

