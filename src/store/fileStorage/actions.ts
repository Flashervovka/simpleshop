import fileStorage from '../../services/FileStorageService';
import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import {FileStorageActionTypes, ON_SEND_FILE_REQUEST, ON_SEND_FILE_REQUEST_COMPLETED} from "./types";

export const sendFileAction = (file: Blob): ThunkAction<void, RootStateType, unknown, FileStorageActionTypes> => async (dispatch, state) => {
    dispatch({type:ON_SEND_FILE_REQUEST});
    const fileData:Object = await fileStorage.sendFile(file);
    dispatch({type:ON_SEND_FILE_REQUEST_COMPLETED, uploadedFileData:fileData});
}