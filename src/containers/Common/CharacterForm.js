import Button from '@material-ui/core/Button';
import React, {Component} from 'react';
import PropTypes from "prop-types";
import Input from '@material-ui/core/Input';


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

    componentDidMount() {
        this.props.saveFn(this.save);
    }

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
        console.log(this.state.nickname);

        const {character} = this.props;

        return (


            <form onSubmit={this.save}>
                <p>Nickname:</p>
                <Input
                    id="my-input"
                    fullWidth
                    defaultValue={character ? character.nickname : ''}
                    onChange={this.onChangeNickname}
                    aria-describedby="my-helper-text"
                />
                <p>Name: </p>
                <Input
                    id="my-input"
                    fullWidth
                    defaultValue={character ? character.name : ''}
                    onChange={this.onChangeName}
                    aria-describedby="my-helper-text"
                />
                <p>Status: </p>
                <Input
                    id="my-input"
                    fullWidth
                    defaultValue={character ? character.status : ''}
                    onChange={this.onChangeStatus}
                    aria-describedby="my-helper-text"
                />
                <p>Portrayed:</p>
                <Input
                    id="my-input"
                    fullWidth
                    defaultValue={character ? character.portrayed : ''}
                    onChange={this.onChangePortrayed}
                    aria-describedby="my-helper-text"
                /><br />
                <Button type="submit" size="small" color="primary">
                    Save
                </Button>
            </form>

        );
    }
}


CharacterForm.defaultProps = {
    saveFn: () => {
    },
    withButtons: false
};

CharacterForm.propTypes = {
    save: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    item: PropTypes.object,
    withButtons: PropTypes.bool,
    saveFn: PropTypes.func,
};

export default (CharacterForm);
