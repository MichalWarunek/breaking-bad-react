import React, {Component} from 'react';
import * as actions from "./CharactersActions";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import { Container } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";

const styles = {
    root: {
        marginTop: "100px"
    },
    alive: {
        color: 'lime'
    },
    death: {
        color: 'red'
    },
    unknown: {
        color: 'gray'
    }
};

class Characters extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        this.reload();
    }

    reload = () => {
        this.props.actions.loadCharactersData(data => {
            this.setState(data);
        });
    };


    render() {
        const {classes} = this.props;
        const { data } = this.state;
        return (
            <Container className={classes.root} maxWidth="sm">
                <GridList cellHeight={400}>
                    { data.map((data) => (
                        <GridListTile onClick={() => this.props.history.push(`/character/${data.id}`)} key={data.id}>
                            <img  className="character-image" src={data.img} alt="Text" />
                            <GridListTileBar
                                title={data.nickname}
                                style={{height: 150}}
                                subtitle={
                                    <div>
                                        <p>{data.name}</p>
                                        {data.status==='Alive' && <p>  {data.status} <Brightness1Icon className={classes.alive} fontSize="inherit" /></p>

                                        }
                                        {data.status==='Deceased' && <p>  Death <Brightness1Icon className={classes.death} fontSize="inherit" /></p>

                                        }
                                        {data.status!=='Alive' && data.status!=='Deceased'  && <p>  Unknown <Brightness1Icon className={classes.unknown} fontSize="inherit" /></p>

                                        }
                                        <p>by: {data.portrayed}</p>
                                    </div>

                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </Container>
        )
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
)(withStyles(styles)(Characters)));
