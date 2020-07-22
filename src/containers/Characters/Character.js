import React, {Component} from 'react';
import * as actions from "./CharacterActions";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import CharacterForm from '../Common/CharacterForm';
import DeleteCharacterModal from './DeleteCharacterModal';
import Notifications from '../Notifications/Notifications'
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import {Grid, Card, CardContent, CardMedia, CardActions, CardActionArea, Button, Typography} from '@material-ui/core';
import UploadCharacterImageModal from "./UploadCharacterImageModal";


const styles = {
    root: {
        marginTop: "100px"
    },
    actions: {
        backgroundColor: 'black',
    },
    infoContent: {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center'
    },
    editContent: {
        backgroundColor: 'black',
        color: 'white',
    },
    buttonDelete: {
        color: 'white',
        border: '1px solid red'
    },
    buttonBack: {
        color: 'white',
        border: '1px solid blue'
    },
    buttonUpload: {
        color: 'white',
        border: '1px solid green',
        marginTop: '20px',
        textAlign: 'center'
    },
    cardTitle: {
        color: 'gray',
        marginBottom: '20px',
        textAlign: 'center'
    }
};

class Character extends Component {

    state = {
        loading: true,
        showEdit: false,
        showModal: false,
        showUploadModal: false,
        showNotification: false,
        notificationType: ''
    };

    goToIndex = () => this.props.history.push('/characters');

    onShowEdit = () => {
        this.setState({showEdit: true})
    };

    componentDidMount() {
        const idParam = this.props.match.params.id;
        const id = idParam ? parseInt(idParam) : null;
        if (id) {
            this.props.actions.loadCharacter(id, character => this.setState({loading: false, character}));
        } else {
            this.setState({loading: false});
        }
    }

    componentDidUpdate() {
        document.getElementById('actions').scrollIntoView()
    }


    render() {
        const {classes} = this.props;
        const {character, loading, showEdit, showModal, showUploadModal, showNotification, notificationType} = this.state;

        return !loading &&
            <div>

                <Grid className={classes.root} container spacing={2}>
                    <Grid item xs={3}>
                        <Card>
                            <CardContent className={classes.infoContent}>
                                <Typography className={classes.cardTitle}>
                                    Image
                                </Typography>
                                {character &&
                                < CardMedia
                                    component="img"
                                    image={character.image ? character.image : character.img}
                                />
                                }
                                <Button className={classes.buttonUpload} variant="outlined"
                                        onClick={() => this.setState({showUploadModal: true})} size="large"
                                        color="primary">
                                    Upload Image
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardActionArea onClick={() => {
                                this.onShowEdit();

                            }}
                            >
                                {showEdit || !character ?
                                    <CardContent className={classes.editContent}>
                                        <Typography className={classes.cardTitle}>
                                            Character Info
                                        </Typography>
                                        <CharacterForm
                                            character={character}
                                            save={character => this.props.actions.saveCharacter(character, () => {
                                                this.setState({showNotification: true, notificationType: 'saved'})
                                            }, this.goToIndex())}
                                        />
                                    </CardContent>

                                    :

                                    <CardContent className={classes.infoContent}>
                                        <Typography className={classes.cardTitle}>
                                            Character Info
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {character ? character.nickname : null}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {character ? character.name : null}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {character ? character.status : null}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            by: {character ? character.portrayed : null}
                                        </Typography>
                                    </CardContent>
                                }
                            </CardActionArea>
                            <CardActions id="actions" className={classes.actions}>
                                <Button className={classes.buttonBack} variant="outlined"
                                        onClick={() => this.goToIndex()} size="small" color="primary">
                                    Back
                                </Button>
                                {character &&
                                <Button style={{marginLeft: 'auto'}} className={classes.buttonDelete} variant="outlined"
                                        onClick={() => this.setState({showModal: true})} size="small" color="primary">
                                    Delete
                                </Button>

                                }
                            </CardActions>

                        </Card>
                    </Grid>
                </Grid>
                {showModal &&
                <DeleteCharacterModal
                    showModal={showModal}
                    delete={() => this.props.actions.deleteCharacter(character.id, () => {
                        this.setState({showNotification: true, notificationType: 'deleted'})
                    }, this.goToIndex())}
                    back={() => this.setState({showModal: false})}
                />
                }

                <Notifications
                    showNotification={showNotification}
                    character={character}
                    close={() => {
                        this.setState({showNotification: false})
                    }}
                    notificationType={notificationType}
                />
                {showUploadModal &&
                <UploadCharacterImageModal
                    character={character}
                    showUploadModal={showUploadModal}
                    back={() => this.setState({showUploadModal: false})}
                />
                }
            </div>

    };

}


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        actions,
        dispatch)
});

export default withRouter(connect(
    undefined,
    mapDispatchToProps
)(withStyles(styles)(Character)));
