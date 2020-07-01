import {http} from "../helpers";
import {basePath} from "../config";
import {IFile} from "../store/fileStorage/types";

/*
 * service works with files: upload to and remove from
 *   */
class FileStorageService {
    /*
    * method uploads file
    * @param {Array<Blob>} file - file for uploading
    * */
    async sendFile(file:Blob):Promise<IFile>{
        const attachmentFile: FormData = new FormData();
        attachmentFile.append('file', file)

        const responce:IFile = await http({
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