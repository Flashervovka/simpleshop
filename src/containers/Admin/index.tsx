import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {ThunkDispatch} from "redux-thunk";
import {RootStateType} from "../../store";
//import ProductCreatePanel from "../../components/ProductCreatePanel";
import {sendFileAction} from "../../store/fileStorage/actions";
import {FileStorageActionTypes} from "../../store/fileStorage/types";
import {ProductsActionTypes} from "../../store/products/types";
import {getProductsListAction} from "../../store/products/actions";

import './styles.css';
import ControllBar from "../../components/ControllBar";
import {adminTabsAndPanels} from "../../config";

const mapStateToProps = (state: RootStateType) => ({})

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, FileStorageActionTypes | ProductsActionTypes>) => {
    return {
        onSendFile: (file: Blob): void => {
            dispatch(sendFileAction(file));
        },
        onGetProductsList: (): void => {
            dispatch(getProductsListAction());
        }
    }
}

type ReduxType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>;

const AdminPage: React.FC<ReduxType> = (props: ReduxType) => {
    const {onSendFile, onGetProductsList} = props;
    useEffect(()=>{
        onGetProductsList();
    })

    return (
        <div>
            <ControllBar onSendFile={onSendFile} tabsPanelsData={adminTabsAndPanels}/>
            {/*  <ProductCreatePanel onSendFile={onSendFile}/>*/}
        </div>

    )
}
export default connect(mapStateToProps, mapDispatcherToProps)(AdminPage);