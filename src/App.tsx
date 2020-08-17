import React from 'react';
import AdminPage from "./containers/Admin";
import './App.css';
import { Switch} from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import AdminLogin from "./containers/AdminLogin";

import {RootStateType} from "./store";
import {connect} from "react-redux";
import {getUserSelector} from "./store/user/reducer";
import AlertMessage from "./components/AlertMessage";
import {getAlertErrorSelector} from "./store/errors/reducer";
import {ThunkDispatch} from "redux-thunk";
import {ErrorsActionTypes} from "./store/errors/types";
import {hideAlertAction} from "./store/errors/actions";

const mapStateToProps = (state: RootStateType) => ({
    user:getUserSelector(state),
    alertError:getAlertErrorSelector(state)
});

const mapDispatcherToProps = (dispatch: ThunkDispatch<RootStateType, void, ErrorsActionTypes>) => {
    return {
        onCloseAlert: (): void => {
            dispatch(hideAlertAction());
        }
    }
}

type AppType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps> ;

const App: React.FC<AppType> = (props: AppType) => {
  const {user, alertError, onCloseAlert} = props;

  return (
    <div className="App">
        <AlertMessage onCloseAlert={onCloseAlert} title={alertError?.title} message={alertError?.text} isShow={alertError?.isShow} type={"error"}/>
        <Switch>
            <PrivateRoute component={AdminLogin} privateComponent={AdminPage} path="/admin" exact={true} condition={user !== null && user.id !== null}/>
        </Switch>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatcherToProps)(App);
