import React, {Component} from 'react';
import * as actions from "./CharactersActions";
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import { Container } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Brightness1Icon from '@material-ui/icons/Brightness1';






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
        const { data } = this.state;
        return (
            <Container style={{marginTop: "100px"}} maxWidth="sm">
                <GridList cellHeight={400}>
                    { data.map((data) => (
                        <GridListTile onClick={() => this.props.history.push(`/character/${data.id}`)} key={data.id}>
                            <img  className="test" src={data.img} alt="Text" />
                            <GridListTileBar
                                title={data.nickname}
                                style={{height: 150}}
                                subtitle={
                                    <div>
                                        <p>{data.name}</p>
                                        {data.status==='Alive' && <p>  {data.status} <Brightness1Icon fontSize="inherit" style={{color: 'lime'}}/></p>

                                        }
                                        {data.status==='Deceased' && <p>  Death <Brightness1Icon fontSize="inherit" style={{color: 'red'}}/></p>

                                        }
                                        {data.status!=='Alive' && data.status!=='Deceased'  && <p>  Unknown <Brightness1Icon fontSize="inherit" style={{color: 'gray'}}/></p>

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
)(Characters));
