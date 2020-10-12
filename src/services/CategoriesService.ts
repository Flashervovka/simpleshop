import {http} from "../helpers";
import {basePath} from "../config";
import {ICategory} from "../store/categories/types";
import {IAuthRequestResponce} from "../types/types";

/*
 * service works with categories: add, remove, get
 *   */
class CategoriesService {

    async getCategoriesList():Promise<ICategory[]>{
        const responce:Array<Object> = await http({url:`${basePath}/category`}) ;
        const result:ICategory[] = responce as ICategory[];
        return result;
    }

    async addNew(newCategoryData: ICategory, userId:string):Promise<IAuthRequestResponce<ICategory>> {
        const responce: IAuthRequestResponce<ICategory> = await http({
            url: `${basePath}/category`,
            init: {
                method: "post",
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    data:newCategoryData,
                  //  shopUser:{id:userId}
                })
            }
        });
        return responce;
    }

    async remove(category: ICategory, userId:string):Promise<IAuthRequestResponce<Number>> {
        const responce: IAuthRequestResponce<Number> = await http({
            url: `${basePath}/category`,
            init: {
                method: "DELETE",
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    data:category,
                   // shopUser:{id:userId}
                })
            }
        });
        return responce;
    }
}
export default new CategoriesService();