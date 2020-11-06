import React, {useEffect,Fragment, useState} from "react";
import {IAdminProductsPageProps} from "./types";
import ProductsList from "../../components/ProductsList";
import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../../store";
import {IProduct, ProductsActionTypes} from "../../store/products/types";
import {getProductListSelector} from "../../store/products/reducer";
import {
    getProductsListAction, removeProductAction,
} from "../../store/products/actions";
import {connect} from "react-redux";
import FilterMenu from "../../components/FilterMenu";
import {getCategoriesListSelector} from "../../store/categories/reducer";
import {getCategoriesListAction} from "../../store/categories/actions";

const mapStateToProps = (state: RootStateType) => ({
    productsList:getProductListSelector(state),
    categories:getCategoriesListSelector(state),
    locationPathName:state.router.location.pathname
})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, ProductsActionTypes>) => {
    return{
        onGetProductsList: (): void => {
            dispatch(getProductsListAction());
        },
        onRemoveProduct: (product: IProduct): void => {
            dispatch(removeProductAction(product))
        },
        onGetCategories: (): void => {
            dispatch(getCategoriesListAction());
        },
    }
}

type AdminTypeProductsPageProps = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const ProductsPage: React.FC<AdminTypeProductsPageProps & IAdminProductsPageProps> = (props: AdminTypeProductsPageProps & IAdminProductsPageProps) => {
    const {productsList, onOpenProductDialog, onRemoveProduct, onGetProductsList, readOnly, categories, onGetCategories, locationPathName} = props;
    const [categoryFilter, setCategoryFilter] = useState<string>('');

    const [currentLocationPathName, setCurrentLocationPathName] = useState<string>('');

    const onSetFilter = (selectedIndex:number) => {
        if(categories.length > 0){
            const filterName:string = selectedIndex === 0 ? '': categories[selectedIndex-1].name;
            setCategoryFilter(filterName);
        }
    }

    useEffect(() => {
        /*если не просматриваем и не редактируем продукт, а также текущий урл не совпадает с предыдущим то делаем запромы на получение категорий и продуктов*/
        if((!locationPathName.includes("view") && locationPathName!==currentLocationPathName) || currentLocationPathName===''){
            onGetProductsList();
            onGetCategories();
            setCurrentLocationPathName(locationPathName);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locationPathName]);

    return (
        <Fragment>
            <FilterMenu
                locationPathName={locationPathName}
                categories={categories}
                onSetFilter={onSetFilter}/>
            <div className="page-content-wrapper">
                <ProductsList
                    categoryNameFilter={categoryFilter}
                    productsList={productsList}
                    onOpenProductDialog={onOpenProductDialog}
                    onRemoveProduct={onRemoveProduct}
                    readOnly={readOnly}/>
            </div>
        </Fragment>
    );
}

export default connect(mapStateToProps, mapDispatcherToProps)(ProductsPage);
