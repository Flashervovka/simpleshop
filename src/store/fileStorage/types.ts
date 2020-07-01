export const ON_SEND_FILE_REQUEST = "fileStorage.ON_SEND_FILE_REQUEST";
export const ON_SEND_FILE_REQUEST_COMPLETED = "fileStorage.ON_SEND_FILE_REQUEST_COMPLETED";

export interface IFileStorageState {
    uploadedFilesData: IFile[]
    isFileSending: boolean
    isFileSendCompleted: boolean
    lastUploaded: IFile | null
}

interface SendFileRequestAction {
    type: typeof ON_SEND_FILE_REQUEST
}

export interface IFile {
    url:string
}

interface SendFileRequestCompletedAction {
    type: typeof ON_SEND_FILE_REQUEST_COMPLETED
    uploadedFileData: IFile
}


export type FileStorageActionTypes = SendFileRequestAction | SendFileRequestCompletedAction