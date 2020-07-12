import React from 'react';
import AdminPage from "./containers/Admin";
import './App.css';
import {Route, Switch} from "react-router";

function App() {
  return (
    <div className="App">
        <Switch>
            <Route path="/admin" component={AdminPage}/>
        </Switch>
    </div>
  );
}

export default App;
