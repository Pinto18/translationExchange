import React, { Component } from 'react';
import PropTypes from "prop-types";
import Chunk from "./Chunk";
import ChunkPropTypes from "./ChunkPropTypes";

class ChunkList extends Component {

    render () {

        console.log('ChunkList', this.props.segments)

        return (
            <div>

                {
                <Chunk
                    segments={this.props.segments} // array of takes
                    mode={this.props.mode}
                    number={this.props.number}
                    patchTake={this.props.patchTake}
                    deleteTake={this.props.deleteTake}
                    updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
                    onClickSave={this.props.onClickSave}
                    loaded={this.props.loaded}
                    chapter={this.props.chapter}
                    book={this.props.book}
                    language={this.props.language}
                    chunks={this.props.chunks}
                />
                }

            </div>
        );
    }

}
/*
ChunkList.propTypes = {
    segments: PropTypes.arrayOf(ChunkPropTypes)
};
*/

export default ChunkList;