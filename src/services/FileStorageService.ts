import {cyrToLat, http} from "../helpers";
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
    async sendFile(file:File, userId:string):Promise<IAuthRequestResponce<IFile>>{
        const attachmentFile: FormData = new FormData();
        const newFile:File = new File([file], cyrToLat.transform(file.name,"_"), {
            type: file.type,
            lastModified: file.lastModified,
        })
        attachmentFile.append('file', newFile);
       // attachmentFile.append('userId', userId);

        const responce:IAuthRequestResponce<string> = await http({
            url: `${basePath}/uploadFile`,
            init: {
                method: "post",
                credentials: 'include',
                body: attachmentFile
            }
        });
        const result:IAuthRequestResponce<IFile> = {
            data:{
                url:responce.data ? responce.data : ""
            },
            shopUser:responce.shopUser
        }

        return result;
    }
}
export default new FileStorageService();