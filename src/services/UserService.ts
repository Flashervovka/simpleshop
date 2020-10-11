import {http} from "../helpers";
import {basePath} from "../config";
import {IUser} from "../store/user/types";

/*
 * service works with users
 *   */
class UserService {
    /*
    * method user login
    * */
    async login(userLogin: string, userPassword: string, beInSystem:boolean): Promise<IUser> {
        const responce: IUser = await http(
            {
                url: `${basePath}/user/login`,
                init: {
                    method: "post",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        "beinsystem":beInSystem ? "1" : "0",
                    },
                    body: JSON.stringify({login: userLogin, password: userPassword})
                }
            }
        );
        return responce;
    }
}

export default new UserService();