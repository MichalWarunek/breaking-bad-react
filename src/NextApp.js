import React, {Component} from "react";
import {Route, Router, Switch} from "react-router-dom";
import history from './appRedux/reducers/history';
import App from "./containers/App/index";
import configureStore from "./appRedux/reducers/store";
import {Provider} from "react-redux";
export const {store} = configureStore();

class NextApp extends Component {


    render() {
        return (
            <Provider store={store}>
                    <Router history={history}>
                        <Switch>
                            <Route path="/" component={App}/>
                        </Switch>
                    </Router>
            </Provider>
             );
    }
}


export default NextApp;
