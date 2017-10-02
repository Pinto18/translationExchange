import React, { Component } from "react";
import ChunkPropTypes from "./ChunkPropTypes";
import { connect } from "react-redux";
import { Accordion, Icon, Grid } from "semantic-ui-react";
import TakeTable from "./TakeTable";
import "css/takes.css";

import ChunkSidebar from "./SideBar";
class Chunk extends Component {
	render() {
		var publish = [];
		var onestar = [];
		var twostar = [];
		var threestar = [];

		var counter = 0;

		let orderedSegments = this.props.segments.slice();

		orderedSegments.map(i => {
			counter += 1;
			i.order = counter;

			if (i.take.is_publish) {
				publish[publish.length] = i;
			} else if (i.take.rating < 2) {
				onestar[onestar.length] = i;
			} else if (i.take.rating === 2) {
				twostar[twostar.length] = i;
			} else if (i.take.rating === 3) {
				threestar[threestar.length] = i;
			}
		});

		var modeLabel = "";

		switch (this.props.mode) {
			case "chunk":
				modeLabel = this.props.displayText.chunk;
				break;
			case "verse":
				modeLabel =  this.props.displayText.verse;
				break;
			default:
				modeLabel = this.props.displayText.segment;
		}

		var icon1 = <Icon name="star" color="red" size="big" />;
		var icon2 = (
			<div>
				<Icon name="star" color="yellow" size="big" />
				<Icon name="star" color="yellow" size="big" />
			</div>
		);
		var icon3 = (
			<div>
				<Icon name="star" color="green" size="big" />
				<Icon name="star" color="green" size="big" />
				<Icon name="star" color="green" size="big" />
			</div>
		);
		var icon4 = <Icon name="check" color="pink" size="big" />;
		return (
			<div>
				<Accordion fluid styled>
					<Accordion.Title className="ChunkTitle">
						<center>
							<Icon name="dropdown" />
							<font color="black">
								{modeLabel} {this.props.number}
								{this.props.comments.length > 0
									? <Icon name="circle" color="yellow" />
									: ""}
							</font>
						</center>
					</Accordion.Title>
					<Accordion.Content className="ChunkBody">
						<Grid fluid columns={2}>
							<Grid.Column width={15}>
								<Grid fixed padded fluid columns={4}>
									<TakeTable
										icon={icon1}
										mode={this.props.mode}
										takes={this.props.segments}
										addToListenList={this.props.addToListenList}
										patchTake={this.props.patchTake}
										deleteTake={this.props.deleteTake}
										updateChosenTakeForChunk={
											this.props.updateChosenTakeForChunk
										}
										onClickSave={this.props.onClickSave}
										column={0}
										PLAYLIST={onestar}
										chunkNumber={this.props.number}
										deleteComment={this.props.deleteComment}
										deleteButton={true}
										active={this.props.active}
									/>
									<TakeTable
										icon={icon2}
										mode={this.props.mode}
										takes={this.props.segments}
										addToListenList={this.props.addToListenList}
										patchTake={this.props.patchTake}
										deleteTake={this.props.deleteTake}
										updateChosenTakeForChunk={
											this.props.updateChosenTakeForChunk
										}
										onClickSave={this.props.onClickSave}
										column={1}
										PLAYLIST={twostar}
										chunkNumber={this.props.number}
										deleteComment={this.props.deleteComment}
										active={this.props.active}
									/>
									<TakeTable
										icon={icon3}
										mode={this.props.mode}
										takes={this.props.segments}
										addToListenList={this.props.addToListenList}
										patchTake={this.props.patchTake}
										deleteTake={this.props.deleteTake}
										updateChosenTakeForChunk={
											this.props.updateChosenTakeForChunk
										}
										onClickSave={this.props.onClickSave}
										column={2}
										PLAYLIST={threestar}
										chunkNumber={this.props.number}
										deleteComment={this.props.deleteComment}
										active={this.props.active}
									/>
									<TakeTable
										icon={icon4}
										mode={this.props.mode}
										takes={this.props.segments}
										addToListenList={this.props.addToListenList}
										patchTake={this.props.patchTake}
										deleteTake={this.props.deleteTake}
										updateChosenTakeForChunk={
											this.props.updateChosenTakeForChunk
										}
										onClickSave={this.props.onClickSave}
										column={3}
										PLAYLIST={publish}
										chunkNumber={this.props.number}
										deleteComment={this.props.deleteComment}
										active={this.props.active}
									/>
								</Grid>
							</Grid.Column>
							<Grid.Column width={1} verticalAlign="middle" floated="right">
								<ChunkSidebar
									comments={this.props.comments}
									onClickSave={this.props.onClickSave}
									column={0}
									PLAYLIST={onestar}
									chunkNumber={this.props.number}
									mode={this.props.mode}
									chunkId={this.props.id}
									deleteComment={this.props.deleteComment}
									active={this.props.active}
									onSourceClicked={this.props.onSourceClicked}
								/>
							</Grid.Column>
						</Grid>
						<br />
					</Accordion.Content>
				</Accordion>
			</div>
		);
	}
}
Chunk.propTypes = {
	chunk: ChunkPropTypes
};


const mapStateToProps = state => {

		const{ displayText } = state.geolocation;

		return{displayText};

};


export default connect (mapStateToProps) (Chunk);
