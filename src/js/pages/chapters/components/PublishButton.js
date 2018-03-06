/*  eslint indent:[ "error", "tab", {SwitchCase: 1}]*/
import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class PublishButton extends Component {
	state = { modalOpen: false };

	handleOpen = e =>
		this.setState({
			modalOpen: true,
		});

	handleClose = e =>
		this.setState({
			modalOpen: false,
		});

	// called when the user clicks yes inside the modal
	publishFiles() {
		this.props.onPublish();
		this.handleClose();
	}

	checkReadyForPublish() {
		return this.props.chapters.every(chapter => chapter.published);
	}

	render() {
		let publishButton = (
			<Button
				onClick={this.handleOpen}
				floated="right"
				disabled={!this.checkReadyForPublish()}
				color={this.props.isPublished ? 'green' : 'red'}
			>
				{this.props.isPublished ? this.props.displayText.published : this.props.displayText.publish}
			</Button>
		);

		return (
			<Modal
				trigger={publishButton}
				open={this.state.modalOpen}
				onClose={this.handleClose}
				closeIcon="close"
				size="small"
			>
				<Header icon="browser" content="Publish Project" />
				<Modal.Content>
					<h3>Are you ready to publish this project?</h3>
				</Modal.Content>
				<Modal.Actions>
					<Button color="green" onClick={this.publishFiles.bind(this)} inverted>
						<Icon name="checkmark" />Yes
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}
}

export default PublishButton;
