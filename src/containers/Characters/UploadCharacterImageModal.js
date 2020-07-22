import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import * as actions from "./CharacterActions";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";

const styles = {
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: "black",
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '30px 30px 30px 30px',
        textAlign: 'center'

    },
    buttonBack: {
        marginTop: '20px',
        color: 'white',
        border: '1px solid blue'
    },
};


class UploadCharacterImageModal extends Component {

    goToIndex = () => this.props.history.push('/characters');

    render() {
        const {classes, character} = this.props;
        return (
            <div>
                <Modal open={this.props.showUploadModal}>
                    <div className={classes.modal}>
                        <DropzoneAreaBase
                            dropzoneClass="dropzone"
                            onDrop={(file) => {
                                this.props.actions.uploadImage(file, character,'Uploaded', () => {
                                    this.goToIndex();
                                })
                            }}
                            acceptedFiles={['image/*']}>
                            <p>Drop the files here ...</p>
                            <h1>dddsadsa</h1>
                        </DropzoneAreaBase>
                        <Button className={classes.buttonBack} onClick={this.props.back} variant="outlined" color="primary">Back</Button>

                    </div>
                </Modal>
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        actions,
        dispatch)
});

export default withRouter(connect(
    undefined,
    mapDispatchToProps
)(withStyles(styles)(UploadCharacterImageModal)));



