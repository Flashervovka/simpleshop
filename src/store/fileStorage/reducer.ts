import {FileStorageActionTypes, IFileStorageState, ON_SEND_FILE_REQUEST, ON_SEND_FILE_REQUEST_COMPLETED} from "./types";


const init: IFileStorageState = {
    uploadedFilesData:[],
    isFileSendCompleted:true,
    isFileSending:false
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
                isFileSendCompleted:true,
                isFileSending:false
            };
        default:
            return state;
    }
}