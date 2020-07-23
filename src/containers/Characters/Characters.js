import React, {Component} from 'react';
import * as actions from "./CharactersActions";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {withStyles, Button, GridList, GridListTile, GridListTileBar, Container, Grid} from '@material-ui/core';
import Brightness1Icon from '@material-ui/icons/Brightness1';
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
    },
    buttonAdd: {
        color: 'white',
        border: '1px solid green',
    },
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
            <Container className={classes.root} maxWidth="xl">
                <Grid container>
                <Grid item xs={2} >

                            <Button className={classes.buttonAdd} variant="outlined"
                                    onClick={() => this.props.history.push('/character')}size="large"
                                    color="primary">
                                New Character
                            </Button>
                </Grid>
                    <Grid item xs={9}>
                <GridList spacing={10} cols={4} cellHeight={400}>
                    { data.map((data) => (
                        <GridListTile onClick={() => this.props.history.push(`/character/${data.id}`)} key={data.id}>
                            <img  className="character-image" src={data.img ? data.img : data.image} alt="Text" />
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
                    </Grid>
                </Grid>
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
