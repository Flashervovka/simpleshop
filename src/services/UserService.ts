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
    async login(userLogin: string, userPassword: string): Promise<IUser> {
        const responce: IUser = await http(
            {
                url: `${basePath}/user/login`,
                init: {
                    method: "post",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({login: userLogin, password: userPassword})
                }
            }
        );
        return responce;
    }
}

export default new UserService();