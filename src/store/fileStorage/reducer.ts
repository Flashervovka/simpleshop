import {
    FileStorageActionTypes,
    IFile,
    IFileStorageState,
    ON_SEND_FILE_REQUEST,
    ON_SEND_FILE_REQUEST_COMPLETED
} from "./types";
import {RootStateType} from "../index";


const init: IFileStorageState = {
    uploadedFilesData:[],
    isFileSendCompleted:true,
    isFileSending:false,
    lastUploaded:null
};

export function fileStorage(state: IFileStorageState = init, action: FileStorageActionTypes): IFileStorageState {
    switch (action.type) {
        case ON_SEND_FILE_REQUEST:
            return {
               ...state,
               isFileSendCompleted:false,
               isFileSending:true
            };
        case ON_SEND_FILE_REQUEST_COMPLETED:
            return {
                ...state,
                uploadedFilesData:[...state.uploadedFilesData, action.uploadedFileData],
                lastUploaded:action.uploadedFileData,
                isFileSendCompleted:true,
                isFileSending:false
            };
        default:
            return state;
    }
}

const getLastUploadedSelector = (state:RootStateType):IFile | null => {
    return state.fileStorage.lastUploaded
}

export {
    getLastUploadedSelector
}