import { combineReducers } from 'redux';
import { chatState } from './messages';
import {fileStorage} from './fileStorage/reducer';
export const rootReducer = combineReducers({
    chatState: chatState,
    fileStorage
});
export type RootStateType = ReturnType<typeof rootReducer>;