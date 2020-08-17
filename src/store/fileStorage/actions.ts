import fileStorage from '../../services/FileStorageService';
import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import {FileStorageActionTypes, IFile, ON_SEND_FILE_REQUEST, ON_SEND_FILE_REQUEST_COMPLETED} from "./types";
import {IAuthRequestResponce} from "../../types/types";

export const sendFileAction = (file: Blob): ThunkAction<void, RootStateType, unknown, FileStorageActionTypes> => async (dispatch, state) => {
    /*dispatch({type:ON_SEND_FILE_REQUEST});
    //const fileData:IFile = await fileStorage.sendFile(file);
    const responce:IAuthRequestResponce<IFile> = await fileStorage.sendFile(file);
    if(responce.user && responce.data){
        dispatch({type:ON_SEND_FILE_REQUEST_COMPLETED, uploadedFileData:responce.data});
    }else{

    }*/
}