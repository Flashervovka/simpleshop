import {ICategory} from "../store/categories/types";

export function getCategoryByName(categories:ICategory[], categoryName:string):ICategory | null{
    return categories.filter((category) => category.name === categoryName)[0];
}