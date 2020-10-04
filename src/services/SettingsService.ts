import {http} from "../helpers";
import {basePath} from "../config";
import {IAuthRequestResponce} from "../types/types";
import {ISettings} from "../store/settings/types";

class SettingsService {

    async getSettings(userId:string):Promise<IAuthRequestResponce<ISettings>>{
        const responce:IAuthRequestResponce<ISettings>= await http({url:`${basePath}/settings`}) ;
        return responce;
    }

    async setSettings(settings:ISettings,userId:string):Promise<IAuthRequestResponce<ISettings>>{
        const responce: IAuthRequestResponce<ISettings> = await http({
            url: `${basePath}/settings/${settings.id}`,
            init: {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    data:settings,
                    shopUser:{id:userId}
                })
            }
        });
        return responce;
    }
}

export default new SettingsService();

