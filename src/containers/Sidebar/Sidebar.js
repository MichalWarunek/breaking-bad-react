import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';




const styles = {
    paper: {
        background: grey[900],
        color: 'white',
        borderRight: '1px solid white'

    }
};



class Sidebar extends Component {


    render() {
        const { classes } = this.props;
        return (
            <Drawer classes={{ paper: classes.paper }} open={false}>
                <List>
                        <ListItem button>
                            <ListItemIcon><PeopleAltIcon style={{color: "white"}}/></ListItemIcon>
                            <ListItemText primary="Characters" />
                        </ListItem>
                </List>
            </Drawer>
        );
    }

}

export default withStyles(styles)(Sidebar);
