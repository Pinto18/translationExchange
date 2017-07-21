import React, { Component } from 'react';
import TakeList from "./TakeList";
import ChunkPropTypes from "./ChunkPropTypes";
import {Accordion, Button, Icon} from "semantic-ui-react";
import axios from 'axios';
import config from "config/config";
import _ from 'lodash';
import CommentContainer from "./comments/CommentContainer";

class Chunk extends Component {
    constructor (props) {
        super(props);
        this.state = {open: false,
        modalopen:false};
    }

    onClick = () => {// used when you click the microphone button in the player
        this.setState({
            modalopen: true
        });
    }

    render () {

        var modeLabel = "";

        switch (this.props.mode) {
            case "chunk":
                modeLabel = "Chunk";
                break;
            case "verse":
                modeLabel = "Verse";
                break;
            default:
                modeLabel = "Segment";
        }


        return (
            <div>
                <Accordion styled fluid>
                <Accordion.Title>
                    <Icon name='dropdown' />
                    {modeLabel} {this.props.number}
                </Accordion.Title>

                <Accordion.Content>
                    <Button
                        onClick={this.onClick}
                        color="pink"
                        floated='right'
                        ref={audioComponent => { this.audioComponent = audioComponent; }}
                        icon="microphone"/>

                    <CommentContainer
                        open={this.state.modalopen}
                        ref={instance => (this.commentContainer = instance)}/>


                    <TakeList
                        takes={this.props.segments}
                        deleteTakeFromState={this.props.deleteTakeFromState}
                        updateTakeInState={this.props.updateTakeInState}
                        addToListenList={this.props.addToListenList}
                        patchTake={this.props.patchTake}
                        updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                    />
                </Accordion.Content>
                </Accordion>
            </div>
        );
    }

}

/*
Chunk.propTypes = {
    chunk: ChunkPropTypes
};
*/

export default Chunk;