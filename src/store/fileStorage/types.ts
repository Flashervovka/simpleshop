export const ON_SEND_FILE_REQUEST = "fileStorage.ON_SEND_FILE_REQUEST";
export const ON_SEND_FILE_REQUEST_COMPLETED = "fileStorage.ON_SEND_FILE_REQUEST_COMPLETED";

export interface IFileStorageState {
    uploadedFilesData:Object[]
    isFileSending:boolean
    isFileSendCompleted:boolean
    lastUploaded:Object | null
}

interface SendFileRequestAction {
    type: typeof ON_SEND_FILE_REQUEST
}

interface SendFileRequestCompletedAction {
    type: typeof ON_SEND_FILE_REQUEST_COMPLETED
    uploadedFileData:Object
}


export type FileStorageActionTypes = SendFileRequestAction | SendFileRequestCompletedAction