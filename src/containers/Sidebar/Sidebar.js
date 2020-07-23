import React, {Component} from 'react';
import {withStyles, Drawer, List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {withRouter} from "react-router-dom";


const styles = {
    sidebar: {
        borderRight: '2px solid gray'
    },
    list: {
        width: 200
    }
};


class Sidebar extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Drawer
                    onClose={this.props.closeSidebar}
                    onClick={this.props.closeSidebar}
                    className={classes.sidebar}
                    open={this.props.openSidebar}>
                    <List className={classes.list}>
                        <ListItem button onClick={() => this.props.history.push('/characters')}>
                            <ListItemIcon><PeopleAltIcon style={{color: "black"}}/></ListItemIcon>
                            <ListItemText primary="Characters"/>
                        </ListItem>

                    </List>
                </Drawer>
            </div>
        );
    }

}

export default withRouter(withStyles(styles)(Sidebar));

