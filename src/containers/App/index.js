import React, {Component} from "react";
import {Route, Switch, withRouter} from "react-router-dom";

import MainApp from "./MainApp";

class App extends Component {


    render() {
        const {match} = this.props;
        return (
            <Switch>
                <Route path={`${match.url}`} component={MainApp}/>
            </Switch>

        )
    }
}


export default withRouter(App);
