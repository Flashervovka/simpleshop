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
    async addNewProduct(newProductData: IProduct, userId:string):Promise<IAuthRequestResponce<IProduct>> {
        const responce: IAuthRequestResponce<IProduct> = await http({
            url: `${basePath}/product`,
            init: {
                method: "post",
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    data:newProductData,
                   // shopUser:{id:userId}
                })
            }
        });
        return responce;
    }

    async updateProduct(updatedProductData: IProduct, imageUpdatedUrl:string ,userId:string):Promise<IAuthRequestResponce<IProduct>> {
        console.log("imageUpdatedUrl",imageUpdatedUrl);
        const responce: IAuthRequestResponce<IProduct> = await http({
            url: `${basePath}/product/${updatedProductData.id}`,
            init: {
                method: "PUT",
                credentials: 'include',
                headers: {'Content-Type': 'application/json', "imageupdatedurl":imageUpdatedUrl},
                body:JSON.stringify({
                    data:updatedProductData,
                   // shopUser:{id:userId}
                })
            }
        });
        return responce;
    }

    async removeProduct(product: IProduct, userId:string):Promise<IAuthRequestResponce<string>> {
        const responce: IAuthRequestResponce<string> = await http({
            url: `${basePath}/product/${product.id}`,
            init: {
                method: "DELETE",
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({
                    data:product,
                   // shopUser:{id:userId}
                })
            }
        });
        return responce;
    }
}
export default new ProductsService();
