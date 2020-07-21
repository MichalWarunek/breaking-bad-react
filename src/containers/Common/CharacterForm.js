import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


class CharacterForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.character ? this.props.character.id : null,
            nickname: this.props.character ? this.props.character.nickname : null,
            name: this.props.character ? this.props.character.name : null,
            status: this.props.character ? this.props.character.status : null,
            portrayed: this.props.character ? this.props.character.portrayed : null
        }
    }

    save = () => {
        this.props.save({
            id: this.state.id,
            nickname: this.state.nickname,
            name: this.state.name,
            status: this.state.status,
            portrayed: this.state.portrayed
        });
    };


    onChangeNickname = (e) => {
        const nickname = e.target.value;
        this.setState({nickname});
    };

    onChangeName = (e) => {
        const name = e.target.value;
        this.setState({name});
    };

    onChangeStatus = (e) => {
        const status = e.target.value;
        this.setState({status});
    };

    onChangePortrayed = (e) => {
        const portrayed = e.target.value;
        this.setState({portrayed});
    };


    render() {
        const {character} = this.props;

        return (
            <form onSubmit={this.save}>
                <p>Nickname:</p>
                <Input
                    id="my-input"
                    fullWidth
                    defaultValue={character ? character.nickname : ''}
                    onChange={this.onChangeNickname}
                />
                <p>Name: </p>
                <Input
                    id="my-input"
                    fullWidth
                    defaultValue={character ? character.name : ''}
                    onChange={this.onChangeName}
                />
                <p>Status: </p>
                <Input
                    id="my-input"
                    fullWidth
                    defaultValue={character ? character.status : ''}
                    onChange={this.onChangeStatus}
                />
                <p>Portrayed:</p>
                <Input
                    id="my-input"
                    fullWidth
                    defaultValue={character ? character.portrayed : ''}
                    onChange={this.onChangePortrayed}
                />
                <br />
                <div className="form">
                <Button  type="submit" size="small" color="primary">
                    Save
                </Button>
                </div>
            </form>
        );
    }
}



export default (CharacterForm);
