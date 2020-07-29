export const ON_GET_CATEGORIES_REQUEST = "category.ON_GET_CATEGORIES_REQUEST";
export const ON_GET_CATEGORIES_REQUEST_COMPLETED = "category.ON_GET_CATEGORIES_REQUEST_COMPLETED";

export const ON_ADD_NEW_CATEGORY_REQUEST = "category.ON_ADD_NEW_CATEGORY_REQUEST";
export const ON_ADD_NEW_CATEGORY_REQUEST_COMPLETED = "category.ON_ADD_NEW_CATEGORY_REQUEST_COMPLETED";

export const ON_REMOVE_CATEGORY_REQUEST = "category.ON_REMOVE_CATEGORY_REQUEST";
export const ON_REMOVE_CATEGORY_REQUEST_COMPLETED = "category.ON_REMOVE_CATEGORY_REQUEST_COMPLETED";

export interface ICategory {
    id: Number
    name: string
    label: string
}

export interface ICategoriesState {
    categories:ICategory[]
    isLoading: boolean
    isLoaded: boolean
}

interface GetProductRequestAction {
    type: typeof ON_GET_CATEGORIES_REQUEST
}
interface GetProductRequestCompletedAction {
    type: typeof ON_GET_CATEGORIES_REQUEST_COMPLETED
    categories:ICategory[]
}

interface AddNewProductRequestAction {
    type: typeof ON_ADD_NEW_CATEGORY_REQUEST
}
interface AddNewProductRequestCompletedAction {
    type: typeof ON_ADD_NEW_CATEGORY_REQUEST_COMPLETED
    newCategory:ICategory
}

interface RemoveProductRequestAction {
    type: typeof ON_REMOVE_CATEGORY_REQUEST
}
interface RemoveProductRequestCompletedAction {
    type: typeof ON_REMOVE_CATEGORY_REQUEST_COMPLETED
}

export type CategoriesActionTypes =
    GetProductRequestAction
    | GetProductRequestCompletedAction
    | AddNewProductRequestAction
    | AddNewProductRequestCompletedAction
    | RemoveProductRequestAction
    | RemoveProductRequestCompletedAction;