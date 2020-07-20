import React, {Component} from 'react';
import * as actions from "./CharacterActions";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
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





class Character extends Component {

    state = {
        loading: true,
        showEdit: false,
        showModal: false,
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


    render = () => {
        const {character, loading, showEdit, showModal} = this.state;

        return !loading &&
            <div>
            <Container style={{marginTop: "100px"}} maxWidth="xs">
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
                                    save={character => this.props.actions.saveCharacter(character, this.goToIndex)}
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
                    <CardActions style={{backgroundColor: '#f7f7f7'}}>
                        <Button onClick={() => this.goToIndex()} size="small" color="primary">
                            Back
                        </Button>
                        { character &&
                        <Button style={{marginLeft: 'auto'}} onClick={()=> this.setState({showModal: true})} size="small" color="primary">
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
                            alert(`${character.nickname} has been deleted`)
                        }, this.goToIndex)}
                        back={() => this.setState({showModal: false})}
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
)(Character));
