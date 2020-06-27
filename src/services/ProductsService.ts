import {http} from "../helpers";
import {basePath} from "../config";

/*
 * service works with products: add, remove, update, get
 *   */
class ProductsService {
    /*
    * method gets list of products
    * */
    async getProductsList():Promise<Object>{
        const responce:Object = await http({url:`${basePath}/product`});
        return responce;
    }
}
export default new ProductsService();