import React, {Component} from 'react';
import * as actions from "./CharacterActions";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from '@material-ui/core/Container';
import CharacterForm from '../Common/CharacterForm';
import DeleteCharacterModal from './DeleteCharacterModal';
import Notifications from '../Notifications/Notifications'
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";


const styles = {
    root: {
        marginTop: "100px"
    },
    actions: {
        backgroundColor: '#f7f7f7'
    },
    buttonDelete: {
        marginLeft: 'auto',
    }
};

class Character extends Component {

    state = {
        loading: true,
        showEdit: false,
        showModal: false,
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


    render () {
        const {classes} = this.props;
        const {character, loading, showEdit, showModal, showNotification, notificationType} = this.state;

        return !loading &&
            <div>
            <Container className={classes.root}  maxWidth="xs">
                <Card>
                    <CardActionArea onClick={() => this.onShowEdit()}>

                        <CardMedia
                            component="img"
                            image={character ? character.img : ''}
                        />
                        { showEdit || !character ?

                            <CardContent>
                                <CharacterForm
                                    character={character}
                                    save={character => this.props.actions.saveCharacter(character,() => {
                                        this.setState({showNotification: true, notificationType: 'saved'})
                                    }, this.goToIndex())}
                                />
                            </CardContent>

                            :

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {character ? character.nickname : null}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {character ? character.name : null}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {character ? character.status : null}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    by: {character ? character.portrayed : null}
                                </Typography>
                            </CardContent>
                        }
                    </CardActionArea>
                    <CardActions className={classes.actions} >
                        <Button onClick={() => this.goToIndex()} size="small" color="primary">
                            Back
                        </Button>
                        { character &&
                        <Button className={classes.buttonDelete} onClick={()=> this.setState({showModal: true})} size="small" color="primary">
                            Delete
                        </Button>

                        }
                    </CardActions>

                </Card>
            </Container>
                { showModal &&
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
                    close={()=>{this.setState({showNotification: false})}}
                    notificationType={notificationType}
                />

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
