import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const styles = {
    paper: {
        borderRight: '2px solid gray'

    },
};


class Notifications extends Component {

    render() {
        const {classes, character, notificationType} = this.props;


        return (
            <div>
                { notificationType === 'saved' &&
                <Snackbar
                    open={this.props.showNotification}
                    autoHideDuration={2000}
                    onClose={this.props.close}> >
                    <MuiAlert
                        elevation={2}
                        severity="success"
                        variant="filled">
                        {`${character.nickname} has been saved!`}
                    </MuiAlert>
                </Snackbar>
                }
                { notificationType === 'deleted' &&
                <Snackbar
                    open={this.props.showNotification}
                    autoHideDuration={2000}
                    onClose={this.props.close}>
                    <MuiAlert
                        elevation={2}
                        severity="success"
                        variant="filled">
                        {`${character.nickname} has been deleted!`}
                    </MuiAlert>
                </Snackbar>
                }
            </div>
        );
    }

}

export default withRouter(withStyles(styles)(Notifications));

