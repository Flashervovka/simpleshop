import {http} from "../helpers";
import {basePath} from "../config";

/*
 * service works with files: upload to and remove from
 *   */
class FileStorageService {
    /*
    * method uploads file
    * @param {Array<Blob>} file - file for uploading
    * */
    async sendFile(file:Blob):Promise<Object>{
        const attachmentFile: FormData = new FormData();
        attachmentFile.append('file', file)

        const responce:Object = await http({
            url: `${basePath}/uploadFile`,
            init: {
                method: "post",
                body: attachmentFile
            }
        });
        return responce;
    }
}
export default new FileStorageService();