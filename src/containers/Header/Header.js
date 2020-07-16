import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

export default class Header extends Component {


    render() {
        return (
            <AppBar style={{backgroundColor: "black" , borderBottom: "1px solid white"}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Button color="inherit" style={{marginLeft: 'auto'}}>
                        BREAKING BAD API
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }

}

