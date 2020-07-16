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
import Brightness1Icon from '@material-ui/icons/Brightness1';
import CharacterForm from '../Common/CharacterForm'




class Character extends Component {

    state = {
        loading: true,
        showEdit: false,
    };

    goToIndex = () => this.props.history.push('/characters');

    onShowEdit = () => {
        this.setState(prevState =>({showEdit: !prevState.showEdit}))
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
        const {character, loading, showEdit} = this.state;

        return !loading &&
            <Container maxWidth="xs">
                <Card>
                    <CardActionArea onClick={() => this.onShowEdit()}>
                        <CardMedia
                            component="img"
                            height="600"
                            image={character.img}
                            title={character.name}
                        />
                        { showEdit ?

                            <CardContent>
                                <CharacterForm
                                    character={character}
                                    save={character => this.props.actions.saveCharacter(character, this.goToIndex)}
                                />
                            </CardContent>
                            :

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {character.nickname}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {character.name}
                            </Typography>
                            {character.status === 'Alive' &&

                            <Typography variant="body2" color="textSecondary" component="p">
                                {character.status}
                                <Brightness1Icon fontSize="inherit" style={{color: 'lime'}}/>
                            </Typography>
                            }
                            {character.status === 'Deceased' &&

                            <Typography variant="body2" color="textSecondary" component="p">
                                Death
                                <Brightness1Icon fontSize="inherit" style={{color: 'red'}}/>
                            </Typography>
                            }
                            {character.status !== 'Alive' && character.status !== 'Deceased' &&

                            <Typography variant="body2" color="textSecondary" component="p">
                                Unknown
                                <Brightness1Icon fontSize="inherit" style={{color: 'gray'}}/>
                            </Typography>
                            }

                            <Typography variant="body2" color="textSecondary" component="p">
                                by: {character.portrayed}
                            </Typography>
                        </CardContent>
                        }
                    </CardActionArea>
                    <CardActions>
                        <Button onClick={() => this.goToIndex()} size="small" color="primary">
                            Back
                        </Button>
                        <Button onClick={() => this.props.actions.deleteCharacter(character.id,()=>{alert(`${character.nickname} has been deleted`)}, this.goToIndex)} size="small" color="primary">
                            Delete
                        </Button>
                    </CardActions>

                </Card>

            </Container>

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
