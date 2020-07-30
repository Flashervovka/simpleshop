import {
    CategoriesActionTypes,
    ICategoriesState,
    ON_ADD_NEW_CATEGORY_REQUEST,
    ON_ADD_NEW_CATEGORY_REQUEST_COMPLETED,
    ON_GET_CATEGORIES_REQUEST,
    ON_GET_CATEGORIES_REQUEST_COMPLETED,
    ON_REMOVE_CATEGORY_REQUEST,
    ON_REMOVE_CATEGORY_REQUEST_COMPLETED
} from "./types";
import {RootStateType} from "../index";

const init: ICategoriesState = {
   categories:[],
   isLoaded:true,
   isLoading:false
};

export function categoriesState(state: ICategoriesState = init, action: CategoriesActionTypes): ICategoriesState {
    switch (action.type) {
        case ON_GET_CATEGORIES_REQUEST:
            return {
                ...state,
                isLoaded:false,
                isLoading:true
            };
        case ON_GET_CATEGORIES_REQUEST_COMPLETED:
            return {
                ...state,
                isLoaded:true,
                isLoading:false,
                categories:[...action.categories]
            };
        case ON_ADD_NEW_CATEGORY_REQUEST:
            return {
                ...state,
                isLoaded:false,
                isLoading:true
            };
        case ON_ADD_NEW_CATEGORY_REQUEST_COMPLETED:
            return {
                ...state,
                isLoaded:true,
                isLoading:false,
                categories:[...state.categories, action.newCategory]
            };
        case ON_REMOVE_CATEGORY_REQUEST:
            return {
                ...state,
                isLoaded:false,
                isLoading:true
            };
        case ON_REMOVE_CATEGORY_REQUEST_COMPLETED:
            return {
                ...state,
                isLoaded:true,
                isLoading:false,
                categories:state.categories.filter((category) => category.id !== action.categoryId)
            };
        default:
            return state;
    }
}

const getCategoriesListSelector = (state:RootStateType) => {
    return state.categoriesState.categories
}

export {
    getCategoriesListSelector
}