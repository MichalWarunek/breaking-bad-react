import React from "react";
import {Route, Switch} from "react-router-dom";
import Characters from '../containers/Characters/Characters'
import Character from '../containers/Characters/Character'
import Test from '../containers/Characters/Test'



const App = ({match}) => (
    <div className="gx-main-content-wrapper">
        <Switch>
            <Route path={`${match.url}characters`} component={Characters}/>
            <Route path={`${match.url}character/:id?`} component={Character}/>
            <Route path={`${match.url}test`} component={Test}/>
        </Switch>
    </div>
);

export default App;
