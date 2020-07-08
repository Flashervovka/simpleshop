import {http} from "../helpers";
import {basePath} from "../config";
import {IProduct} from "../store/products/types";

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

    async addNewProduct(newProductData: IProduct):Promise<IProduct> {
        const responce: IProduct = await http({
            url: `${basePath}/product`,
            init: {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newProductData)
            }
        });
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