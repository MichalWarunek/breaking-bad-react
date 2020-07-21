import React from "react";
import {Route, Switch} from "react-router-dom";
import Characters from '../containers/Characters/Characters'
import Character from '../containers/Characters/Character'



const App = ({match}) => (
    <div className="gx-main-content-wrapper">
        <Switch>
            <Route path={`${match.url}characters`} component={Characters}/>
            <Route path={`${match.url}character/:id?`} component={Character}/>
        </Switch>
    </div>
);

export default App;
