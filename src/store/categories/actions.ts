import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import categoryService from "../../services/CategoriesService";
import {
    CategoriesActionTypes, ICategory,
    ON_ADD_NEW_CATEGORY_REQUEST, ON_ADD_NEW_CATEGORY_REQUEST_COMPLETED,
    ON_GET_CATEGORIES_REQUEST,
    ON_GET_CATEGORIES_REQUEST_COMPLETED, ON_REMOVE_CATEGORY_REQUEST, ON_REMOVE_CATEGORY_REQUEST_COMPLETED
} from "./types";
import {IAuthRequestResponce} from "../../types/types";
import {showAlertAction} from "../errors/actions";
import {ErrorsActionTypes} from "../errors/types";
import {getUserIdSelector} from "../user/reducer";

type TCategoryAction = ThunkAction<void, RootStateType, unknown, CategoriesActionTypes | ErrorsActionTypes>;

export const addNewCategoryAction = (category:ICategory): TCategoryAction => async (dispatch, state) => {
    dispatch({type:ON_ADD_NEW_CATEGORY_REQUEST});
    const userId:string = getUserIdSelector(state());
    const newCategory:IAuthRequestResponce<ICategory> = await categoryService.addNew(category, userId);
    if(newCategory.shopUser && newCategory.data){
        dispatch({type:ON_ADD_NEW_CATEGORY_REQUEST_COMPLETED, newCategory:newCategory.data});
    }else{
        dispatch(showAlertAction({title:"Ошибка", text:"У текущего пользователя не прав для создания категорий."}))
    }
}

export const getCategoriesListAction = (): TCategoryAction => async (dispatch, state) => {
    dispatch({type:ON_GET_CATEGORIES_REQUEST});
    const categories:ICategory[] = await categoryService.getCategoriesList();
    dispatch({type:ON_GET_CATEGORIES_REQUEST_COMPLETED, categories});
}

export const removeCategoryAction = (category:ICategory): TCategoryAction => async (dispatch, state) => {
    dispatch({type:ON_REMOVE_CATEGORY_REQUEST});
    const userId:string = getUserIdSelector(state());

    const result:IAuthRequestResponce<Number> = await categoryService.remove(category, userId);
    if(result.shopUser && result.data){
        dispatch({type:ON_REMOVE_CATEGORY_REQUEST_COMPLETED, categoryId:result.data});
    }else{
        dispatch(showAlertAction({title:"Ошибка", text:"У текущего пользователя не прав для удаления категорий."}))
    }

}