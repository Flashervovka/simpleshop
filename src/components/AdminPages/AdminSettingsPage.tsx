import React, {useEffect} from 'react';
//import {AdminSettingsPageProps} from "./types";
import AdminSettings from "../Settings";
import {RootStateType} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {CategoriesActionTypes, ICategory} from "../../store/categories/types";
import {connect} from "react-redux";
import {addNewCategoryAction, getCategoriesListAction} from "../../store/categories/actions";

import {getCategoriesListSelector} from "../../store/categories/reducer"

const mapStateToProps = (state: RootStateType) => ({
    categories:getCategoriesListSelector(state)
})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, CategoriesActionTypes>) => {
    return{
        onAddNewCategory: (category: ICategory): void => {
            dispatch(addNewCategoryAction(category));
        },
        onGetCategories: (): void => {
            dispatch(getCategoriesListAction());
        }
    }
}

type AdminSettingsPageProps = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const AdminSettingsPage: React.FC<AdminSettingsPageProps> = (props: AdminSettingsPageProps) => {
    const {onAddNewCategory, onGetCategories, categories} = props;
    useEffect(() => {
        onGetCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AdminSettings categories={categories} onAddNewCategory={onAddNewCategory}/>
    );
}
export default connect(mapStateToProps, mapDispatcherToProps)(AdminSettingsPage);
