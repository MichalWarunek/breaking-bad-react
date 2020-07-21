import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Sidebar from '../Sidebar/Sidebar'
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';


const styles = {
    nav: {
        backgroundColor: "black" ,
        borderBottom: "1px solid white"
    },
    navButton: {
        marginLeft: 'auto'
    }
};


class Header extends Component {

    state = {
        openSidebar: false
    };


    onOpenSidebar = () => {
        this.setState({openSidebar: true})
    };


    render() {
        const {classes} = this.props;
        const {openSidebar} = this.state;
        return (
            <div>
            <AppBar className={classes.nav}>
                <Toolbar>
                    <IconButton onClick={() => this.onOpenSidebar()} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Button onClick={() => this.props.history.push('/characters/')} color="inherit" className={classes.navButton}>
                        BREAKING BAD API
                    </Button>
                </Toolbar>
            </AppBar>
            <Sidebar openSidebar={openSidebar} closeSidebar={()=>{this.setState({openSidebar: false})}}/>
            </div>
        );
    }

}

export default withRouter(withStyles(styles)(Header));