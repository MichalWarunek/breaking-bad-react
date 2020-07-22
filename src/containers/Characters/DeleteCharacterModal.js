import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


const styles = {
    modal: {
        position: 'absolute',
        width: 300,
        backgroundColor: "black",
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '30px 30px 30px 30px',
        textAlign: 'center'

    },
    buttonBack: {
        marginRight: '10px',
        color: 'white',
        border: '1px solid blue'
    },
    buttonOk: {
        color: 'white',
        border: '1px solid green'
    }
};


class DeleteCharacterModal extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Modal open={this.props.showModal} onClick={this.props.back}>
                    <div className={classes.modal}>
                        <h2>ARE YOU SURE?</h2>
                        <Button className={classes.buttonBack} onClick={this.props.back} variant="outlined" color="primary">Back</Button>
                        <Button className={classes.buttonOk} onClick={this.props.delete} variant="outlined" color="primary">Yes</Button>

                    </div>
                </Modal>
            </div>
        );
    }

}

export default withRouter(withStyles(styles)(DeleteCharacterModal));

