import {http} from "../helpers";
import {basePath} from "../config";
import {IProduct} from "../store/products/types";
import {IAuthRequestResponce} from "../types/types";

/*
 * service works with products: add, remove, update, get
 *   */
class ProductsService {
    /*
    * method gets list of products
    * */
    async getProductsList():Promise<IProduct[]>{
        const responce:Array<Object> = await http({url:`${basePath}/product`});
        const result:IProduct[] = responce.map((product) => {
            const productSerialized:IProduct = product as IProduct
            return {
               ...productSerialized
            }
        });
        return result;
    }

   // async addNewProduct(newProductData: IProduct):Promise<IProduct> {
    async addNewProduct(newProductData: IProduct):Promise<IAuthRequestResponce<IProduct>> {
        const responce: IAuthRequestResponce<IProduct> = await http({
            url: `${basePath}/product`,
            init: {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    data:newProductData,
                    shopUser:{id:'27fe3cd7-4851-467a-bc73-36b9d17d2ab2'}
                })
            }
        });
        console.log("responce",responce);
        return responce;
    }

    async updateProduct(updatedProductData: IProduct):Promise<IProduct> {
        console.log("updatedProductData",updatedProductData);
        const responce: IProduct = await http({
            url: `${basePath}/product/${updatedProductData.id}`,
            init: {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedProductData)
            }
        });
        return responce;
    }

    async removeProduct(product: IProduct):Promise<string> {
        const responce: string = await http({
            url: `${basePath}/product/${product.id}`,
            init: {
                method: "DELETE",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(product)
            }
        });
        return responce;
    }
}
export default new ProductsService();