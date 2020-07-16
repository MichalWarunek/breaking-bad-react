import React, {Component} from 'react';
import App from "../../routes/index";
import {withRouter} from "react-router-dom";
import Header from '../Header/Header';

class MainApp extends Component {


    render() {
        const {match} = this.props;
        return (
            <div>
                <Header />
                <App match={match}/>
            </div>
        );
    }

}

export default withRouter(MainApp);
