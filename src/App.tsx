import React from 'react';
import AdminPage from "./containers/Admin";
import './App.css';
import { Switch} from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import AdminLogin from "./containers/AdminLogin";

import {RootStateType} from "./store";
import {connect} from "react-redux";
import {getUserSelector} from "./store/user/reducer";

const mapStateToProps = (state: RootStateType) => ({
    user:getUserSelector(state)
});

type AppType = ReturnType<typeof mapStateToProps>;

const App: React.FC<AppType> = (props: AppType) => {
    /*TODO подумать над полученим данных пользователя*/
  const {user} = props;

  return (
    <div className="App">
        <Switch>
            <PrivateRoute component={AdminLogin} privateComponent={AdminPage} path="/admin" exact={true} condition={user !== null && user.id !== null}/>
        </Switch>
    </div>
  );
}

export default connect(mapStateToProps)(App);
