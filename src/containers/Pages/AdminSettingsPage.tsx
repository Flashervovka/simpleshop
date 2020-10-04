import React, {useEffect} from 'react';
import AdminSettings from "../../components/Settings";
import {RootStateType} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {CategoriesActionTypes, ICategory} from "../../store/categories/types";
import {connect} from "react-redux";
import {addNewCategoryAction, getCategoriesListAction, removeCategoryAction} from "../../store/categories/actions";

import {getCategoriesListSelector} from "../../store/categories/reducer"
import {ISettings, SettingsActionTypes} from "../../store/settings/types";
import {getSettingsAction, setSettingsAction} from "../../store/settings/actions";
import {getSettingsSelector} from "../../store/settings/reducer";

const mapStateToProps = (state: RootStateType) => ({
    categories:getCategoriesListSelector(state),
    settings:getSettingsSelector(state)
})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, CategoriesActionTypes | SettingsActionTypes>) => {
    return{
        onAddNewCategory: (category: ICategory): void => {
            dispatch(addNewCategoryAction(category));
        },
        onGetCategories: (): void => {
            dispatch(getCategoriesListAction());
        },
        onRemoveCategory: (category: ICategory): void => {
            dispatch(removeCategoryAction(category));
        },
        onGetSettings: ():void => {
            dispatch(getSettingsAction())
        },
        onSetSettings: (settings:ISettings):void => {
            dispatch(setSettingsAction(settings))
        }
    }
}

type AdminSettingsPageProps = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const AdminSettingsPage: React.FC<AdminSettingsPageProps> = (props: AdminSettingsPageProps) => {
    const {onAddNewCategory, onGetCategories, onRemoveCategory, categories, onGetSettings, settings, onSetSettings} = props;
    useEffect(() => {
        onGetCategories();
        onGetSettings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AdminSettings
            categories={categories}
            onAddNewCategory={onAddNewCategory}
            onRemoveCategory={onRemoveCategory}
            onSetSettings={onSetSettings}
            settings={settings}/>
    );
}
export default connect(mapStateToProps, mapDispatcherToProps)(AdminSettingsPage);
