import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";


const styles = {
    sidebar: {
        borderRight: '2px solid gray'

    },
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
                    <List>
                        <ListItem button onClick={() => this.props.history.push('/character')}>
                            <ListItemIcon><PersonAddIcon style={{color: "black"}}/></ListItemIcon>
                            <ListItemText primary="Add New Character"/>
                        </ListItem>
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

