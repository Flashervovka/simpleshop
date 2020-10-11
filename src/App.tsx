import React from 'react';
import MainPage from "./containers/Pages/MainPage";
import './App.css';
import {Route, Switch, Redirect} from "react-router";
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
import {adminTabsAndPanels, userTabsAndPanels} from "./config";
import InfoMessagesDialog from "./containers/InfoMessageDialog";

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
        <InfoMessagesDialog/>
        <Switch>
            <PrivateRoute
                component={AdminLogin}
                privateComponent={(props)=> <MainPage pages={adminTabsAndPanels} {...props}/>}
                path="/admin/:user" exact={true}
                condition={user !== null && user.id !== null}/>
            <Route
                path="/admin"
                exact={true}
                component={AdminLogin} />
            <Route
                path="/"
                exact={true}
                component={() => <MainPage pages={userTabsAndPanels} readOnly={true}/>} />
            <Redirect
                to={{
                    pathname: "/"
                }}
            />

        </Switch>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatcherToProps)(App);
