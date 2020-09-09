import {IProduct} from "../store/products/types";
import {IAuthRequestResponce} from "../types/types";
import {http} from "../helpers";
import {basePath} from "../config";

class OrdersService {

    async orderProduct(orderProductData: IProduct, count:string, userId?:string):Promise<IAuthRequestResponce<IProduct>> {
        const responce: IAuthRequestResponce<IProduct> = await http({
            url: `${basePath}/orders`,
            init: {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    data:{
                        productId:orderProductData.id,
                        orderCount:count
                    },
                    shopUser:{id:userId}
                })
            }
        });
        return responce;
    }
}

export default new OrdersService();

