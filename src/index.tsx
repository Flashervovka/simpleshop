import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {store, history} from "./store";


declare global {
    interface Window {
        onGetOrders:any,
        isMobileApplication:boolean,
        setIsMobileApplication:any
    }
}

ReactDOM.render(
  <React.Fragment>
      <Provider store={store}>
          <ConnectedRouter history={history}>
              <App />
          </ConnectedRouter>
      </Provider>
  </React.Fragment>,
  document.getElementById('root')
);
