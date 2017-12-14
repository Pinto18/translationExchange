import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import { Button, Icon, Modal } from 'semantic-ui-react'
import CommentsPlayer from '../components/comments/commentsPlayer.js'
import config from "config/config";

// this is the page for one chapter

class ExportTakesButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            playList: null,
            pointer: 0
        }
        this.playNext = this.playNext.bind(this);
    }

    checkReadyForExport() {
        if (this.props.chunks.length === 0) {
            return false;
        } else {
      //true if every chunk has at least 1 take marked as published
            return this.props.chunks.every((chunk) => {
                return chunk.takes.some(take => take.take.is_publish);
            });
        }
    }

    createExportPlaylist() {

        let length = this.props.chunks.length;
        const takes = this.props.takes;
        let playlist = [];
        takes.map((take) => {
                    playlist.push({
                        "src": config.streamingUrl + take.location,
                        "name": this.props.mode + ' ' + take.startv + ' (' + (playlist.length + 1) + '/' + length + ')'
                         }
                    );
                }

        );
        const tst = playlist;
        debugger;
        return playlist
    }

    changeColor() {
        this.props.onMarkedAsPublish(() => {
            this.handleClose();
        });

    }

    handleOpen = (e) => {
        const playList = this.createExportPlaylist();
        this.setState({ playList, modalOpen: true });
    }

    handleClose = (e) => this.setState({ modalOpen: false });

    playNext(check) {
        if (check) {

            const playlistLength = this.state.playList.length;
            const pointer = this.state.pointer;

            if (playlistLength > 1 && pointer < playlistLength - 1) {
                this.setState({ pointer: this.state.pointer + 1 });

            } else {
                this.setState({ pointer: 0 })
            }
        }

    }



    audioPlayer() {
        if (this.state.modalOpen) {
            return (
                <div style={{ display: 'flex' }}>
                    <div style={styles.audioPlayer}>
                        <CommentsPlayer
                            //audioFile = "http://172.19.145.91/media/dump/1501176679.73d99dfff8-5117-4635-b734-65140995db67/mrk/07/chapter.wav"
                            audioFile={this.state.playList[this.state.pointer].src}
                            playNext={this.playNext}
                            loop={true}
                            pointer={this.state.pointer}
                            length={this.state.playList.length}
                        />
                    </div>
                    <div style={styles.nameContainer}>
                        {this.state.playList[this.state.pointer].name}
                    </div>
                </div>);
        }
        else {
            return ''
        }
    }


    exportButton() {
      let enableBtn = false;
       const {takes, chunks} = this.props;

       if(takes.length >= chunks.length ){

         const published = takes.map(tk => {
              if(!tk.published) return false;
          return true;
                });

       enableBtn = published.every(val => val ===true);


       }


        let enableButton = true;

        let disableBtnState = false;

        return( <Button onClick={this.handleOpen}
                color={"green"}
                disabled={!enableBtn}
                className="icon"
                icon="share"
                floated="right">
                <Icon color="white" name="sidebar" />
            </Button> );

    }


    render() {
        return (
            <Modal trigger={this.exportButton()}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                closeIcon="close">
                <Modal.Header style={styles.modal}>You are ready to mark Chapter {this.props.chapter.number} as finished!</Modal.Header>
                <Modal.Content style={styles.modal}>
                    <Modal.Description style={styles.modal}>
                        <p>Here is a preview of the takes you have selected to export. This may take a few seconds to
                                load.</p>
                            <p>To mark as done, click on 'Finish'.</p>
                             {this.audioPlayer()}
                        </Modal.Description>

                    </Modal.Content>
                    <Modal.Actions>
                        {/*this button will do a call to database to change chapter.exportready to true */}
                        <Button content="Finish" onClick={this.changeColor.bind(this)} />

                    </Modal.Actions>
                </Modal>
                );
    }
}



const styles = {
    modal: {
        backgroundColor: '#000',
        color: '#fff'

    },
    audioPlayer: {
        border: '1px solid white',
        borderRadius: 5,
        display: 'inline-block',
        width: '80%'
    },
    nameContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center'

    }
}


const mapStateToProps = state => {

  const { takes } = state.chunkListContainer;

  return{ takes }
}


export default connect(mapStateToProps) (ExportTakesButton);