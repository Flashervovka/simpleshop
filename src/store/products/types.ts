export const ON_GET_PRODUCTS_REQUEST = "products.ON_GET_PRODUCTS_REQUEST";
export const ON_GET_PRODUCTS_REQUEST_COMPLETED = "products.ON_GET_PRODUCTS_REQUEST_COMPLETED";

export interface IProduct {
    id?:string
    name:string
    price:string
    description:string
}

export interface IProductsState {
    productsList:IProduct[]
    isLoading:boolean
    isLoaded:boolean
}

interface GetProductRequestAction {
    type: typeof ON_GET_PRODUCTS_REQUEST
}

interface GetProductRequestCompletedAction {
    type: typeof ON_GET_PRODUCTS_REQUEST_COMPLETED
    productsList:IProduct[]
}


export type ProductsActionTypes = GetProductRequestAction | GetProductRequestCompletedAction