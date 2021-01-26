import React, {useState} from 'react';
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
import {adminTabsAndPanels, userTabsAndPanels, mobileTabsAndPanels} from "./config";
import InfoMessagesDialog from "./containers/InfoMessageDialog";
import {BASE, BASKET, DASHBOARD, DASHBOARD_ORDERS, DASHBOARD_SETTINGS, LOGIN} from "./config/Routes";

const mapStateToProps = (state: RootStateType) => ({
    user: getUserSelector(state),
    alertError: getAlertErrorSelector(state)
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
    const [isMobileApp, setIsMobileApp] = useState(false);
    window.setIsMobileApplication = () => {
        setIsMobileApp(true);
        window.isMobileApplication = true;
    }

    return (
        <div className="App">
            <AlertMessage onCloseAlert={onCloseAlert} title={alertError?.title} message={alertError?.text}
                          isShow={alertError?.isShow} type={"error"}/>
            <InfoMessagesDialog/>
            {
                !isMobileApp ?
                    <Switch>
                        <PrivateRoute
                            component={AdminLogin}
                            privateComponent={(props) => <MainPage pages={adminTabsAndPanels} {...props}/>}
                            path={DASHBOARD} exact={true}
                            condition={user !== null && user.id !== null}/>
                        <PrivateRoute
                            component={AdminLogin}
                            privateComponent={(props) => <MainPage pages={adminTabsAndPanels} {...props}/>}
                            path={`${DASHBOARD}/:category`} exact={true}
                            condition={user !== null && user.id !== null}/>
                        <PrivateRoute
                            component={AdminLogin}
                            privateComponent={(props) => <MainPage pages={adminTabsAndPanels} {...props}/>}
                            path={`${DASHBOARD}/:category/:dialog`} exact={true}
                            condition={user !== null && user.id !== null}/>
                        <PrivateRoute
                            component={AdminLogin}
                            privateComponent={(props) => <MainPage pages={adminTabsAndPanels} {...props}/>}
                            path={DASHBOARD_SETTINGS} exact={true}
                            condition={user !== null && user.id !== null}/>
                        <PrivateRoute
                            component={AdminLogin}
                            privateComponent={(props) => <MainPage pages={adminTabsAndPanels} {...props}/>}
                            path={DASHBOARD_ORDERS} exact={true}
                            condition={user !== null && user.id !== null}/>

                        <Route path={LOGIN} exact={true}>
                            <AdminLogin/>
                        </Route>
                        <Route path={BASKET} exact={true}>
                            <MainPage pages={userTabsAndPanels} readOnly={true} />
                        </Route>
                        <Route path={BASE} exact={true}>
                            <MainPage pages={userTabsAndPanels} readOnly={true}/>
                        </Route>
                        <Route path={`${BASE}:category`} exact={true}>
                            <MainPage pages={userTabsAndPanels} readOnly={true}/>
                        </Route>
                        <Route path={`${BASE}:category/:dialog`} exact={true}>
                            <MainPage pages={userTabsAndPanels} readOnly={true}/>
                        </Route>
                        <Redirect
                            to={{
                                pathname: BASE
                            }}
                        />
                    </Switch> :
                    <Switch>
                        <Route path={DASHBOARD_ORDERS}>
                            <MainPage pages={mobileTabsAndPanels} readOnly={true}/>
                        </Route>
                    </Switch>
            }

        </div>
    );
}

export default connect(mapStateToProps, mapDispatcherToProps)(App);
