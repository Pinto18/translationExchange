import React, { Component } from "react";
import PropTypes from "prop-types";
import TakeContainer from "../TakeContainer";
import TakePropTypes from "./TakePropTypes";
import update from "react/lib/update";
import { DropTarget } from "react-dnd";
var iterator;
class TakeList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			takes: this.props.takes
		};
	}
	pushTake(take) {
		this.setState(
			update(this.state, {
				takes: {
					$push: [take]
				}
			})
		);
	}

	removeTake(index) {
		this.setState(
			update(this.state, {
				takes: {
					$splice: [[index, 1]]
				}
			})
		);
	}

	moveTake(dragIndex, hoverIndex) {
		const { takes } = this.state;
		const dragTake = takes[dragIndex];
		this.setState(
			update(this.state, {
				takes: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragTake]]
				}
			})
		);
	}

	render() {
		const style = {
			minHeight: "231px",
		};
		const {takes}=this.state;
		const { connectDropTarget } = this.props;
		return connectDropTarget(
			<div style={{ ...style }}>
				{takes.map((take, i) => {
					return (
						<div>
							<br />
							<TakeContainer
								take={take} // one take
								count={take.order}
								source={take.source}
								chunkNumber={this.props.chunkNumber}
								addToListenList={this.props.addToListenList}
								patchTake={this.props.patchTake}
								deleteTake={this.props.deleteTake}
								updateChosenTakeForChunk={this.props.updateChosenTakeForChunk}
								onClickSave={this.props.onClickSave}
								deleteComment={this.props.deleteComment}
								playTake={this.props.playTake}
								active={this.props.active}
								mode={this.props.mode}
								key={i}
								index={i}
								listId={this.props.ratingToGet}
								removeTake={this.removeTake.bind(this)}
								moveTake={this.moveTake.bind(this)}
							/>
						</div>
					);
				})}
			</div>
		);
	}
}

TakeList.propTypes = {
	takes: PropTypes.arrayOf(TakePropTypes).isRequired
};
const takeTarget = {
	drop(props, monitor, component) {
		const { ratingToGet } = props;
		const sourceObj = monitor.getItem();
		if (ratingToGet!== sourceObj.listId) {
			component.pushTake(sourceObj.take);
		}
		return { listId: ratingToGet };
	}
};

export default DropTarget("TakeContainer", takeTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(TakeList);
