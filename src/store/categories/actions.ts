import {ThunkAction} from "redux-thunk";
import {RootStateType} from "../index";
import categoryService from "../../services/CategoriesService";
import {
    CategoriesActionTypes, ICategory,
    ON_ADD_NEW_CATEGORY_REQUEST, ON_ADD_NEW_CATEGORY_REQUEST_COMPLETED,
    ON_GET_CATEGORIES_REQUEST,
    ON_GET_CATEGORIES_REQUEST_COMPLETED, ON_REMOVE_CATEGORY_REQUEST, ON_REMOVE_CATEGORY_REQUEST_COMPLETED
} from "./types";

type TCategoryAction = ThunkAction<void, RootStateType, unknown, CategoriesActionTypes>;

export const addNewCategoryAction = (category:ICategory): TCategoryAction => async (dispatch, state) => {
    dispatch({type:ON_ADD_NEW_CATEGORY_REQUEST});
    const newCategory:ICategory = await categoryService.addNew(category);
    dispatch({type:ON_ADD_NEW_CATEGORY_REQUEST_COMPLETED, newCategory});
}

export const getCategoriesListAction = (): TCategoryAction => async (dispatch, state) => {
    dispatch({type:ON_GET_CATEGORIES_REQUEST});
    const categories:ICategory[] = await categoryService.getCategoriesList();
    dispatch({type:ON_GET_CATEGORIES_REQUEST_COMPLETED, categories});
}

export const removeCategoryAction = (category:ICategory): TCategoryAction => async (dispatch, state) => {
    dispatch({type:ON_REMOVE_CATEGORY_REQUEST});
    const categoryId:Number = await categoryService.remove(category);
    dispatch({type:ON_REMOVE_CATEGORY_REQUEST_COMPLETED, categoryId});
}