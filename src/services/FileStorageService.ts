import {http} from "../helpers";
import {basePath} from "../config";
import {IFile} from "../store/fileStorage/types";
import {IAuthRequestResponce} from "../types/types";

/*
 * service works with files: upload to and remove from
 *   */
class FileStorageService {
    /*
    * method uploads file
    * @param {Array<Blob>} file - file for uploading
    * */
   // async sendFile(file:Blob):Promise<IFile>{
    async sendFile(file:Blob):Promise<IAuthRequestResponce<IFile>>{
        const attachmentFile: FormData = new FormData();
        attachmentFile.append('file', file)
        attachmentFile.append('userId', "27fe3cd7-4851-467a-bc73-36b9d17d2ab2")

        const responce:IAuthRequestResponce<string> = await http({
            url: `${basePath}/uploadFile`,
            init: {
                method: "post",
                body: attachmentFile
            }
        });
        const result:IAuthRequestResponce<IFile> = {
            data:{
                url:responce.data ? responce.data : ""
            },
            user:responce.user
        }

        return result;
    }
}
export default new FileStorageService();