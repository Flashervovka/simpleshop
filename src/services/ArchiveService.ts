import {http} from "../helpers";
import {basePath} from "../config";
import {IAuthRequestResponce} from "../types/types";
import {IOrder} from "../store/orders/types";

class ArchiveService {

    async getArchiveOrdersList(userId:string):Promise<IAuthRequestResponce<IOrder[]>>{
        const responce: IAuthRequestResponce<IOrder[]> = await http({
            url: `${basePath}/archive`,
            init: {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id:userId})
            }
        });
        return responce;
    }
}

export default new ArchiveService();

