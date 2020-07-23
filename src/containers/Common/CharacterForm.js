import React, {Component} from 'react';
import {withStyles, Button, Select, MenuItem, TextField }from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';


const styles = {
    buttonSave: {
        color: 'white',
        border: '1px solid green',
    },
    input: {
        color: 'white',
        backgroundColor: grey[900],
        height: 40
    }
};

class CharacterForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            nicknameError: false,
            nameError: false,
            portrayedError: false,
            id: this.props.character ? this.props.character.id : null,
            nickname: this.props.character ? this.props.character.nickname : null,
            name: this.props.character ? this.props.character.name : null,
            status: this.props.character ? this.props.character.status : null,
            portrayed: this.props.character ? this.props.character.portrayed : null
        }
    }

    save = () => {
        if (this.state.error) {
            return;
        }
        else {
            this.props.save({
                id: this.state.id,
                nickname: this.state.nickname,
                name: this.state.name,
                status: this.state.status,
                portrayed: this.state.portrayed
            });
        }
    };


    onChangeNickname = (e) => {
        const nickname = e.target.value;
        if (!nickname) {
            this.setState({error: true, nicknameError: true})
        } else {
            this.setState({nickname});
        }

    };

    onChangeName = (e) => {
        const name = e.target.value;
        if (!name) {
            this.setState({error: true, nameError: true})
        } else {
            this.setState({name});
        }
    };

    onChangeStatus = (e) => {
        const status = e.target.value;
        this.setState({status});
    };

    onChangePortrayed = (e) => {
        const portrayed = e.target.value;
        if (!portrayed) {
            this.setState({error: true, portrayedError: true})
        } else {
            this.setState({portrayed});
        }
    };


    render() {
        const {nicknameError, nameError, portrayedError} = this.state;
        const {character, classes} = this.props;

        return (
            <form onSubmit={this.save}>
                <div>
                    <p>*Nickname:</p>
                <TextField
                    autoFocus
                    error={nicknameError}
                    id="outlined-error-helper-text"
                    helperText="Please enter nickname"
                    variant="outlined"
                    InputProps={{
                        className: classes.input
                    }}
                    fullWidth
                    defaultValue={character ? character.nickname : ''}
                    onChange={this.onChangeNickname}
                />
                </div>
                <p>*Name:</p>
                <TextField
                    error={nameError}
                    id="outlined-error-helper-text"
                    helperText="Please enter name"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        className: classes.input
                    }}
                    defaultValue={character ? character.name : ''}
                    onChange={this.onChangeName}
                />
                <p>*Status: </p>
                <Select
                    className={classes.input}
                    fullWidth
                    variant="outlined"
                    defaultValue={character ? character.status : 'Alive'}
                    onChange={this.onChangeStatus}
                >
                    <MenuItem value='Alive'>Alive</MenuItem>
                    <MenuItem value='Deceased'>Death</MenuItem>
                    <MenuItem value='Undefined'>Undefined</MenuItem>
                </Select>
                <p>*Portrayed:</p>
                <TextField
                    error={portrayedError}
                    id="outlined-error-helper-text"
                    helperText="Please enter portrayed"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        className: classes.input
                    }}
                    defaultValue={character ? character.portrayed : ''}
                    onChange={this.onChangePortrayed}
                />
                <br />
                <div className="form">
                <Button className={classes.buttonSave} variant="outlined" type="submit" size="small" color="primary">
                    Save
                </Button>
                </div>
            </form>
        );
    }
}



export default withStyles(styles)(CharacterForm);
